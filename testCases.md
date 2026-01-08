# Test Cases for Messenger API

## Test Case Template

| Test ID | Title | Pre-conditions | Steps | Expected Result | Actual Result | Status | Evidence | Pass/Fail |
| ------- | ----- | -------------- | ----- | --------------- | ------------- | ------ | -------- | --------- |

---

## PART 1: AUTH APIs

### TC-AUTH-001: Valid User Signup

- **Pre-conditions:** None
- **Steps:**
  1. POST /auth/signup
  2. Body: `{"username":"alice","email":"alice@test.com","password":"1234"}`
- **Expected:** 201 Created, returns `{"username":"alice","userId":101}`
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-auth-001.png

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Test Cases for Messenger API](#test-cases-for-messenger-api)
  - [Test Case Template](#test-case-template)
  - [PART 1: AUTH APIs](#part-1-auth-apis)
    - [TC-AUTH-001: Valid User Signup](#tc-auth-001-valid-user-signup)
    - [TC-AUTH-002: Duplicate Username Signup](#tc-auth-002-duplicate-username-signup)
    - [TC-AUTH-003: Signup with Empty Username](#tc-auth-003-signup-with-empty-username)
    - [TC-AUTH-004: Signup with Null Email](#tc-auth-004-signup-with-null-email)
    - [TC-AUTH-005: Signup with Invalid Email Format](#tc-auth-005-signup-with-invalid-email-format)
    - [TC-AUTH-006: Signup with Empty Password](#tc-auth-006-signup-with-empty-password)
    - [TC-AUTH-007: Valid Login](#tc-auth-007-valid-login)
    - [TC-AUTH-008: Login with Wrong Password](#tc-auth-008-login-with-wrong-password)
    - [TC-AUTH-009: Login with Non-existent User](#tc-auth-009-login-with-non-existent-user)
    - [TC-AUTH-010: Logout](#tc-auth-010-logout)
    - [TC-AUTH-011: Auth Test with Valid Token](#tc-auth-011-auth-test-with-valid-token)
    - [TC-AUTH-012: Auth Test with Invalid Token](#tc-auth-012-auth-test-with-invalid-token)
    - [TC-AUTH-013: Auth Test without Token](#tc-auth-013-auth-test-without-token)
    - [TC-AUTH-014: Invalid request method](#tc-auth-014-invalid-request-method)
  - [PART 2: USER APIs](#part-2-user-apis)
    - [TC-USER-001: Get All Users (Authorized)](#tc-user-001-get-all-users-authorized)
    - [TC-USER-002: Get All Users (Unauthorized)](#tc-user-002-get-all-users-unauthorized)
    - [TC-USER-003: Get User by Valid ID](#tc-user-003-get-user-by-valid-id)
    - [TC-USER-004: Get User by Invalid ID](#tc-user-004-get-user-by-invalid-id)
    - [TC-USER-005: Get User by Valid Username](#tc-user-005-get-user-by-valid-username)
    - [TC-USER-006: Get User by Non-existent Username](#tc-user-006-get-user-by-non-existent-username)
    - [TC-USER-007: Update Own User (Valid)](#tc-user-007-update-own-user-valid)
    - [TC-USER-008: Update Another User (Forbidden)](#tc-user-008-update-another-user-forbidden)
    - [TC-USER-009: Update User with ID in Body (Invalid)](#tc-user-009-update-user-with-id-in-body-invalid)
    - [TC-USER-010: Block User (Valid)](#tc-user-010-block-user-valid)
    - [TC-USER-011: Block Non-existent User](#tc-user-011-block-non-existent-user)
    - [TC-USER-012: Block Self](#tc-user-012-block-self)
    - [TC-USER-013: Unblock User (Valid)](#tc-user-013-unblock-user-valid)
    - [TC-USER-014: Unblock User Not Blocked](#tc-user-014-unblock-user-not-blocked)
  - [PART 3: CONVERSATION APIs](#part-3-conversation-apis)
    - [TC-CONV-001: Create DIRECT Conversation (Valid)](#tc-conv-001-create-direct-conversation-valid)
    - [TC-CONV-002: Create Duplicate DIRECT Conversation](#tc-conv-002-create-duplicate-direct-conversation)
    - [TC-CONV-003: Create GROUP Conversation (Valid)](#tc-conv-003-create-group-conversation-valid)
    - [TC-CONV-004: Create GROUP with Empty Name](#tc-conv-004-create-group-with-empty-name)
    - [TC-CONV-005: Create DIRECT with Non-existent User](#tc-conv-005-create-direct-with-non-existent-user)
    - [TC-CONV-006: Create DIRECT with Blocked User](#tc-conv-006-create-direct-with-blocked-user)
    - [TC-CONV-007: Get My Conversations](#tc-conv-007-get-my-conversations)
    - [TC-CONV-008: Get Conversation by ID (Member)](#tc-conv-008-get-conversation-by-id-member)
    - [TC-CONV-009: Get Conversation by ID (Non-member)](#tc-conv-009-get-conversation-by-id-non-member)
    - [TC-CONV-010: Get Non-existent Conversation](#tc-conv-010-get-non-existent-conversation)
    - [TC-CONV-011: Add Member to GROUP (Creator)](#tc-conv-011-add-member-to-group-creator)
    - [TC-CONV-012: Add Member to GROUP (Non-creator)](#tc-conv-012-add-member-to-group-non-creator)
    - [TC-CONV-013: Add Blocked User to GROUP](#tc-conv-013-add-blocked-user-to-group)
    - [TC-CONV-014: Add Member to DIRECT Conversation](#tc-conv-014-add-member-to-direct-conversation)
    - [TC-CONV-015: Remove Member from GROUP (Creator)](#tc-conv-015-remove-member-from-group-creator)
    - [TC-CONV-016: Remove Member from GROUP (Non-creator)](#tc-conv-016-remove-member-from-group-non-creator)
    - [TC-CONV-017: Remove Self from GROUP](#tc-conv-017-remove-self-from-group)
  - [PART 4: MESSAGE APIs](#part-4-message-apis)
    - [TC-MSG-001: Send Message in DIRECT (Valid)](#tc-msg-001-send-message-in-direct-valid)
    - [TC-MSG-002: Send Message in GROUP (Valid)](#tc-msg-002-send-message-in-group-valid)
    - [TC-MSG-003: Send Message (Non-member)](#tc-msg-003-send-message-non-member)
    - [TC-MSG-004: Send Empty Message](#tc-msg-004-send-empty-message)
    - [TC-MSG-005: Send Very Long Message](#tc-msg-005-send-very-long-message)
    - [TC-MSG-006: Send Message in DIRECT (Receiver Blocked Sender)](#tc-msg-006-send-message-in-direct-receiver-blocked-sender)
    - [TC-MSG-007: Send Message in DIRECT (Sender Blocked Receiver)](#tc-msg-007-send-message-in-direct-sender-blocked-receiver)
    - [TC-MSG-008: Send Message in GROUP (Member Blocked Another)](#tc-msg-008-send-message-in-group-member-blocked-another)
    - [TC-MSG-009: Send Message to Non-existent Conversation](#tc-msg-009-send-message-to-non-existent-conversation)
    - [TC-MSG-010: Get Messages from Conversation (Member)](#tc-msg-010-get-messages-from-conversation-member)
    - [TC-MSG-011: Get Messages (Non-member)](#tc-msg-011-get-messages-non-member)
    - [TC-MSG-012: Get Messages with Pagination](#tc-msg-012-get-messages-with-pagination)
    - [TC-MSG-013: Send Message with XSS Script](#tc-msg-013-send-message-with-xss-script)
    - [TC-MSG-014: Send Message with SQL Injection](#tc-msg-014-send-message-with-sql-injection)
  - [Test Summary](#test-summary)
  - [Notes for Testers](#notes-for-testers)

<!-- /code_chunk_output -->


### TC-AUTH-002: Duplicate Username Signup

- **Pre-conditions:** User "alice" already exists
- **Steps:**
  1. POST /auth/signup
  2. Body: `{"username":"alice","email":"alice2@test.com","password":"1234"}`
- **Expected:** 400 Bad Request, "Username already taken"
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-auth-002.png

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
- **Expected:** 201 Created, returns `{"username":"alice","userId":101}`
- **Actual:** 405 Method Not Allowed, returns `{
    "timestamp": "2026-01-08T17:31:32.671Z",
    "status": 405,
    "error": "Method Not Allowed", returns `{
  "timestamp": "2026-01-08T17:31:32.671Z",
  "status": 405,
  "error": "Method Not Allowed",
  "path": "/auth/signup"
  }
  "path": "/auth/signup"
  }`
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
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-user-010.png

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
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-conv-001.png

### TC-CONV-002: Create Duplicate DIRECT Conversation

- **Pre-conditions:** DIRECT conversation already exists between alice (101) and bob (102)
- **Steps:**
  1. POST /conversations/create
  2. Header: `Authorization: Bearer <alice_token>`
  3. Body: `{"type":"DIRECT","name":null,"memberIds":[102]}`
- **Expected:** 400 Bad Request or returns existing conversation (test to see)
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-conv-002.png

### TC-CONV-003: Create GROUP Conversation (Valid)

- **Pre-conditions:** Users alice (101), bob (102), charlie (103) exist, alice logged in
- **Steps:**
  1. POST /conversations/create
  2. Header: `Authorization: Bearer <alice_token>`
  3. Body: `{"type":"GROUP","name":"Test Group","memberIds":[102,103]}`
- **Expected:** 200 OK, returns conversationId, alice auto-included
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-conv-003.png

### TC-CONV-004: Create GROUP with Empty Name

- **Pre-conditions:** Users alice (101), bob (102) exist, alice logged in
- **Steps:**
  1. POST /conversations/create
  2. Header: `Authorization: Bearer <alice_token>`
  3. Body: `{"type":"GROUP","name":"","memberIds":[102]}`
- **Expected:** 400 Bad Request or accepts empty name (test to see)
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-conv-004.png

### TC-CONV-005: Create DIRECT with Non-existent User

- **Pre-conditions:** User alice logged in
- **Steps:**
  1. POST /conversations/create
  2. Header: `Authorization: Bearer <alice_token>`
  3. Body: `{"type":"DIRECT","name":null,"memberIds":[999]}`
- **Expected:** 400 Bad Request, "User not found"
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-conv-005.png

### TC-CONV-006: Create DIRECT with Blocked User

- **Pre-conditions:** Alice has blocked Bob (102)
- **Steps:**
  1. POST /conversations/create
  2. Header: `Authorization: Bearer <alice_token>`
  3. Body: `{"type":"DIRECT","name":null,"memberIds":[102]}`
- **Expected:** 400 Bad Request, cannot create conversation with blocked user
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-conv-006.png

### TC-CONV-007: Get My Conversations

- **Pre-conditions:** Alice has 2 conversations, logged in
- **Steps:**
  1. GET /conversations/get
  2. Header: `Authorization: Bearer <alice_token>`
- **Expected:** 200 OK, returns array with 2 conversations
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-conv-007.png

### TC-CONV-008: Get Conversation by ID (Member)

- **Pre-conditions:** Conversation 201 exists, alice is member, logged in
- **Steps:**
  1. GET /conversations/201
  2. Header: `Authorization: Bearer <alice_token>`
- **Expected:** 200 OK, returns conversation details
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-conv-008.png

### TC-CONV-009: Get Conversation by ID (Non-member)

- **Pre-conditions:** Conversation 202 exists, alice is NOT member
- **Steps:**
  1. GET /conversations/202
  2. Header: `Authorization: Bearer <alice_token>`
- **Expected:** 400 Bad Request, "User is not a member of this conversation"
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-conv-009.png

### TC-CONV-010: Get Non-existent Conversation

- **Pre-conditions:** User alice logged in
- **Steps:**
  1. GET /conversations/999
  2. Header: `Authorization: Bearer <alice_token>`
- **Expected:** 400 Bad Request, "Conversation not found"
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-conv-010.png

### TC-CONV-011: Add Member to GROUP (Creator)

- **Pre-conditions:** GROUP conversation 202 exists, alice is creator, david (104) exists
- **Steps:**
  1. POST /conversations/addMember
  2. Header: `Authorization: Bearer <alice_token>`
  3. Body: `{"conversationId":202,"members":[104]}`
- **Expected:** 200 OK, "Members added successfully"
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-conv-011.png

### TC-CONV-012: Add Member to GROUP (Non-creator)

- **Pre-conditions:** GROUP 202 exists, alice is creator, bob is member (not creator)
- **Steps:**
  1. POST /conversations/addMember
  2. Header: `Authorization: Bearer <bob_token>`
  3. Body: `{"conversationId":202,"members":[104]}`
- **Expected:** 400 Bad Request, only creator can add (per spec)
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-conv-012.png

### TC-CONV-013: Add Blocked User to GROUP

- **Pre-conditions:** GROUP 202 exists, alice is creator, alice blocked charlie (103)
- **Steps:**
  1. POST /conversations/addMember
  2. Header: `Authorization: Bearer <alice_token>`
  3. Body: `{"conversationId":202,"members":[103]}`
- **Expected:** 400 Bad Request, cannot add blocked user
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-conv-013.png

### TC-CONV-014: Add Member to DIRECT Conversation

- **Pre-conditions:** DIRECT conversation 201 between alice and bob
- **Steps:**
  1. POST /conversations/addMember
  2. Header: `Authorization: Bearer <alice_token>`
  3. Body: `{"conversationId":201,"members":[103]}`
- **Expected:** 400 Bad Request, cannot add to DIRECT (test to see)
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-conv-014.png

### TC-CONV-015: Remove Member from GROUP (Creator)

- **Pre-conditions:** GROUP 202 exists, alice is creator, bob (102) is member
- **Steps:**
  1. POST /conversations/removeMember
  2. Header: `Authorization: Bearer <alice_token>`
  3. Body: `{"conversationId":202,"members":[102]}`
- **Expected:** 200 OK, "Member removed successfully"
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-conv-015.png

### TC-CONV-016: Remove Member from GROUP (Non-creator)

- **Pre-conditions:** GROUP 202 exists, alice is creator, bob is member
- **Steps:**
  1. POST /conversations/removeMember
  2. Header: `Authorization: Bearer <bob_token>`
  3. Body: `{"conversationId":202,"members":[103]}`
- **Expected:** 400 Bad Request, only creator can remove
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-conv-016.png

### TC-CONV-017: Remove Self from GROUP

- **Pre-conditions:** GROUP 202 exists, bob is member
- **Steps:**
  1. POST /conversations/removeMember
  2. Header: `Authorization: Bearer <bob_token>`
  3. Body: `{"conversationId":202,"members":[102]}`
- **Expected:** 200 OK or 400 (test to see - can user leave group?)
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-conv-017.png

---

## PART 4: MESSAGE APIs

### TC-MSG-001: Send Message in DIRECT (Valid)

- **Pre-conditions:** DIRECT conversation 201 between alice and bob, alice logged in
- **Steps:**
  1. POST /messages/201/send
  2. Header: `Authorization: Bearer <alice_token>`, `Content-Type: text/plain`
  3. Body: `Hello Bob!`
- **Expected:** 200 OK, "Message sent successfully"
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-msg-001.png

### TC-MSG-002: Send Message in GROUP (Valid)

- **Pre-conditions:** GROUP conversation 202, alice is member
- **Steps:**
  1. POST /messages/202/send
  2. Header: `Authorization: Bearer <alice_token>`, `Content-Type: text/plain`
  3. Body: `Hello everyone!`
- **Expected:** 200 OK, "Message sent successfully"
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-msg-002.png

### TC-MSG-003: Send Message (Non-member)

- **Pre-conditions:** Conversation 202 exists, alice is NOT member
- **Steps:**
  1. POST /messages/202/send
  2. Header: `Authorization: Bearer <alice_token>`, `Content-Type: text/plain`
  3. Body: `Trying to hack in`
- **Expected:** 400 Bad Request, "User is not a member of this conversation"
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-msg-003.png

### TC-MSG-004: Send Empty Message

- **Pre-conditions:** DIRECT conversation 201, alice is member
- **Steps:**
  1. POST /messages/201/send
  2. Header: `Authorization: Bearer <alice_token>`, `Content-Type: text/plain`
  3. Body: ``
- **Expected:** 400 Bad Request or accepts empty (test to see)
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-msg-004.png

### TC-MSG-005: Send Very Long Message

- **Pre-conditions:** DIRECT conversation 201, alice is member
- **Steps:**
  1. POST /messages/201/send
  2. Header: `Authorization: Bearer <alice_token>`, `Content-Type: text/plain`
  3. Body: `[10000 characters string]`
- **Expected:** 200 OK or 400 if length limit (test to see)
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-msg-005.png

### TC-MSG-006: Send Message in DIRECT (Receiver Blocked Sender)

- **Pre-conditions:** DIRECT 201 between alice and bob, bob blocked alice
- **Steps:**
  1. POST /messages/201/send
  2. Header: `Authorization: Bearer <alice_token>`, `Content-Type: text/plain`
  3. Body: `Can you see this?`
- **Expected:** 400 Bad Request, "You must unblock the user to send messages"
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-msg-006.png

### TC-MSG-007: Send Message in DIRECT (Sender Blocked Receiver)

- **Pre-conditions:** DIRECT 201 between alice and bob, alice blocked bob
- **Steps:**
  1. POST /messages/201/send
  2. Header: `Authorization: Bearer <alice_token>`, `Content-Type: text/plain`
  3. Body: `You're blocked!`
- **Expected:** 400 Bad Request, "You cannot send message to this conversation"
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-msg-007.png

### TC-MSG-008: Send Message in GROUP (Member Blocked Another)

- **Pre-conditions:** GROUP 202 with alice, bob, charlie. Alice blocked bob
- **Steps:**
  1. POST /messages/202/send
  2. Header: `Authorization: Bearer <alice_token>`, `Content-Type: text/plain`
  3. Body: `Hello group!`
- **Expected:** 200 OK (blocking doesn't affect GROUP per spec)
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-msg-008.png

### TC-MSG-009: Send Message to Non-existent Conversation

- **Pre-conditions:** User alice logged in
- **Steps:**
  1. POST /messages/999/send
  2. Header: `Authorization: Bearer <alice_token>`, `Content-Type: text/plain`
  3. Body: `Ghost message`
- **Expected:** 400 Bad Request, "Conversation not found"
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-msg-009.png

### TC-MSG-010: Get Messages from Conversation (Member)

- **Pre-conditions:** Conversation 201 with 5 messages, alice is member
- **Steps:**
  1. GET /messages/201/get?page=0&size=20
  2. Header: `Authorization: Bearer <alice_token>`
- **Expected:** 200 OK, returns array of 5 messages
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-msg-010.png

### TC-MSG-011: Get Messages (Non-member)

- **Pre-conditions:** Conversation 202 exists, alice is NOT member
- **Steps:**
  1. GET /messages/202/get?page=0&size=20
  2. Header: `Authorization: Bearer <alice_token>`
- **Expected:** 400 Bad Request, "Cannot access messages for this conversation"
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-msg-011.png

### TC-MSG-012: Get Messages with Pagination

- **Pre-conditions:** Conversation 201 with 50 messages, alice is member
- **Steps:**
  1. GET /messages/201/get?page=1&size=10
  2. Header: `Authorization: Bearer <alice_token>`
- **Expected:** 200 OK (note: pagination may not work per Documentation)
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-msg-012.png

### TC-MSG-013: Send Message with XSS Script

- **Pre-conditions:** Conversation 201, alice is member
- **Steps:**
  1. POST /messages/201/send
  2. Header: `Authorization: Bearer <alice_token>`, `Content-Type: text/plain`
  3. Body: `<script>alert('XSS')</script>`
- **Expected:** 200 OK (stored, but should be escaped on display)
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-msg-013.png

### TC-MSG-014: Send Message with SQL Injection

- **Pre-conditions:** Conversation 201, alice is member
- **Steps:**
  1. POST /messages/201/send
  2. Header: `Authorization: Bearer <alice_token>`, `Content-Type: text/plain`
  3. Body: `'; DROP TABLE messages; --`
- **Expected:** 200 OK (treated as plain text)
- **Actual:** _[To be filled during testing]_
- **Evidence:** screenshot-msg-014.png

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
