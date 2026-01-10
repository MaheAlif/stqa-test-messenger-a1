# Test Cases for Messenger API

## Test Case Template

| Test ID     | Title             | Pre-conditions | Steps                       | Expected Result                    | Actual Result                      | Status    | Evidence                                 | Pass/Fail |
| ----------- | ----------------- | -------------- | --------------------------- | ---------------------------------- | ---------------------------------- | --------- | ---------------------------------------- | --------- |
| TC-AUTH-001 | Valid User Signup | None           | POST /auth/signup with body | `{"username":"mahe","userId":124}` | `{"username":"Mahe","userId":124}` | Completed | [Link](Evidence/screenshot-auth-001.png) | Pass      |

---

## PART 1: AUTH APIs

### TC-AUTH-001: Valid User Signup

- **Pre-conditions:** None
- **Steps:**
  1. POST /auth/signup
  2. Body: `{"username":"mahe","email":"mahe@test.com","password":"1234"}`
- **Expected:** 201 Created, returns `{"username":"mahe","userId":124}`
- **Actual:** 201 Created, returns `{
    "username": "Mahe",
    "userId": 124
}`
- **Evidence:** ![Test result](Evidence/screenshot-auth-001.png)

### TC-AUTH-002: Duplicate Username Signup

- **Pre-conditions:** User "alice" already exists
- **Steps:**
  1. POST /auth/signup
  2. Body: `{"username":"alice","email":"alice2@test.com","password":"1234"}`
- **Expected:** 400 Bad Request, "Username already taken"
- **Actual:** 400 Bad Request, returns `{Username already taken}`

- **Evidence:** ![Test result](Evidence/screenshot-auth-002.png)

### TC-AUTH-003: Signup with Empty Username

- **Pre-conditions:** None
- **Steps:**
  1. POST /auth/signup
  2. Body: `{"username":"","email":"test@test.com","password":"1234"}`
- **Expected:** 400 Bad Request
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-auth-003.png

### TC-AUTH-004: Signup with Null Email

- **Pre-conditions:** None
- **Steps:**
  1. POST /auth/signup
  2. Body: `{"username":"testuser","email":null,"password":"1234"}`
- **Expected:** 400 Bad Request
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-auth-004.png

### TC-AUTH-005: Signup with Invalid Email Format

- **Pre-conditions:** None
- **Steps:**
  1. POST /auth/signup
  2. Body: `{"username":"testuser","email":"notanemail","password":"1234"}`
- **Expected:** 400 Bad Request (or accepts if no validation)
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-auth-005.png

### TC-AUTH-006: Signup with Empty Password

- **Pre-conditions:** None
- **Steps:**
  1. POST /auth/signup
  2. Body: `{"username":"testuser","email":"test@test.com","password":""}`
- **Expected:** 400 Bad Request
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-auth-006.png

### TC-AUTH-007: Valid Login

- **Pre-conditions:** User "alice" exists with password "1234"
- **Steps:**
  1. POST /auth/login
  2. Body: `{"username":"alice","password":"1234"}`
- **Expected:** 200 OK, returns JWT token and userId
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-auth-007.png

### TC-AUTH-008: Login with Wrong Password

- **Pre-conditions:** User "alice" exists
- **Steps:**
  1. POST /auth/login
  2. Body: `{"username":"alice","password":"wrong"}`
- **Expected:** 401 Unauthorized, "Invalid password"
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-auth-008.png

### TC-AUTH-009: Login with Non-existent User

- **Pre-conditions:** User "nobody" does not exist
- **Steps:**
  1. POST /auth/login
  2. Body: `{"username":"nobody","password":"1234"}`
- **Expected:** 401 Unauthorized, "User not found"
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-auth-009.png

### TC-AUTH-010: Logout

- **Pre-conditions:** User "alice" is logged in
- **Steps:**
  1. POST /auth/logout?username=alice
- **Expected:** 200 OK, "User logged out successfully"
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-auth-010.png

### TC-AUTH-011: Auth Test with Valid Token

- **Pre-conditions:** User "alice" logged in, has valid JWT token
- **Steps:**
  1. GET /auth/test
  2. Header: `Authorization: Bearer <valid_token>`
- **Expected:** 200 OK, "Hello, alice! This is a protected API."
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-auth-011.png

### TC-AUTH-012: Auth Test with Invalid Token

- **Pre-conditions:** None
- **Steps:**
  1. GET /auth/test
  2. Header: `Authorization: Bearer invalid_token_123`
- **Expected:** 403 Forbidden
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-auth-012.png

### TC-AUTH-013: Auth Test without Token

- **Pre-conditions:** None
- **Steps:**
  1. GET /auth/test
  2. No Authorization header
- **Expected:** 403 Forbidden
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-auth-013.png

### TC-AUTH-014: Invalid request method

- **Pre-conditions:** None
- **Steps:**
  1. GET /auth/signup
  2. Body: `{"username":"alice","email":"alice@test.com","password":"1234"}`
- **Expected:** 405 Method Not Allowed
- **Actual:** 405 Method Not Allowed, returns `{"timestamp":"2026-01-08T17:31:32.671Z","status":405,"error":"Method Not Allowed","path":"/auth/signup"}`
- **Evidence:** ![Test result](Evidence/screenshot-auth-014.png)

---

## PART 2: USER APIs

### TC-USER-001: Get All Users (Authorized)

- **Pre-conditions:** User "alice" logged in with valid token
- **Steps:**
  1. GET /users/
  2. Header: `Authorization: Bearer <alice_token>`
- **Expected:** 200 OK, returns array of users
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-user-001.png

### TC-USER-002: Get All Users (Unauthorized)

- **Pre-conditions:** None
- **Steps:**
  1. GET /users/
  2. No Authorization header
- **Expected:** 401 Unauthorized
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-user-002.png

### TC-USER-003: Get User by Valid ID

- **Pre-conditions:** User "alice" (userId: 101) exists, user logged in
- **Steps:**
  1. GET /users/101
  2. Header: `Authorization: Bearer <token>`
- **Expected:** 200 OK, returns alice's user object
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-user-003.png

### TC-USER-004: Get User by Invalid ID

- **Pre-conditions:** User logged in
- **Steps:**
  1. GET /users/999
  2. Header: `Authorization: Bearer <token>`
- **Expected:** 404 Not Found, "User not found"
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-user-004.png

### TC-USER-005: Get User by Valid Username

- **Pre-conditions:** User "alice" exists, user logged in
- **Steps:**
  1. GET /users/username/alice
  2. Header: `Authorization: Bearer <token>`
- **Expected:** 200 OK, returns alice's user object
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-user-005.png

### TC-USER-006: Get User by Non-existent Username

- **Pre-conditions:** User logged in
- **Steps:**
  1. GET /users/username/nobody
  2. Header: `Authorization: Bearer <token>`
- **Expected:** 404 Not Found, "User not found"
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-user-006.png

### TC-USER-007: Update Own User (Valid)

- **Pre-conditions:** User "alice" (userId: 101) logged in
- **Steps:**
  1. PATCH /users/101
  2. Header: `Authorization: Bearer <alice_token>`
  3. Body: `{"email":"newemail@test.com"}`
- **Expected:** 200 OK, user updated successfully
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-user-007.png

### TC-USER-008: Update Another User (Forbidden)

- **Pre-conditions:** User "alice" (userId: 101) and "bob" (userId: 102) exist, alice logged in
- **Steps:**
  1. PATCH /users/102
  2. Header: `Authorization: Bearer <alice_token>`
  3. Body: `{"email":"hacked@test.com"}`
- **Expected:** 403 Forbidden, "You can only update your own user details"
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-user-008.png

### TC-USER-009: Update User with ID in Body (Invalid)

- **Pre-conditions:** User "alice" (userId: 101) logged in
- **Steps:**
  1. PATCH /users/101
  2. Header: `Authorization: Bearer <alice_token>`
  3. Body: `{"userId":999,"email":"test@test.com"}`
- **Expected:** 400 Bad Request, "User ID cannot be updated"
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-user-009.png

### TC-USER-010: Block User (Valid)

- **Pre-conditions:** User "alice" (101) and "bob" (102) exist, alice logged in
- **Steps:**
  1. PATCH /users/block/102
  2. Header: `Authorization: Bearer <alice_token>`
- **Expected:** 200 OK, "User blocked successfully"
- **Actual:** 200 OK, returns `{
    "message": "User blocked successfully",
    "data": null
}`
- **Evidence:** ![TC-USER-010](Evidence/TC-USER-010.png)

### TC-USER-011: Block Non-existent User

- **Pre-conditions:** User "alice" logged in
- **Steps:**
  1. PATCH /users/block/999
  2. Header: `Authorization: Bearer <alice_token>`
- **Expected:** 400 Bad Request, "User to be blocked not found"
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-user-011.png

### TC-USER-012: Block Self

- **Pre-conditions:** User "alice" (userId: 101) logged in
- **Steps:**
  1. PATCH /users/block/101
  2. Header: `Authorization: Bearer <alice_token>`
- **Expected:** 400 Bad Request (or accepts - test to see)
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-user-012.png

### TC-USER-013: Unblock User (Valid)

- **Pre-conditions:** User "alice" has blocked "bob"
- **Steps:**
  1. DELETE /users/block/102
  2. Header: `Authorization: Bearer <alice_token>`
- **Expected:** 200 OK, "User unblocked successfully"
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-user-013.png

### TC-USER-014: Unblock User Not Blocked

- **Pre-conditions:** User "alice" has NOT blocked "bob"
- **Steps:**
  1. DELETE /users/block/102
  2. Header: `Authorization: Bearer <alice_token>`
- **Expected:** 400 Bad Request or 200 OK (test to see)
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-user-014.png

---

## PART 3: CONVERSATION APIs

### TC-CONV-001: Create DIRECT Conversation (Valid)

- **Pre-conditions:** User "alice" (101) and "bob" (102) exist, alice logged in, no existing DIRECT between them
- **Steps:**
  1. POST /conversations/create
  2. Header: `Authorization: Bearer <alice_token>`
  3. Body: `{"type":"DIRECT","name":null,"memberIds":[102]}`
- **Expected:** 200 OK, returns conversationId
- **Actual:** 200 OK, returns `{
    "type": "DIRECT",
    "name": null,
    "conversationId": 203
}`
- **Evidence:** ![test result](Evidence/TC-CONV-001.png)

### TC-CONV-002: Create Duplicate DIRECT Conversation

- **Pre-conditions:** DIRECT conversation already exists between alice (101) and bob (102)
- **Steps:**
  1. POST /conversations/create
  2. Header: `Authorization: Bearer <alice_token>`
  3. Body: `{"type":"DIRECT","name":null,"memberIds":[102]}`
- **Expected:** 400 Bad Request or returns existing conversation (test to see)
- **Actual:** 400 Bad Request, returns `{
    "timestamp": "2026-01-08T19:41:38.067Z",
    "status": 400,
    "error": "Bad Request",
    "path": "/conversations/create"
}`
- **Evidence:** ![TC-CONV-002](Evidence/TC-CONV-002.png)

### TC-CONV-003: Create GROUP Conversation (Valid)

- **Pre-conditions:** Users alice (101), bob (102), charlie (103) exist, alice logged in
- **Steps:**
  1. POST /conversations/create
  2. Header: `Authorization: Bearer <alice_token>`
  3. Body: `{"type":"GROUP","name":"Test Group","memberIds":[102,103]}`
- **Expected:** 200 OK, returns conversationId, alice auto-included
- **Actual:** 200 OK, returns `{
    "type": "GROUP",
    "name": "Friends Forever !!!",
    "conversationId": 204
}`
- **Evidence:** ![TC-CONV-003](Evidence/TC-CONV-003.png)

### TC-CONV-004: Create GROUP with Empty Name

- **Pre-conditions:** Users alice (101), bob (102) exist, alice logged in
- **Steps:**
  1. POST /conversations/create
  2. Header: `Authorization: Bearer <alice_token>`
  3. Body: `{"type":"GROUP","name":"","memberIds":[102]}`
- **Expected:** 400 Bad Request or accepts empty name (test to see)
- **Actual:** 200 OK, returns `{
    "type": "GROUP",
    "name": "",
    "conversationId": 206
}`
- **Verdict:** This is a **Defect**
- **Evidence:** ![Defect-CONV-002](Evidence/TC-CONV-004.png)

### TC-CONV-005: Create DIRECT with Non-existent User

- **Pre-conditions:** User alice logged in
- **Steps:**
  1. POST /conversations/create
  2. Header: `Authorization: Bearer <alice_token>`
  3. Body: `{"type":"DIRECT","name":null,"memberIds":[999]}`
- **Expected:** 400 Bad Request, "User not found"
- **Actual:** 200 OK, returns `{
    "type": "DIRECT",
    "name": null,
    "conversationId": 207
}`
- **Verdict:** This is a **Defect**
- **Evidence:** ![TC-CONV-005](Evidence/TC-CONV-005.png)

### TC-CONV-006: Create DIRECT with Blocked User

- **Pre-conditions:** Alice has blocked Bob (102)
- **Steps:**
  1. POST /conversations/create
  2. Header: `Authorization: Bearer <alice_token>`
  3. Body: `{"type":"DIRECT","name":null,"memberIds":[102]}`
- **Expected:** 400 Bad Request, cannot create conversation with blocked user
- **Actual:** 200 OK, returns `{
    "type": "DIRECT",
    "name": null,
    "conversationId": 208
}`
- **Verdict:** This is a **Defect**
- **Evidence:** ![TC-CONV-006](Evidence/TC-CONV-006.png)

### TC-CONV-007: Get My Conversations

- **Pre-conditions:** Alice has 3 conversations, logged in
- **Steps:**
  1. GET /conversations/get
  2. Header: `Authorization: Bearer <alice_token>`
- **Expected:** 200 OK, returns array with 3 conversations
- **Actual:** 200 OK, returns `[
    {
        "type": "DIRECT",
        "name": null,
        "conversationId": 201
    },
    {
        "type": "GROUP",
        "name": "Test Group",
        "conversationId": 202
    },
    {
        "type": "DIRECT",
        "name": null,
        "conversationId": 203
    }
]`
- **Evidence:** ![Test result](Evidence/TC-CONV-007.png)

### TC-CONV-008: Get Conversation by ID (Member)

- **Pre-conditions:** Conversation 201 exists, alice is member, logged in
- **Steps:**
  1. GET /conversations/201
  2. Header: `Authorization: Bearer <alice_token>`
- **Expected:** 200 OK, returns conversation details
- **Actual:** 200 OK, returns `{
    "type": "DIRECT",
    "name": null,
    "conversationId": 201
}`
- **Evidence:** ![TC-CONV-008](Evidence/TC-CONV-008.png)

### TC-CONV-009: Get Conversation by ID (Non-member)

- **Pre-conditions:** Conversation 204 exists(between Eve and Frank), alice is NOT member
- **Steps:**
  1. GET /conversations/204
  2. Header: `Authorization: Bearer <alice_token>`
- **Expected:** 400 Bad Request, "User is not a member of this conversation"
- **Actual:** 400 Bad Request, returns `"User is not a member of this conversation"`
- **Evidence:** ![TC-CONV-009](Evidence/TC-CONV-009.png)

### TC-CONV-010: Get Non-existent Conversation

- **Pre-conditions:** User alice logged in
- **Steps:**
  1. GET /conversations/999
  2. Header: `Authorization: Bearer <alice_token>`
- **Expected:** 400 Bad Request, "Conversation not found"
- **Actual:** 400 Bad Request, returns `"Conversation not found"`
- **Evidence:** ![TC-CONV-010](Evidence/TC-CONV-010.png)

### TC-CONV-011: Add Member to GROUP (Creator)

- **Pre-conditions:** GROUP conversation 202 exists, alice is creator, david (104) exists
- **Steps:**
  1. POST /conversations/addMember
  2. Header: `Authorization: Bearer <alice_token>`
  3. Body: `{"conversationId":202,"members":[104]}`
- **Expected:** 200 OK, "Members added successfully"
- **Actual:** 200 OK, returns `{
    "message": "Members added successfully",
    "conversationId": 202,
    "memberIds": [
        101,
        102,
        103,
        104
    ]
}`
- **Evidence:** ![TC-CONV-011](Evidence/TC-CONV-011.png)

### TC-CONV-012: Add Member to GROUP (Non-creator)

- **Pre-conditions:** GROUP 202 exists, alice is creator, bob is member (not creator)
- **Steps:**
  1. POST /conversations/addMember
  2. Header: `Authorization: Bearer <bob_token>`
  3. Body: `{"conversationId":202,"members":[104]}`
- **Expected:** 400 Bad Request, only creator can add (per spec)
- **Actual:** 200 OK, returns `{
    "message": "Members added successfully",
    "conversationId": 202,
    "memberIds": [
        101,
        102,
        103,
        104
    ]
}`
- **Verdict:** This is a **Defect**
- **Evidence:** ![TC-CONV-012](Evidence/TC-CONV-012.png)

### TC-CONV-013: Add Blocked User to GROUP

- **Pre-conditions:** GROUP 202 exists, alice is creator, alice blocked jack(110)
- **Steps:**
  1. POST /conversations/addMember
  2. Header: `Authorization: Bearer <alice_token>`
  3. Body: `{"conversationId":202,"members":[110]}`
- **Expected:** 400 Bad Request, cannot add blocked user
- **Actual:** 200 OK, returns `{
    "message": "Members added successfully",
    "conversationId": 202,
    "memberIds": [
        101,
        102,
        103,
        104,
        110
    ]
}`
- **Evidence:** ![TC-CONV-013](Evidence/TC-CONV-013.png)

### TC-CONV-014: Add Member to DIRECT Conversation

- **Pre-conditions:** DIRECT conversation 201 between alice and bob exists, add jack (110)
- **Steps:**
  1. POST /conversations/addMember
  2. Header: `Authorization: Bearer <alice_token>`
  3. Body: `{"conversationId":201,"members":[110]}`
- **Expected:** 400 Bad Request, cannot add to DIRECT (test to see)
- **Actual:** 200 OK, returns `{
    "message": "Members added successfully",
    "conversationId": 201,
    "memberIds": [
        101,
        102,
        103,
        110
    ]
}`
- **Evidence:** ![TC-CONV-014](Evidence/TC-CONV-014.png)

### TC-CONV-015: Remove Member from GROUP (Creator)

- **Pre-conditions:** GROUP 202 exists, alice is creator, bob (102) is member
- **Steps:**
  1. POST /conversations/removeMember
  2. Header: `Authorization: Bearer <alice_token>`
  3. Body: `{"conversationId":202,"members":[102]}`
- **Expected:** 200 OK, "Member removed successfully"
- **Actual:** 200 OK, returns `{
    "message": "Member removed successfully",
    "conversationId": 202,
    "memberIds": [
        101,
        103,
        104,
        110
    ]
}`
- **Evidence:** ![TC-CONV-015](Evidence/TC-CONV-015.png)

### TC-CONV-016: Remove Member from GROUP (Non-creator)

- **Pre-conditions:** GROUP 202 exists, alice(101) is creator, bob(102) is member
- **Steps:**
  1. POST /conversations/removeMember
  2. Header: `Authorization: Bearer <bob_token>`
  3. Body: `{"conversationId":202,"members":[103]}`
- **Expected:** 400 Bad Request, only creator can remove
- **Actual:** 500 Internal Server Error, returns `{
    "timestamp": "2026-01-09T15:28:50.778Z",
    "status": 500,
    "error": "Internal Server Error",
    "path": "/conversations/removeMember"
}`
- **Evidence:** ![TC-CONV-016](Evidence/TC-CONV-016.png)

### TC-CONV-017: Remove Self from GROUP

- **Pre-conditions:** GROUP 201 exists, bob(102) is a member
- **Steps:**
  1. POST /conversations/removeMember
  2. Header: `Authorization: Bearer <bob_token>`
  3. Body: `{"conversationId":201,"members":[102]}`
- **Expected:** 200 OK or 400 (test to see - can user leave group?)
- **Actual:** 200 OK, returns `{
    "message": "Member removed successfully",
    "conversationId": 201,
    "memberIds": [
        101,
        103,
        110
    ]
}`
- **Evidence:** ![TC-CONV-017](Evidence/TC-CONV-017.png)

### TC-CONV-018: Add a third Member (charlie - 103) to DIRECT Conversation, between Alice (101) and Bob (102)

- **Pre-conditions:** DIRECT conversation 201 between alice and bob
- **Steps:**
  1. POST /conversations/addMember
  2. Header: `Authorization: Bearer <alice_token>`
  3. Body: `{"conversationId":201,"members":[103]}`
- **Expected:** 400 Bad Request, cannot add to DIRECT (test to see)
- **Actual:** 200 OK, returns `{
    "message": "Members added successfully",
    "conversationId": 201,
    "memberIds": [
        101,
        102,
        103
    ]
}`
- **Verdict:** This is a **Defect**
- **Evidence:** ![TC-CONV-018](Evidence/TC-CONV-018.png)

---

## PART 4: MESSAGE APIs

### TC-MSG-001: Send Message in DIRECT (Valid)

- **Pre-conditions:** DIRECT conversation 201 between alice and bob, alice logged in
- **Steps:**
    1. POST /messages/201/send
    2. Header: `Authorization: Bearer <alice_token>`, `Content-Type: text/plain`
    3. Body: `Hello Bob!`
- **Expected:** 200 OK, "Message sent successfully"
- **Actual:** 200 OK, returns `{
  "message": "Message sent successfully",
  "data": [
  {
  "id": 1001,
  "conversationId": 201,
  "senderId": 101,
  "content": "Hello Bob! αªòαª┐ αªàαª¼αª╕αºìαªÑαª╛ αª¡αª╛αªç !!! ",
  "timestamp": 1767974142471
  }
  ]
  }`
- **Evidence:** ![TC-MSG-001](Evidence/TC-MSG-001.png)

### TC-MSG-002: Send Message in GROUP (Valid)

- **Pre-conditions:** GROUP conversation 202, alice is member
- **Steps:**
    1. POST /messages/202/send
    2. Header: `Authorization: Bearer <alice_token>`, `Content-Type: text/plain`
    3. Body: `Hello everyone!`
- **Expected:** 200 OK, "Message sent successfully"
- **Actual:** 200 OK, returns `{
  "message": "Message sent successfully",
  "data": [
  {
  "id": 1008,
  "conversationId": 202,
  "senderId": 101,
  "content": "Hello everyone! Welcome to the test group.",
  "timestamp": 1767974377481
  },
  {
  "id": 1009,
  "conversationId": 202,
  "senderId": 102,
  "content": "Thanks Alice! Happy to be here.",
  "timestamp": 1767974377490
  },
  {
  "id": 1010,
  "conversationId": 202,
  "senderId": 103,
  "content": "Hi team!",
  "timestamp": 1767974377497
  },
  {
  "id": 1014,
  "conversationId": 202,
  "senderId": 101,
  "content": "Hello everyone! αªòαºçαª«αª¿ αªåαª¢αºï αª╕αª¼αª╛αªç ? ",
  "timestamp": 1767974525076
  }
  ]
  }`
- **Evidence:** ![TC-MSG-002](Evidence/TC-MSG-002.png)

### TC-MSG-003: Send Message (Non-member)

- **Pre-conditions:** Conversation 202 exists, eve(105) is NOT member
- **Steps:**
    1. POST /messages/202/send
    2. Header: `Authorization: Bearer <alice_token>`, `Content-Type: text/plain`
    3. Body: `Trying to hack in`
- **Expected:** 400 Bad Request, "User is not a member of this conversation"
- **Actual:** 400 Bad Request, returns `{
  "message": "User is not a member of this conversation",
  "data": null
  }`
- **Evidence:** ![TC-MSG-003](Evidence/TC-MSG-003.png)

### TC-MSG-004: Send Empty Message

- **Pre-conditions:** DIRECT conversation 201, alice is member
- **Steps:**
    1. POST /messages/201/send
    2. Header: `Authorization: Bearer <alice_token>`, `Content-Type: text/plain`
    3. Body: ``
- **Expected:** 400 Bad Request or accepts empty (test to see)
- **Actual:** 200 OK, returns ``
- **Verdict:** It's a **Defect**
- **Evidence:** ![TC-MSG-004](Evidence/TC-MSG-004.png)

### TC-MSG-005: Send Very Long Message

- **Pre-conditions:** DIRECT conversation 201, alice is member
- **Steps:**
    1. POST /messages/201/send
    2. Header: `Authorization: Bearer <alice_token>`, `Content-Type: text/plain`
    3. Body: `[10000 characters string]`
- **Expected:** 200 OK or 400 if length limit (test to see)
- **Actual:** 200 OK, returns `{
  "message": "Message sent successfully",
  "data": [
  {
  "id": 1001,
  "conversationId": 201,
  "senderId": 101,
  "content": "Hello Bob! This is a test message.",
  "timestamp": 1767974377414
  },
  {
  "id": 1002,
  "conversationId": 201,
  "senderId": 102,
  "content": "Hi Alice! Got your message.",
  "timestamp": 1767974377421
  },
  {
  "id": 1003,
  "conversationId": 201,
  "senderId": 101,
  "content": "Message 1 from Alice",
  "timestamp": 1767974377432
  },
  {
  "id": 1004,
  "conversationId": 201,
  "senderId": 101,
  "content": "Message 2 from Alice",
  "timestamp": 1767974377443
  },
  {
  "id": 1005,
  "conversationId": 201,
  "senderId": 101,
  "content": "Message 3 from Alice",
  "timestamp": 1767974377453
  },
  {
  "id": 1006,
  "conversationId": 201,
  "senderId": 101,
  "content": "Message 4 from Alice",
  "timestamp": 1767974377462
  },
  {
  "id": 1007,
  "conversationId": 201,
  "senderId": 101,
  "content": "Message 5 from Alice",
  "timestamp": 1767974377472
  },
  {
  "id": 1016,
  "conversationId": 201,
  "senderId": 101,
  "content": "   ",
  "timestamp": 1767975287537
  },
  {
  "id": 1017,
  "conversationId": 201,
  "senderId": 101,
  "content": "1 million unsorted numbers!",
  "timestamp": 1767975599697
  }
  ]
  }`
- **Evidence:** ![TC-MSG-005](Evidence/TC-MSG-005.png)

### TC-MSG-006: Send Message in DIRECT (Receiver Blocked Sender)

- **Pre-conditions:** DIRECT 201 between alice and bob, bob blocked alice
- **Steps:**
  1. POST /messages/201/send
  2. Header: `Authorization: Bearer <alice_token>`, `Content-Type: text/plain`
  3. Body: `Can you see this?`
- **Expected:** 400 Bad Request, "You must unblock the user to send messages"
- **Actual:** 400 Bad Request, returns `{
  "timestamp": "2026-01-10T13:20:26.716Z",
  "status": 405,
  "error": "Method Not Allowed",
  "path": "/messages/201/send"
  }`
- **Evidence:** ![TC-MSG-006](Evidence/TC-MSG-006.png)

### TC-MSG-007: Send Message in DIRECT (Sender Blocked Receiver)

- **Pre-conditions:** DIRECT 201 between alice and bob, alice blocked bob
- **Steps:**
  1. POST /messages/201/send
  2. Header: `Authorization: Bearer <alice_token>`, `Content-Type: text/plain`
  3. Body: `You're blocked!`
- **Expected:** 400 Bad Request, "You cannot send message to this conversation"
- **Actual:** 400 bad Request, returns `{
  "message": "You must unblock the user to send messages",
  "data": null
  }`
- **Evidence:** ![TC-MSG-007](Evidence/TC-MSG-007.png)

### TC-MSG-008: Send Message in GROUP (Member Blocked Another)

- **Pre-conditions:** GROUP 202 with alice, bob, charlie. Alice blocked bob
- **Steps:**
  1. POST /messages/202/send
  2. Header: `Authorization: Bearer <alice_token>`, `Content-Type: text/plain`
  3. Body: `Hello group!`
- **Expected:** 200 OK (blocking doesn't affect GROUP per spec)
- **Actual:** 200 OK, returns `{
  "message": "Message sent successfully",
  "data": [
  {
  "id": 1008,
  "conversationId": 202,
  "senderId": 101,
  "content": "Hello everyone! Welcome to the test group.",
  "timestamp": 1768051377823
  },
  {
  "id": 1009,
  "conversationId": 202,
  "senderId": 102,
  "content": "Thanks Alice! Happy to be here.",
  "timestamp": 1768051377830
  },
  {
  "id": 1010,
  "conversationId": 202,
  "senderId": 103,
  "content": "Hi team! 👋",
  "timestamp": 1768051377836
  },
  {
  "id": 1014,
  "conversationId": 202,
  "senderId": 101,
  "content": "Hello group! Bob are you there !!! ",
  "timestamp": 1768051700889
  },
  {
  "id": 1015,
  "conversationId": 202,
  "senderId": 101,
  "content": "Hello group!",
  "timestamp": 1768051777607
  }
  ]
  }`
- **Evidence:** ![TC-MSG-008](Evidence/TC-MSG-008.png)

### TC-MSG-009: Send Message to Non-existent Conversation

- **Pre-conditions:** User alice logged in
- **Steps:**
  1. POST /messages/999/send
  2. Header: `Authorization: Bearer <alice_token>`, `Content-Type: text/plain`
  3. Body: `Ghost message`
- **Expected:** 400 Bad Request, "Conversation not found"
- **Actual:** 400 Bad Request, returns `{
  "message": "Conversation not found",
  "data": null
  }`
- **Evidence:** ![TC-MSG-009](Evidence/TC-MSG-009.png)

### TC-MSG-010: Get Messages from Conversation (Member)

- **Pre-conditions:** Conversation 201 with 5 messages, alice is member
- **Steps:**
  1. GET /messages/201/get?page=0&size=20
  2. Header: `Authorization: Bearer <alice_token>`
- **Expected:** 200 OK, returns array of 5 messages
- **Actual:** 200 OK, returns `{
  "message": "Messages retrieved successfully",
  "data": [
  {
  "id": 1001,
  "conversationId": 201,
  "senderId": 101,
  "content": "Hello Bob! This is a test message.",
  "timestamp": 1768051377772
  },
  {
  "id": 1002,
  "conversationId": 201,
  "senderId": 102,
  "content": "Hi Alice! Got your message.",
  "timestamp": 1768051377780
  },
  {
  "id": 1003,
  "conversationId": 201,
  "senderId": 101,
  "content": "Message 1 from Alice",
  "timestamp": 1768051377789
  },
  {
  "id": 1004,
  "conversationId": 201,
  "senderId": 101,
  "content": "Message 2 from Alice",
  "timestamp": 1768051377795
  },
  {
  "id": 1005,
  "conversationId": 201,
  "senderId": 101,
  "content": "Message 3 from Alice",
  "timestamp": 1768051377803
  },
  {
  "id": 1006,
  "conversationId": 201,
  "senderId": 101,
  "content": "Message 4 from Alice",
  "timestamp": 1768051377810
  },
  {
  "id": 1007,
  "conversationId": 201,
  "senderId": 101,
  "content": "Message 5 from Alice",
  "timestamp": 1768051377816
  }
  ]
  }`
- **Evidence:** ![TC-MSG-010](Evidence/TC-MSG-010.png)

### TC-MSG-011: Get Messages (Non-member)

- **Pre-conditions:** Conversation 203 exists, alice is NOT member
- **Steps:**
  1. GET /messages/202/get?page=0&size=20
  2. Header: `Authorization: Bearer <alice_token>`
- **Expected:** 400 Bad Request, "Cannot access messages for this conversation"
- **Actual:** 400 bad Request, returns `{
  "message": "Cannot access messages for this conversation: User is not a member of this conversation",
  "data": null
  }`
- **Evidence:** ![TC-MSG-011](Evidence/TC-MSG-011.png)

### TC-MSG-012: Get Messages with Pagination

- **Pre-conditions:** Conversation 201 with 7 messages, alice is member
- **Steps:**
  1. GET /messages/201/get?page=1&size=10
  2. Header: `Authorization: Bearer <alice_token>`
- **Expected:** 200 OK (note: pagination may not work per Documentation)
- **Actual:** 200 OK, returns `{
  "message": "Messages retrieved successfully",
  "data": [
  {
  "id": 1001,
  "conversationId": 201,
  "senderId": 101,
  "content": "Hello Bob! This is a test message.",
  "timestamp": 1768051377772
  },
  {
  "id": 1002,
  "conversationId": 201,
  "senderId": 102,
  "content": "Hi Alice! Got your message.",
  "timestamp": 1768051377780
  },
  {
  "id": 1003,
  "conversationId": 201,
  "senderId": 101,
  "content": "Message 1 from Alice",
  "timestamp": 1768051377789
  },
  {
  "id": 1004,
  "conversationId": 201,
  "senderId": 101,
  "content": "Message 2 from Alice",
  "timestamp": 1768051377795
  },
  {
  "id": 1005,
  "conversationId": 201,
  "senderId": 101,
  "content": "Message 3 from Alice",
  "timestamp": 1768051377803
  },
  {
  "id": 1006,
  "conversationId": 201,
  "senderId": 101,
  "content": "Message 4 from Alice",
  "timestamp": 1768051377810
  },
  {
  "id": 1007,
  "conversationId": 201,
  "senderId": 101,
  "content": "Message 5 from Alice",
  "timestamp": 1768051377816
  }
  ]
  }`
- **Evidence:** ![TC-MSG-012](Evidence/TC-MSG-012.png)

### TC-MSG-013: Send Message with XSS Script

- **Pre-conditions:** Conversation 201, alice is member
- **Steps:**
  1. POST /messages/201/send
  2. Header: `Authorization: Bearer <alice_token>`, `Content-Type: text/plain`
  3. Body: `<script>alert('XSS')</script>`
- **Expected:** 200 OK (stored, but should be escaped on display)
- **Actual:** 500 Internal Server Error, returns `{
  "timestamp": "2026-01-10T13:58:07.095Z",
  "status": 500,
  "error": "Internal Server Error",
  "path": "/messages/201/send"
  }`
- **Evidence:** ![TC-MSG-013](Evidence/TC-MSG-013.png)

### TC-MSG-014: Send Message with SQL Injection

- **Pre-conditions:** Conversation 201, alice is member
- **Steps:**
  1. POST /messages/201/send
  2. Header: `Authorization: Bearer <alice_token>`, `Content-Type: text/plain`
  3. Body: `'; DROP TABLE messages; --`
- **Expected:** 200 OK (treated as plain text)
- **Actual:** 200 OK, returns `{
  "message": "Message sent successfully",
  "data": [
  {
  "id": 1001,
  "conversationId": 201,
  "senderId": 101,
  "content": "Hello Bob! This is a test message.",
  "timestamp": 1768053656454
  },
  {
  "id": 1002,
  "conversationId": 201,
  "senderId": 102,
  "content": "Hi Alice! Got your message.",
  "timestamp": 1768053656462
  },
  {
  "id": 1003,
  "conversationId": 201,
  "senderId": 101,
  "content": "Message 1 from Alice",
  "timestamp": 1768053656470
  },
  {
  "id": 1004,
  "conversationId": 201,
  "senderId": 101,
  "content": "Message 2 from Alice",
  "timestamp": 1768053656477
  },
  {
  "id": 1005,
  "conversationId": 201,
  "senderId": 101,
  "content": "Message 3 from Alice",
  "timestamp": 1768053656484
  },
  {
  "id": 1006,
  "conversationId": 201,
  "senderId": 101,
  "content": "Message 4 from Alice",
  "timestamp": 1768053656492
  },
  {
  "id": 1007,
  "conversationId": 201,
  "senderId": 101,
  "content": "Message 5 from Alice",
  "timestamp": 1768053656499
  },
  {
  "id": 1014,
  "conversationId": 201,
  "senderId": 101,
  "content": "<script>alert('XSS')</script>",
  "timestamp": 1768053660147
  },
  {
  "id": 1015,
  "conversationId": 201,
  "senderId": 101,
  "content": "'; DROP TABLE messages; --",
  "timestamp": 1768053719257
  }
  ]
  }`
- **Evidence:** ![TC-MSG-014](Evidence/TC-MSG-014.png)

---

## Test Summary

| Category      | Test Cases Count  |
| ------------- | ----------------- |
| Auth          | 13                |
| Users         | 14                |
| Conversations | 17                |
| Messages      | 14                |
| **TOTAL**     | **58 Test Cases** |

---

## Notes for Testers

1. **Execute tests in order** - Some tests depend on previous test data
2. **Reset between test suites** - Use `GET /reset` to clear data
3. **Save evidence** - Screenshot each request/response
4. **Document bugs** - If actual ≠ expected, create defect report
5. **Test blockers** - Priority tests: AUTH-001, AUTH-007, CONV-001, MSG-001
