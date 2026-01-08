# Testing Setup Instructions

## Quick Start

### 1. Start the Application
```bash
docker-compose up
```

### 2. Run the Setup Script
```bash
node setup-test-data.js
```

This will:
- ✅ Reset the system
- ✅ Create 20 test users
- ✅ Login all users and save their tokens
- ✅ Save user data to `test-data-output.json`

### 3. Start Testing!
Open Thunder Client or Postman and start executing test cases from [testCases.md](testCases.md)

---

## Files Overview

### 1. [api.md](api.md)
**Complete API reference** with all 19 endpoints organized by category:
- Health & Utilities (2)
- Auth (4)
- Users (6)
- Conversations (5)
- Messages (2)

Each endpoint includes:
- HTTP method and path
- Required parameters
- Request/response examples
- Error codes

### 2. [testCases.md](testCases.md)
**58 comprehensive test cases** divided into 4 parts:
- **Part 1 - Auth:** 13 test cases
- **Part 2 - Users:** 14 test cases
- **Part 3 - Conversations:** 17 test cases
- **Part 4 - Messages:** 14 test cases

Each test case includes:
- Unique ID
- Pre-conditions
- Step-by-step instructions
- Expected results
- Evidence placeholder

### 3. [test-users.json](test-users.json)
**20 dummy users** ready to be created:
- alice, bob, charlie, david, eve, frank, grace, henry, iris, jack
- kate, leo, mia, noah, olivia, peter, quinn, rachel, sam, tina

All users have:
- Unique username
- Email: `{username}@test.com`
- Password: `password123`

### 4. [setup-test-data.js](setup-test-data.js)
**Automated setup script** that:
- Resets the system (clears all data)
- Creates all 20 users from `test-users.json`
- Logs in each user
- Saves tokens to `test-data-output.json`

**Optional full setup:**
```bash
node setup-test-data.js --full
```
This also creates:
- Sample DIRECT conversation (alice ↔ bob)
- Sample GROUP conversation (alice, bob, charlie, david)
- Sample messages in both conversations

---

## Team Workflow

### Division of Work (4 Team Members)

#### Member 1: Auth Testing
**Focus:** Test cases TC-AUTH-001 through TC-AUTH-013
- Signup validation
- Login functionality  
- Logout
- Token authentication

**Deliverables:**
- Execute 13 auth test cases
- Document all results in spreadsheet
- Screenshot evidence
- Defect reports for bugs found

#### Member 2: User Testing
**Focus:** Test cases TC-USER-001 through TC-USER-014
- Get users endpoints
- Update user (self-update rule)
- Block/unblock functionality
- Authorization checks

**Deliverables:**
- Execute 14 user test cases
- Document all results
- Screenshot evidence
- Defect reports

#### Member 3: Conversation Testing (You!)
**Focus:** Test cases TC-CONV-001 through TC-CONV-017
- Create DIRECT/GROUP conversations
- Duplicate conversation prevention
- Add/remove members
- Membership validation
- Block user integration

**Deliverables:**
- Execute 17 conversation test cases
- Document all results
- Screenshot evidence
- Defect reports

#### Member 4: Message Testing
**Focus:** Test cases TC-MSG-001 through TC-MSG-014
- Send messages in DIRECT/GROUP
- Get messages
- Block functionality in messaging
- Security testing (XSS, SQL injection)
- Edge cases

**Deliverables:**
- Execute 14 message test cases
- Document all results
- Screenshot evidence
- Defect reports

---

## Daily Testing Routine

### Each Testing Session:

1. **Reset the system**
   ```bash
   curl http://localhost:8080/reset
   ```

2. **Run setup script**
   ```bash
   node setup-test-data.js
   ```

3. **Load user data**
   - Open `test-data-output.json`
   - Copy tokens for your tests

4. **Execute test cases**
   - Follow [testCases.md](testCases.md)
   - Use Thunder Client/Postman
   - Screenshot each result

5. **Document results**
   - Update test case status
   - Record actual results
   - Note any bugs found

---

## Using the Generated Data

After running `setup-test-data.js`, you'll have `test-data-output.json`:

```json
{
  "generatedAt": "2026-01-08T...",
  "baseUrl": "http://localhost:8080",
  "users": {
    "alice": {
      "userId": 101,
      "email": "alice@test.com",
      "password": "password123",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    },
    "bob": {
      "userId": 102,
      ...
    }
  }
}
```

**How to use:**
1. Open the file
2. Copy the token for the user you need
3. Paste in Thunder Client Authorization header
4. Run your test!

---

## Example Test Execution

### Test Case: TC-CONV-001 (Create DIRECT Conversation)

**1. Setup:**
```bash
# Make sure system is ready
node setup-test-data.js
```

**2. Get tokens from test-data-output.json:**
- Alice token: `eyJhbGci...`
- Bob userId: `102`

**3. Thunder Client:**
- **Method:** POST
- **URL:** `http://localhost:8080/conversations/create`
- **Headers:**
  - `Authorization: Bearer eyJhbGci...` (alice's token)
  - `Content-Type: application/json`
- **Body:**
  ```json
  {
    "type": "DIRECT",
    "name": null,
    "memberIds": [102]
  }
  ```

**4. Expected:** 200 OK, returns conversationId

**5. Screenshot** request + response

**6. Document:**
- ✅ If matches expected → PASS
- ❌ If different → FAIL, create defect report

---

## Troubleshooting

### Script fails: "fetch is not defined"
**Solution:** You need Node.js 18+ (fetch is built-in)
```bash
node --version  # Should be >= 18.0.0
```

If using older Node.js:
```bash
npm install node-fetch
```
Then modify script to use: `const fetch = require('node-fetch');`

### Users already exist
**Solution:** Reset first
```bash
curl http://localhost:8080/reset
node setup-test-data.js
```

### Can't connect to localhost:8080
**Solution:** Make sure Docker container is running
```bash
docker-compose up
```

---

## Tips for Effective Testing

### 1. Test Systematically
- Don't skip test cases
- Execute in order when possible
- Document everything

### 2. Look for Patterns
If one endpoint has a bug, similar endpoints might too:
- Test all GET endpoints for auth issues
- Test all POST endpoints for validation
- Test all block-related functionality together

### 3. Edge Cases Matter
Don't just test happy paths:
- Empty strings
- Null values
- Very long inputs
- Special characters
- Invalid IDs
- Boundary values

### 4. Evidence is Key
Every test needs:
- Screenshot of request
- Screenshot of response
- Timestamp
- Test case ID in filename

### 5. Document Clearly
**Good defect report:**
```
DEF-001: Duplicate DIRECT conversation allowed

Severity: High
Steps: 
1. Create DIRECT between alice (101) and bob (102)
2. Try creating same DIRECT again
Expected: 400 error
Actual: 200 OK, creates duplicate
Test Case: TC-CONV-002
Evidence: screenshot-def-001.png
```

---

## Bonus Points Opportunity

Your team can earn bonus points by:

1. **Extending the setup script:**
   - Add functions for common test scenarios
   - Create blocked user setups
   - Generate various conversation states

2. **Creating automation:**
   - Automated test runner
   - Test report generator
   - Screenshot automation

3. **Advanced testing:**
   - Performance testing
   - Concurrent user testing
   - Fuzzing invalid inputs

---

## Need Help?

- **API Reference:** See [api.md](api.md)
- **Test Cases:** See [testCases.md](testCases.md)
- **API Spec:** See [Documentation.md](Documentation.md)
- **Setup Issues:** See [SETUP_GUIDE.md](SETUP_GUIDE.md)

Good luck with your testing! 🚀
