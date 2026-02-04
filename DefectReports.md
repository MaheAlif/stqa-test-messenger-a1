# Defect Reports - Messenger API System Testing

## Summary

Total Defects Found: **24**

| Severity | Count |
|----------|-------|
| Critical | 3     |
| High     | 8     |
| Medium   | 11    |
| Low      | 2     |

---

## Defect Details

### DEFECT-001: User ID Can Be Updated in Profile Update

**Severity:** High

**Test Case Reference:** TC-USER-009

**Title:** User ID can be modified through PATCH /users/{userId} endpoint, violating immutability constraint

**Steps to Reproduce:**
1. Login as user "alice" (userId: 101) to obtain JWT token
2. Send PATCH request to `/users/101`
3. Include Authorization header with alice's JWT token
4. Send body: `{"userId": 999, "email": "test@test.com"}`
5. Observe response

**Expected Result:**
- HTTP Status: 400 Bad Request
- Response: "User ID cannot be updated"

**Actual Result:**
- HTTP Status: 200 OK
- Response: User updated successfully with modified userId

**Impact:** Critical data integrity issue. User IDs should be immutable as they are used as primary identifiers throughout the system. Allowing modification can break conversation memberships, message associations, and authentication.

**Evidence:** [TC-USER-009](Evidence/TC-USER-009.png)

---

### DEFECT-002: User Can Block Themselves

**Severity:** Medium

**Test Case Reference:** TC-USER-012

**Title:** System allows users to block their own account

**Steps to Reproduce:**
1. Login as user "alice" (userId: 101) to obtain JWT token
2. Send PATCH request to `/users/block/101`
3. Include Authorization header with alice's JWT token
4. Observe response

**Expected Result:**
- HTTP Status: 400 Bad Request
- Response: Error message preventing self-blocking

**Actual Result:**
- HTTP Status: 200 OK
- Response: "User blocked successfully"

**Impact:** Logical inconsistency. Self-blocking doesn't make sense in the context of the application and may lead to unexpected behavior in conversation and messaging flows.

**Evidence:** [TC-USER-012](Evidence/TC-USER-012.png)

---

### DEFECT-003: GROUP Conversation Created with Empty Name

**Severity:** Low

**Test Case Reference:** TC-CONV-004

**Title:** System accepts empty string as GROUP conversation name

**Steps to Reproduce:**
1. Login as user "alice" to obtain JWT token
2. Send POST request to `/conversations/create`
3. Include Authorization header
4. Send body: `{"type": "GROUP", "name": "", "memberIds": [102]}`
5. Observe response

**Expected Result:**
- HTTP Status: 400 Bad Request
- Response: "Group name cannot be empty"

**Actual Result:**
- HTTP Status: 200 OK
- Response: Conversation created with empty name
- conversationId: 206

**Impact:** Data quality issue. GROUP conversations should have meaningful names for user experience. Empty names may cause display issues in client applications.

**Evidence:** [TC-CONV-004](Evidence/TC-CONV-004.png)

---

### DEFECT-004: DIRECT Conversation Created with Non-existent User

**Severity:** High

**Test Case Reference:** TC-CONV-005

**Title:** System creates DIRECT conversation with invalid/non-existent user ID

**Steps to Reproduce:**
1. Login as user "alice" to obtain JWT token
2. Send POST request to `/conversations/create`
3. Include Authorization header
4. Send body: `{"type": "DIRECT", "name": null, "memberIds": [999]}`
   (where user ID 999 does not exist)
5. Observe response

**Expected Result:**
- HTTP Status: 400 Bad Request
- Response: "User not found"

**Actual Result:**
- HTTP Status: 200 OK
- Response: Conversation created successfully
- conversationId: 207

**Impact:** Critical data integrity issue. Creating conversations with non-existent users creates orphaned conversations that cannot function properly. This will cause errors when attempting to send messages or retrieve conversation details.

**Evidence:** [TC-CONV-005](Evidence/TC-CONV-005.png)

---

### DEFECT-005: DIRECT Conversation Created with Blocked User

**Severity:** High

**Test Case Reference:** TC-CONV-006

**Title:** System allows creation of DIRECT conversation between users where one has blocked the other

**Steps to Reproduce:**
1. Login as "alice" and block "bob" (userId: 102)
2. Attempt to create DIRECT conversation with bob
3. Send POST request to `/conversations/create`
4. Include Authorization header with alice's token
5. Send body: `{"type": "DIRECT", "name": null, "memberIds": [102]}`
6. Observe response

**Expected Result:**
- HTTP Status: 400 Bad Request
- Response: "Cannot create conversation with blocked user"

**Actual Result:**
- HTTP Status: 200 OK
- Response: Conversation created successfully
- conversationId: 208

**Impact:** Violates blocking business logic. Users should not be able to initiate conversations with users they have blocked. This undermines the blocking feature's purpose.

**Evidence:** [TC-CONV-006](Evidence/TC-CONV-006.png)

---

### DEFECT-006: Non-creator Can Add Members to GROUP

**Severity:** High

**Test Case Reference:** TC-CONV-012

**Title:** Non-creator members can add new members to GROUP conversations

**Steps to Reproduce:**
1. GROUP conversation 202 exists with alice (101) as creator
2. Bob (102) is a member but NOT the creator
3. Login as "bob" to obtain JWT token
4. Send POST request to `/conversations/addMember`
5. Include Authorization header with bob's token
6. Send body: `{"conversationId": 202, "members": [104]}`
7. Observe response

**Expected Result:**
- HTTP Status: 400 Bad Request
- Response: "Only creator can add members" (per specification)

**Actual Result:**
- HTTP Status: 200 OK
- Response: "Members added successfully"
- Member 104 successfully added to conversation

**Impact:** Authorization bypass. Only group creators should have permission to add members according to the specification. This violates access control rules.

**Evidence:** [TC-CONV-012](Evidence/TC-CONV-012.png)

---

### DEFECT-007: Blocked User Can Be Added to GROUP

**Severity:** Medium

**Test Case Reference:** TC-CONV-013

**Title:** System allows adding blocked users to GROUP conversations

**Steps to Reproduce:**
1. Alice (101) has blocked Jack (110)
2. GROUP conversation 202 exists with alice as creator
3. Login as "alice" to obtain JWT token
4. Send POST request to `/conversations/addMember`
5. Include Authorization header
6. Send body: `{"conversationId": 202, "members": [110]}`
7. Observe response

**Expected Result:**
- HTTP Status: 400 Bad Request
- Response: "Cannot add blocked user to conversation"

**Actual Result:**
- HTTP Status: 200 OK
- Response: "Members added successfully"
- Jack (110) added to conversation despite being blocked

**Impact:** Business logic violation. Users should not be able to add blocked users to conversations. This creates awkward situations where blocked users can interact in group settings.

**Evidence:** [TC-CONV-013](Evidence/TC-CONV-013.png)

---

### DEFECT-008: Members Can Be Added to DIRECT Conversations

**Severity:** High

**Test Case Reference:** TC-CONV-014

**Title:** System allows adding third member to DIRECT conversation, violating DIRECT conversation constraint

**Steps to Reproduce:**
1. DIRECT conversation 201 exists between alice (101) and bob (102)
2. Login as "alice" to obtain JWT token
3. Send POST request to `/conversations/addMember`
4. Include Authorization header
5. Send body: `{"conversationId": 201, "members": [110]}`
6. Observe response

**Expected Result:**
- HTTP Status: 400 Bad Request
- Response: "Cannot add members to DIRECT conversation"

**Actual Result:**
- HTTP Status: 200 OK
- Response: "Members added successfully"
- Jack (110) added to DIRECT conversation

**Impact:** Violates DIRECT conversation definition. DIRECT conversations should only have exactly 2 members. This breaks the conversation type semantics and may cause unexpected behavior in clients expecting only 2 participants.

**Evidence:** [TC-CONV-014](Evidence/TC-CONV-014.png)

---

### DEFECT-009: Non-creator Cannot Remove Members from GROUP - Server Error

**Severity:** High

**Test Case Reference:** TC-CONV-016

**Title:** Attempting to remove members as non-creator causes 500 Internal Server Error instead of proper authorization check

**Steps to Reproduce:**
1. GROUP conversation 202 exists with alice (101) as creator
2. Bob (102) is a member but NOT the creator
3. Login as "bob" to obtain JWT token
4. Send POST request to `/conversations/removeMember`
5. Include Authorization header with bob's token
6. Send body: `{"conversationId": 202, "members": [103]}`
7. Observe response

**Expected Result:**
- HTTP Status: 400 Bad Request
- Response: "Only creator can remove members"

**Actual Result:**
- HTTP Status: 500 Internal Server Error
- Response: Internal server error message

**Impact:** Server stability issue. The application should handle authorization checks gracefully and return appropriate error codes. A 500 error indicates unhandled exception in the code, which could indicate other potential crashes.

**Evidence:** [TC-CONV-016](Evidence/TC-CONV-016.png)

---

### DEFECT-010: Third Member Can Be Added to DIRECT Conversation

**Severity:** High

**Test Case Reference:** TC-CONV-018

**Title:** System allows adding third member (charlie - 103) to DIRECT conversation between alice and bob

**Steps to Reproduce:**
1. DIRECT conversation 201 exists between alice (101) and bob (102)
2. Login as "alice" to obtain JWT token
3. Send POST request to `/conversations/addMember`
4. Include Authorization header
5. Send body: `{"conversationId": 201, "members": [103]}`
6. Observe response

**Expected Result:**
- HTTP Status: 400 Bad Request
- Response: "Cannot add to DIRECT conversation" or "DIRECT conversations must have exactly 2 members"

**Actual Result:**
- HTTP Status: 200 OK
- Response: "Members added successfully"
- Charlie (103) successfully added to DIRECT conversation

**Impact:** Same as DEFECT-008. This is a duplicate scenario showing the same underlying issue - DIRECT conversation type constraints are not enforced.

**Note:** This is a duplicate of DEFECT-008 with slightly different test scenario.

**Evidence:** [TC-CONV-018](Evidence/TC-CONV-018.png)

---

### DEFECT-011: Empty Message Accepted

**Severity:** Medium

**Test Case Reference:** TC-MSG-004

**Title:** System accepts empty message content

**Steps to Reproduce:**
1. DIRECT conversation 201 exists, alice is member
2. Login as "alice" to obtain JWT token
3. Send POST request to `/messages/201/send`
4. Include Authorization header
5. Set Content-Type: text/plain
6. Send empty body: ``
7. Observe response

**Expected Result:**
- HTTP Status: 400 Bad Request
- Response: "Message content cannot be empty"

**Actual Result:**
- HTTP Status: 200 OK
- Response: Message sent successfully with empty content

**Impact:** Data quality issue. Empty messages provide no value and clutter the conversation. They should be rejected at the API level.

**Evidence:** [TC-MSG-004](Evidence/TC-MSG-004.png)

---

### DEFECT-012: Incorrect HTTP Method Error for Blocked Messaging

**Severity:** Medium

**Test Case Reference:** TC-MSG-006

**Title:** Sending message when receiver blocked sender returns 405 Method Not Allowed instead of proper block validation error

**Steps to Reproduce:**
1. DIRECT conversation 201 exists between alice and bob
2. Bob has blocked alice
3. Login as "alice" to obtain JWT token
4. Send POST request to `/messages/201/send`
5. Include Authorization header with alice's token
6. Set Content-Type: text/plain
7. Send body: "Can you see this?"
8. Observe response

**Expected Result:**
- HTTP Status: 400 Bad Request
- Response: "You must unblock the user to send messages"

**Actual Result:**
- HTTP Status: 405 Method Not Allowed
- Response: Method not allowed error

**Impact:** Incorrect error handling. The API is returning the wrong HTTP status code and error message. Users won't understand why their message failed. This may indicate a routing or handler configuration issue.

**Evidence:** [TC-MSG-006](Evidence/TC-MSG-006.png)

---

### DEFECT-013: XSS Payload Causes Server Error

**Severity:** High

**Test Case Reference:** TC-MSG-013

**Title:** Sending message with XSS script causes 500 Internal Server Error

**Steps to Reproduce:**
1. Conversation 201 exists, alice is member
2. Login as "alice" to obtain JWT token
3. Send POST request to `/messages/201/send`
4. Include Authorization header
5. Set Content-Type: text/plain
6. Send body: `<script>alert('XSS')</script>`
7. Observe response

**Expected Result:**
- HTTP Status: 200 OK
- Response: Message sent successfully (content should be stored and escaped on display)

**Actual Result:**
- HTTP Status: 500 Internal Server Error
- Response: Internal server error

**Impact:** Critical security and stability issue. The server crashes when processing HTML/script tags. This indicates:
1. Lack of input sanitization
2. Potential XSS vulnerability
3. Server instability
This could be exploited to cause denial of service.

**Evidence:** [TC-MSG-013](Evidence/TC-MSG-013.png)

---

## Defect Categories and Grouping

### Category 1: Data Integrity Violations (5 defects)
- **DEFECT-001:** User ID modification allowed
- **DEFECT-004:** Conversation with non-existent user
- **DEFECT-008:** Adding members to DIRECT conversation
- **DEFECT-010:** Third member in DIRECT (duplicate of 008)
- **DEFECT-011:** Empty message accepted

### Category 2: Authorization and Permission Failures (3 defects)
- **DEFECT-006:** Non-creator can add members
- **DEFECT-009:** Server error on unauthorized remove attempt

### Category 3: Business Logic Violations (4 defects)
- **DEFECT-002:** Self-blocking allowed
- **DEFECT-005:** Conversation with blocked user
- **DEFECT-007:** Blocked user added to GROUP

### Category 4: Server Errors and Stability (2 defects)
- **DEFECT-009:** 500 error on authorization check (also in Category 2)
- **DEFECT-012:** Wrong HTTP status for blocked message
- **DEFECT-013:** XSS payload causes crash

### Category 5: Data Quality (2 defects)
- **DEFECT-003:** Empty GROUP name accepted
- **DEFECT-011:** Empty message accepted (also in Category 1)

---

## DEFECT-015: Signup Accepts Empty Password

**Severity:** Critical

**Test Case Reference:** TC-AUTH-006

**Title:** System allows user signup without password, complete authentication bypass

**Steps to Reproduce:**
1. Send POST request to `/auth/signup`
2. Body: `{"username": "Fariha", "email": "fariha@test.com", "password": ""}`
3. Observe response

**Expected Result:**
- HTTP Status: 400 Bad Request
- Response: "Password required"

**Actual Result:**
- HTTP Status: 201 Created
- Response: Account created with userId 104

**Impact:** CRITICAL SECURITY VULNERABILITY. Users can create accounts without passwords. This completely breaks authentication security as there's no credential to verify during login. Attackers can create passwordless accounts and potentially exploit this with the login endpoint.

**Evidence:** TC-AUTH-006

---

## DEFECT-016: Login Works Without Password

**Severity:** Critical

**Test Case Reference:** TC-AUTH-017

**Title:** Authentication bypass - users can login without providing password

**Steps to Reproduce:**
1. User "Fariha" already exists
2. Send POST request to `/auth/login`
3. Body: `{"username": "Fariha", "email": "fariha@test.com", "password": ""}`
4. Observe response

**Expected Result:**
- HTTP Status: 401 Unauthorized
- Response: "Password required"

**Actual Result:**
- HTTP Status: 200 OK
- Response: Returns valid JWT token and userId 104

**Impact:** CRITICAL SECURITY BREACH. Complete authentication bypass. Users can login to any account without knowing the password. This is a total failure of the authentication system and allows unauthorized access to all user accounts.

**Evidence:** TC-AUTH-017

---

## DEFECT-017: SQL Injection in Signup Endpoint

**Severity:** Critical

**Test Case Reference:** TC-AUTH-015

**Title:** Signup endpoint vulnerable to SQL injection attacks

**Steps to Reproduce:**
1. Send POST request to `/auth/signup`
2. Body: `{"username": "' OR '1'='1", "email": "sql@test.com", "password": "1234"}`
3. Observe response

**Expected Result:**
- HTTP Status: 400 Bad Request
- Response: "Invalid input" or "Username contains invalid characters"

**Actual Result:**
- HTTP Status: 201 Created
- Response: Account created with username "' OR '1'='1" and userId 106

**Impact:** CRITICAL SECURITY VULNERABILITY. SQL injection attack vector. Input sanitization is completely missing. While currently using in-memory storage, if switched to SQL database, this could allow attackers to execute arbitrary SQL commands, potentially compromising the entire database.

**Evidence:** TC-AUTH-015

---

## DEFECT-018: Invalid Email Format Accepted

**Severity:** High

**Test Case Reference:** TC-AUTH-005

**Title:** Signup accepts invalid email format without validation

**Steps to Reproduce:**
1. Send POST request to `/auth/signup`
2. Body: `{"username": "JARIN", "email": "NOT A MAIL", "password": "1234"}`
3. Observe response

**Expected Result:**
- HTTP Status: 400 Bad Request
- Response: "Invalid email format"

**Actual Result:**
- HTTP Status: 201 Created
- Response: Account created with userId 103

**Impact:** Data integrity and functionality issue. No email format validation exists. Users can register with garbage email values, breaking any email-based functionality (password reset, notifications, etc.). Creates unreliable user data.

**Evidence:** TC-AUTH-005

---

## DEFECT-019: Duplicate Email Addresses Allowed

**Severity:** High

**Test Case Reference:** TC-AUTH-016

**Title:** System allows multiple accounts with same email address

**Steps to Reproduce:**
1. User with email alice@test.com already exists
2. Send POST request to `/auth/signup`
3. Body: `{"username": "alice_new", "email": "alice@test.com", "password": "1234"}`
4. Observe response

**Expected Result:**
- HTTP Status: 400 Bad Request
- Response: "Email already in use"

**Actual Result:**
- HTTP Status: 201 Created
- Response: New account created with userId 107

**Impact:** Business logic flaw. Same email can be used for multiple accounts, causing confusion in account recovery, user identification, and potential security issues. Violates uniqueness constraint for email addresses.

**Evidence:** TC-AUTH-016

---

## DEFECT-020: Login with Email Only Causes Server Crash

**Severity:** High

**Test Case Reference:** TC-AUTH-018

**Title:** Server crashes when login attempted with email field instead of username

**Steps to Reproduce:**
1. Two users exist with same email alice@test.com
2. Send POST request to `/auth/login`
3. Body: `{"email": "alice@test.com", "password": "1234"}`
4. Observe response

**Expected Result:**
- HTTP Status: 400 Bad Request
- Response: "Username required"

**Actual Result:**
- HTTP Status: 500 Internal Server Error

**Impact:** Server stability issue. Application crashes on predictable user input. Indicates unhandled exception when username field is missing. Can be exploited for denial of service attacks.

**Evidence:** TC-AUTH-018

---

## DEFECT-021: Empty Email Validation Shows Wrong Error

**Severity:** Medium

**Test Case Reference:** TC-AUTH-004

**Title:** Empty email field returns wrong error message when username exists

**Steps to Reproduce:**
1. User "alice" already exists
2. Send POST request to `/auth/signup`
3. Body: `{"username": "alice", "email": "", "password": "1234"}`
4. Observe response

**Expected Result:**
- HTTP Status: 400 Bad Request
- Response: "Email required"

**Actual Result:**
- HTTP Status: 400 Bad Request
- Response: "Username already taken"

**Impact:** Poor error handling. Empty email validation is bypassed, and wrong error message confuses users. Should validate all required fields before checking uniqueness.

**Evidence:** TC-AUTH-004

---

## DEFECT-022: Login Email Field Ignored in Validation

**Severity:** Medium

**Test Case Reference:** TC-AUTH-020

**Title:** Wrong email in login request is ignored, allows authentication with incorrect email

**Steps to Reproduce:**
1. User "alice" exists with email alice@test.com
2. Send POST request to `/auth/login`
3. Body: `{"username": "alice", "email": "WRONG@EMAIL.com", "password": "1234"}`
4. Observe response

**Expected Result:**
- HTTP Status: 400 Bad Request
- Response: "Email mismatch" or email field should be validated

**Actual Result:**
- HTTP Status: 200 OK
- Response: Returns JWT token, email field completely ignored

**Impact:** Inconsistent validation logic. While not critical for security, indicates poor API design. Email field in login request serves no purpose but is accepted without validation.

**Evidence:** TC-AUTH-020

---

## DEFECT-023: Logout Accepts Non-Existent Username

**Severity:** Medium

**Test Case Reference:** TC-AUTH-021

**Title:** Logout endpoint doesn't validate user existence

**Steps to Reproduce:**
1. User "ghost" does not exist in system
2. Send POST request to `/auth/logout?username=ghost`
3. Observe response

**Expected Result:**
- HTTP Status: 404 Not Found
- Response: "User not found"

**Actual Result:**
- HTTP Status: 200 OK
- Response: "User logged out successfully"

**Impact:** Information disclosure vulnerability. Allows enumeration of non-existent users. Poor validation - logout succeeds for users that don't exist. Can be used to probe which usernames are valid.

**Evidence:** TC-AUTH-021

---

## DEFECT-024: Logout Accepts Empty Username

**Severity:** Medium

**Test Case Reference:** TC-AUTH-022

**Title:** Logout endpoint accepts empty username parameter

**Steps to Reproduce:**
1. Send POST request to `/auth/logout?username=`
2. Observe response

**Expected Result:**
- HTTP Status: 400 Bad Request
- Response: "Username required"

**Actual Result:**
- HTTP Status: 200 OK
- Response: "User logged out successfully"

**Impact:** Input validation missing. Empty username should be rejected. Indicates lack of parameter validation in logout endpoint.

**Evidence:** TC-AUTH-022

---

## DEFECT-025: Logout Accepts Invalid Username Format

**Severity:** Medium

**Test Case Reference:** TC-AUTH-023

**Title:** Logout endpoint accepts special characters and invalid username formats

**Steps to Reproduce:**
1. Send POST request to `/auth/logout?username=@@@###`
2. Observe response

**Expected Result:**
- HTTP Status: 400 Bad Request
- Response: "Invalid username format"

**Actual Result:**
- HTTP Status: 200 OK
- Response: "User logged out successfully"

**Impact:** Input validation missing for username format. While low severity, indicates no input sanitization in logout endpoint.

**Evidence:** TC-AUTH-023

---

## DEFECT-026: Logout Accepts Extra Parameters

**Severity:** Medium

**Test Case Reference:** TC-AUTH-024

**Title:** Logout endpoint accepts and doesn't filter extra query parameters

**Steps to Reproduce:**
1. User "alice" is logged in
2. Send POST request to `/auth/logout?username=alice&role=admin`
3. Observe response

**Expected Result:**
- HTTP Status: 400 Bad Request
- Response: "Extra parameters not allowed"

**Actual Result:**
- HTTP Status: 200 OK
- Response: "User logged out successfully"

**Impact:** Potential security risk. Extra parameters are not filtered or validated. While currently benign, could lead to parameter pollution attacks if additional functionality is added.

**Evidence:** TC-AUTH-024

---

## Cascading and Related Defects

**DEFECT-008 and DEFECT-010** are duplicates showing the same root cause: lack of member count validation for DIRECT conversations.

**DEFECT-009** appears in both authorization and stability categories as it represents both an authorization check failure and an unhandled exception.

**DEFECT-015 and DEFECT-016** are critically related - both represent authentication bypass vulnerabilities that work together to create a completely broken authentication system. Users can both signup AND login without passwords.

**DEFECT-017 and DEFECT-025** both indicate missing input sanitization, though in different contexts (signup vs logout).

---

## Defect Categories and Grouping

### Category 1: Critical Authentication Vulnerabilities (3 defects)
- **DEFECT-015:** Signup without password allowed (CRITICAL)
- **DEFECT-016:** Login without password allowed (CRITICAL)
- **DEFECT-017:** SQL injection in signup (CRITICAL)

### Category 2: Data Integrity Violations (6 defects)
- **DEFECT-001:** User ID modification allowed (High)
- **DEFECT-004:** Conversation with non-existent user (High)
- **DEFECT-008:** Adding members to DIRECT conversation (High)
- **DEFECT-010:** Third member in DIRECT - duplicate of 008 (High)
- **DEFECT-011:** Empty message accepted (Medium)
- **DEFECT-019:** Duplicate email addresses allowed (High)

### Category 3: Input Validation Failures (5 defects)
- **DEFECT-018:** Invalid email format accepted (High)
- **DEFECT-021:** Empty email wrong error message (Medium)
- **DEFECT-024:** Logout accepts empty username (Medium)
- **DEFECT-025:** Logout accepts invalid username format (Medium)
- **DEFECT-003:** Empty GROUP name accepted (Low)

### Category 4: Server Errors and Stability (3 defects)
- **DEFECT-013:** XSS payload causes crash (High)
- **DEFECT-020:** Server crash on email-only login (High)
- **DEFECT-009:** 500 error on authorization check (High)

### Category 5: Authorization and Permission Failures (2 defects)
- **DEFECT-006:** Non-creator can add members (High)
- **DEFECT-009:** Server error on unauthorized remove (also in Category 4)

### Category 6: Business Logic Violations (4 defects)
- **DEFECT-002:** Self-blocking allowed (Medium)
- **DEFECT-005:** Conversation with blocked user (High)
- **DEFECT-007:** Blocked user added to GROUP (Medium)
- **DEFECT-023:** Logout for non-existent user succeeds (Medium)

### Category 7: API Design and Consistency (3 defects)
- **DEFECT-012:** Wrong HTTP status for blocked message (Medium)
- **DEFECT-022:** Login email field ignored (Medium)
- **DEFECT-026:** Extra parameters not filtered (Medium)

---

## Priority Recommendations

### Must Fix Immediately (P0 - CRITICAL):
1. **DEFECT-015** - Signup without password
2. **DEFECT-016** - Login without password
3. **DEFECT-017** - SQL injection vulnerability

### Should Fix Urgently (P1 - HIGH):
4. **DEFECT-001** - User ID modification
5. **DEFECT-004** - Non-existent user in conversation
6. **DEFECT-006** - Authorization bypass for adding members
7. **DEFECT-008/010** - DIRECT conversation constraints
8. **DEFECT-013** - XSS causing server crash
9. **DEFECT-018** - Invalid email format accepted
10. **DEFECT-019** - Duplicate emails allowed
11. **DEFECT-020** - Server crash on missing username

### Fix Soon (P2 - MEDIUM):
12. **DEFECT-005** - Blocked user in conversation
13. **DEFECT-007** - Blocked user added to GROUP
14. **DEFECT-009** - Server error on unauthorized action
15. **DEFECT-012** - Incorrect error code
16. **DEFECT-021** - Wrong error message for empty email
17. **DEFECT-022** - Email field ignored in login
18. **DEFECT-023** - Logout for non-existent user
19. **DEFECT-024** - Empty username in logout
20. **DEFECT-026** - Extra parameters accepted

### Nice to Fix (P3 - LOW):
21. **DEFECT-002** - Self-blocking
22. **DEFECT-003** - Empty GROUP name
23. **DEFECT-011** - Empty message
24. **DEFECT-025** - Invalid username format in logout

