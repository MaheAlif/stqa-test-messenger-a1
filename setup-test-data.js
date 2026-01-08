/**
 * Test Data Setup Script for Messenger API
 * 
 * This script:
 * 1. Resets the system
 * 2. Creates users from test-users.json
 * 3. Logs in all users and saves their tokens
 * 4. Optionally creates sample conversations and messages
 * 
 * Usage:
 *   node setup-test-data.js
 *   node setup-test-data.js --full  (includes conversations and messages)
 */

const fs = require('fs');
const axios = require('axios');

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: { 'Content-Type': 'application/json' }
});

const userData = {};

/**
 * Step 1: Reset the system
 */
async function resetSystem() {
    console.log('\n📍 Step 1: Resetting system...');
    try {
        await api.get('/reset');
        console.log('✅ System reset successful');
    } catch (error) {
        console.log('⚠️  Reset failed:', error.response?.status || error.message);
    }
}

/**
 * Step 2: Create users from JSON file
 */
async function createUsers() {
    console.log('\n📍 Step 2: Creating users...');
    const { users } = JSON.parse(fs.readFileSync('test-users.json', 'utf8'));
    console.log(`Found ${users.length} users to create`);
    
    let successCount = 0;
    
    for (const user of users) {
        try {
            const { data } = await api.post('/auth/signup', user);
            userData[user.username] = {
                userId: data.userId,
                email: user.email,
                password: user.password,
                token: null
            };
            console.log(`  ✓ Created: ${user.username} (ID: ${data.userId})`);
            successCount++;
        } catch (error) {
            console.log(`  ✗ Failed: ${user.username} - ${error.response?.data || error.message}`);
        }
    }
    
    console.log(`\n✅ Created ${successCount}/${users.length} users`);
}

/**
 * Step 3: Login all users and get tokens
 */
async function loginUsers() {
    console.log('\n📍 Step 3: Logging in all users...');
    let successCount = 0;
    
    for (const username in userData) {
        try {
            const { data } = await api.post('/auth/login', {
                username,
                password: userData[username].password
            });
            userData[username].token = data.token;
            console.log(`  ✓ Logged in: ${username}`);
            successCount++;
        } catch (error) {
            console.log(`  ✗ Failed: ${username}`);
        }
    }
    
    console.log(`\n✅ Logged in ${successCount}/${Object.keys(userData).length} users`);
}

/**
 * Step 4: Create sample conversations (optional)
 */
async function createSampleConversations() {
    console.log('\n📍 Step 4: Creating sample conversations...');
    const conversationData = {};
    const [alice, bob, charlie, david] = Object.keys(userData);
    
    if (!david) {
        console.log('⚠️  Not enough users to create sample conversations');
        return conversationData;
    }
    
    // DIRECT: alice <-> bob
    try {
        const { data } = await api.post('/conversations/create',
            { type: 'DIRECT', name: null, memberIds: [userData[bob].userId] },
            { headers: { Authorization: `Bearer ${userData[alice].token}` } }
        );
        conversationData.alice_bob = data.conversationId;
        console.log(`  ✓ DIRECT: ${alice} <-> ${bob} (ID: ${data.conversationId})`);
    } catch (error) {
        console.log(`  ✗ Failed DIRECT:`, error.response?.data || error.message);
    }
    
    // GROUP: alice, bob, charlie, david
    try {
        const { data } = await api.post('/conversations/create',
            {
                type: 'GROUP',
                name: 'Test Group',
                memberIds: [userData[bob].userId, userData[charlie].userId, userData[david].userId]
            },
            { headers: { Authorization: `Bearer ${userData[alice].token}` } }
        );
        conversationData.test_group = data.conversationId;
        console.log(`  ✓ GROUP: Test Group (ID: ${data.conversationId})`);
    } catch (error) {
        console.log(`  ✗ Failed GROUP:`, error.response?.data || error.message);
    }
    
    return conversationData;
}

/**
 * Step 5: Send sample messages (optional)
 */
async function sendSampleMessages(conversationData) {
    console.log('\n📍 Step 5: Sending sample messages...');
    if (Object.keys(conversationData).length === 0) {
        console.log('⚠️  No conversations to send messages to');
        return;
    }
    
    const [alice, bob] = Object.keys(userData);
    
    // Messages in DIRECT conversation
    if (conversationData.alice_bob) {
        try {
            await api.post(`/messages/${conversationData.alice_bob}/send`,
                'Hello Bob! This is a test message.',
                {
                    headers: {
                        Authorization: `Bearer ${userData[alice].token}`,
                        'Content-Type': 'text/plain'
                    }
                }
            );
            console.log(`  ✓ Alice sent message in DIRECT`);
            
            await api.post(`/messages/${conversationData.alice_bob}/send`,
                'Hi Alice! Got your message.',
                {
                    headers: {
                        Authorization: `Bearer ${userData[bob].token}`,
                        'Content-Type': 'text/plain'
                    }
                }
            );
            console.log(`  ✓ Bob replied in DIRECT`);
        } catch (error) {
            console.log(`  ✗ Failed DIRECT messages:`, error.response?.data || error.message);
        }
    }
    
    // Message in GROUP conversation
    if (conversationData.test_group) {
        try {
            await api.post(`/messages/${conversationData.test_group}/send`,
                'Hello everyone! Welcome to the test group.',
                {
                    headers: {
                        Authorization: `Bearer ${userData[alice].token}`,
                        'Content-Type': 'text/plain'
                    }
                }
            );
            console.log(`  ✓ Alice sent message in GROUP`);
        } catch (error) {
            console.log(`  ✗ Failed GROUP message:`, error.response?.data || error.message);
        }
    }
}

/**
 * Save user data to file
 */
function saveUserData() {
    console.log('\n📍 Saving user data...');
    fs.writeFileSync('test-data-output.json', JSON.stringify({
        generatedAt: new Date().toISOString(),
        baseUrl: api.defaults.baseURL,
        users: userData
    }, null, 2));
    console.log('✅ User data saved to test-data-output.json');
}

/**
 * Main execution
 */
async function main() {
    console.log('╔════════════════════════════════════════╗');
    console.log('║  Messenger API Test Data Setup        ║');
    console.log('╚════════════════════════════════════════╝');
    
    try {
        await resetSystem();
        await createUsers();
        await loginUsers();
        
        if (process.argv.includes('--full')) {
            const conversations = await createSampleConversations();
            await sendSampleMessages(conversations);
        }
        
        saveUserData();
        
        console.log('\n╔════════════════════════════════════════╗');
        console.log('║  ✅ Setup Complete!                    ║');
        console.log('╚════════════════════════════════════════╝');
        console.log(`\nCreated ${Object.keys(userData).length} users`);
        console.log('User data saved to: test-data-output.json');
        console.log('\nYou can now start testing! 🚀');
    } catch (error) {
        console.error('\n❌ Setup failed:', error.message);
        process.exit(1);
    }
}

main();
