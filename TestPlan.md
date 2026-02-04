# Test Plan - Messenger API System Testing

## 1. Introduction

This document outlines the test plan for system testing of the Messenger API. The API provides functionality for user authentication, user management, conversations (DIRECT and GROUP), and messaging with JWT-based authentication and in-memory storage.

---

## 2. Scope

### In Scope:
- Authentication endpoints (signup, login, logout)
- User management endpoints (get users, update, block/unblock)
- Conversation endpoints (create, retrieve, add/remove members)
- Message endpoints (send, retrieve messages)
- Authorization and permission checks
- Block/unblock behavior validation
- Data consistency validation

### Out of Scope:
- Performance testing
- Load testingTC-AUTH-003
- Security penetration testing
- Database persistence testing (using in-memory storage)

---

## 3. Test Strategy

### Testing Levels:
- **System Testing**: Black-box testing of the complete API system
- **Functional Testing**: Verification of each endpoint's functionality
- **Negative Testing**: Testing with invalid inputs and edge cases
- **Authorization Testing**: Verification of JWT authentication and permission checks

### Test Approach:
- Boundary value analysis
- Equivalence partitioning
- Error guessing
- State transition testing

---

## 4. Test Plan by Endpoint

## 4.1 Authentication APIs

### POST /auth/signup

**Input Parameters:**
- `username` (string, required)
- `email` (string, required)
- `password` (string, required)

**Test Scenarios:**
| Input Type | Username | Email | Password | Expected HTTP Status | Expected Output |
|------------|----------|-------|----------|---------------------|-----------------|
| Valid | "testuser" | "test@example.com" | "password123" | 201 Created | User object with userId |
| Duplicate | Existing username | "new@example.com" | "password123" | 400 Bad Request | "Username already taken" |
| Invalid | "" (empty) | "test@example.com" | "password123" | 400 Bad Request | Validation error |
| Invalid | "testuser" | null | "password123" | 400 Bad Request | Validation error |
| Invalid | "testuser" | "notanemail" | "password123" | 400 Bad Request | Validation error |
| Invalid | "testuser" | "test@example.com" | "" (empty) | 400 Bad Request | Validation error || Invalid | "' OR '1'='1" | "sql@test.com" | "password123" | 400 Bad Request | SQL injection blocked |
| Duplicate email | "newuser" | Existing email | "password123" | 400 Bad Request | "Email already in use" || Invalid method | N/A | N/A | N/A | 405 Method Not Allowed | Method not allowed error |

### POST /auth/login

**Input Parameters:**
- `username` (string, required)
- `password` (string, required)

**Test Scenarios:**
| Input Type | Username | Password | Expected HTTP Status | Expected Output |
|------------|----------|----------|---------------------|-----------------|
| Valid | Existing user | Correct password | 200 OK | JWT token and userId |
| Invalid | Existing user | Wrong password | 401 Unauthorized | "Invalid password" |
| Invalid | Non-existent user | Any password | 401 Unauthorized | "User not found" || Invalid | Existing user | "" (empty) | 401 Unauthorized | "Password required" |
| Invalid | Missing (email only) | Any password | 400 Bad Request | "Username required" |
| Invalid | "' OR '1'='1" | "' OR '1'='1" | 401 Unauthorized | SQL injection blocked |
| Invalid | N/A | N/A | 400 Bad Request | Empty body rejected |
### POST /auth/logout

**Input Parameters:**
- `username` (query parameter, required)

**Test Scenarios:**
| Input Type | Username Parameter | Expected HTTP Status | Expected Output |
|------------|-------------------|---------------------|------------------|
| Valid | Existing logged-in user | 200 OK | "User logged out successfully" |
| Invalid | Non-existent user | 404 Not Found | "User not found" |
| Invalid | "" (empty) | 400 Bad Request | "Username required" |
| Invalid | "@@@###" (invalid format) | 400 Bad Request | "Invalid username" |
| Invalid | Missing parameter | 400 Bad Request | "Username missing" |
| Security | With extra parameters (role=admin) | 400 Bad Request | Extra params rejected |

### GET /auth/test

**Input Parameters:**
- `username` (query parameter, required)

**Test Scenarios:**
| Input Type | Username | Expected HTTP Status | Expected Output |
|------------|----------|---------------------|-----------------|
| Valid | Logged in user | 200 OK | "User logged out successfully" |

### GET /auth/test

**Input Parameters:**
- `Authorization` header with Bearer token

**Test Scenarios:**
| Input Type | Token | Expected HTTP Status | Expected Output |
|------------|-------|---------------------|-----------------|
| Valid | Valid JWT token | 200 OK | "Hello, {username}! This is a protected API." |
| Invalid | Invalid token | 403 Forbidden | Forbidden error |
| Missing | No token | 403 Forbidden | Forbidden error |

---

## 4.2 User APIs

### GET /users/

**Input Parameters:**
- `Authorization` header with Bearer token

**Test Scenarios:**
| Input Type | Authorization | Expected HTTP Status | Expected Output |
|------------|---------------|---------------------|-----------------|
| Valid | Valid token | 200 OK | Array of all users |
| Invalid | No token | 401 Unauthorized | "You must be logged in" |

### GET /users/{userId}

**Input Parameters:**
- `userId` (path parameter, required)
- `Authorization` header with Bearer token

**Test Scenarios:**
| Input Type | UserId | Expected HTTP Status | Expected Output |
|------------|--------|---------------------|-----------------|
| Valid | Existing userId | 200 OK | User object |
| Invalid | Non-existent userId (999) | 404 Not Found | "User not found" |

### GET /users/username/{username}

**Input Parameters:**
- `username` (path parameter, required)
- `Authorization` header with Bearer token

**Test Scenarios:**
| Input Type | Username | Expected HTTP Status | Expected Output |
|------------|----------|---------------------|-----------------|
| Valid | Existing username | 200 OK | User object |
| Invalid | Non-existent username | 404 Not Found | "User not found" |

### PATCH /users/{userId}

**Input Parameters:**
- `userId` (path parameter, required)
- `Authorization` header with Bearer token
- Request body with update fields

**Test Scenarios:**
| Input Type | UserId | Update Fields | Expected HTTP Status | Expected Output |
|------------|--------|---------------|---------------------|-----------------|
| Valid (self) | Own userId | {"email": "new@example.com"} | 200 OK | "User updated successfully" |
| Invalid (other) | Another user's userId | {"email": "hack@example.com"} | 403 Forbidden | "You can only update your own user details" |
| Invalid | Own userId | {"userId": 999} | 400 Bad Request | "User ID cannot be updated" |

### PATCH /users/block/{userIdToBlock}

**Input Parameters:**
- `userIdToBlock` (path parameter, required)
- `Authorization` header with Bearer token

**Test Scenarios:**
| Input Type | UserIdToBlock | Expected HTTP Status | Expected Output |
|------------|---------------|---------------------|-----------------|
| Valid | Existing user | 200 OK | "User blocked successfully" |
| Invalid | Non-existent user (999) | 400 Bad Request | "User to be blocked not found" |
| Invalid | Self (own userId) | 400 Bad Request | Error message |

### DELETE /users/block/{userIdToUnblock}

**Input Parameters:**
- `userIdToUnblock` (path parameter, required)
- `Authorization` header with Bearer token

**Test Scenarios:**
| Input Type | UserIdToUnblock | Expected HTTP Status | Expected Output |
|------------|-----------------|---------------------|-----------------|
| Valid | Previously blocked user | 200 OK | "User unblocked successfully" |
| Invalid | Not blocked user | 400 Bad Request | Error message |

---

## 4.3 Conversation APIs

### POST /conversations/create

**Input Parameters:**
- `Authorization` header with Bearer token
- Request body:
  - `type` (string: "DIRECT" or "GROUP", required)
  - `name` (string, optional for DIRECT, required for GROUP)
  - `memberIds` (array of integers, required)

**Test Scenarios:**
| Input Type | Type | Name | MemberIds | Expected HTTP Status | Expected Output |
|------------|------|------|-----------|---------------------|-----------------|
| Valid | "DIRECT" | null | [existingUserId] | 200 OK | Conversation object with conversationId |
| Invalid | "DIRECT" | null | [existingUserId] (duplicate) | 400 Bad Request | Error message |
| Valid | "GROUP" | "Test Group" | [user1, user2] | 200 OK | Conversation object |
| Invalid | "GROUP" | "" (empty) | [existingUserId] | 400 Bad Request | Error message |
| Invalid | "DIRECT" | null | [999] (non-existent) | 400 Bad Request | "User not found" |
| Invalid | "DIRECT" | null | [blockedUserId] | 400 Bad Request | Error message |

### GET /conversations/get

**Input Parameters:**
- `Authorization` header with Bearer token

**Test Scenarios:**
| Input Type | Authorization | Expected HTTP Status | Expected Output |
|------------|---------------|---------------------|-----------------|
| Valid | Valid token | 200 OK | Array of user's conversations |

### GET /conversations/{conversationId}

**Input Parameters:**
- `conversationId` (path parameter, required)
- `Authorization` header with Bearer token

**Test Scenarios:**
| Input Type | ConversationId | User Membership | Expected HTTP Status | Expected Output |
|------------|----------------|-----------------|---------------------|-----------------|
| Valid | Existing conversation | User is member | 200 OK | Conversation object |
| Invalid | Existing conversation | User is NOT member | 400 Bad Request | "User is not a member of this conversation" |
| Invalid | 999 (non-existent) | N/A | 400 Bad Request | "Conversation not found" |

### POST /conversations/addMember

**Input Parameters:**
- `Authorization` header with Bearer token
- Request body:
  - `conversationId` (integer, required)
  - `members` (array of integers, required)

**Test Scenarios:**
| Input Type | ConversationType | User Role | MemberIds | Expected HTTP Status | Expected Output |
|------------|------------------|-----------|-----------|---------------------|-----------------|
| Valid | GROUP | Creator | [validUserId] | 200 OK | "Members added successfully" |
| Invalid | GROUP | Non-creator | [validUserId] | 400 Bad Request | "Only creator can add members" |
| Invalid | GROUP | Creator | [blockedUserId] | 400 Bad Request | "Cannot add blocked user" |
| Invalid | DIRECT | Creator | [thirdUserId] | 400 Bad Request | "Cannot add to DIRECT" |

### POST /conversations/removeMember

**Input Parameters:**
- `Authorization` header with Bearer token
- Request body:
  - `conversationId` (integer, required)
  - `members` (array of integers, required)

**Test Scenarios:**
| Input Type | ConversationType | User Role | MemberIds | Expected HTTP Status | Expected Output |
|------------|------------------|-----------|-----------|---------------------|-----------------|
| Valid | GROUP | Creator | [memberUserId] | 200 OK | "Member removed successfully" |
| Invalid | GROUP | Non-creator | [memberUserId] | 400 Bad Request | "Only creator can remove" |
| Valid | GROUP | Member | [selfUserId] | 200 OK | "Member removed successfully" |

---

## 4.4 Message APIs

### POST /messages/{conversationId}/send

**Input Parameters:**
- `conversationId` (path parameter, required)
- `Authorization` header with Bearer token
- `Content-Type: text/plain`
- Request body: message content (plain text)

**Test Scenarios:**
| Input Type | ConversationId | User Membership | Message Content | Block Status | Expected HTTP Status | Expected Output |
|------------|----------------|-----------------|-----------------|--------------|---------------------|-----------------|
| Valid | Existing DIRECT | User is member | "Hello!" | No blocks | 200 OK | "Message sent successfully" |
| Valid | Existing GROUP | User is member | "Hello group!" | No blocks | 200 OK | "Message sent successfully" |
| Invalid | Existing | User is NOT member | "Hack attempt" | N/A | 400 Bad Request | "User is not a member" |
| Invalid | Existing DIRECT | User is member | "" (empty) | No blocks | 400 Bad Request | Error message |
| Valid | Existing DIRECT | User is member | Very long text (10k chars) | No blocks | 200 OK or 400 | Response based on limit |
| Invalid | Existing DIRECT | User is member | "Message" | Receiver blocked sender | 400 Bad Request | "You must unblock the user" |
| Invalid | Existing DIRECT | User is member | "Message" | Sender blocked receiver | 400 Bad Request | "You cannot send message" |
| Valid | Existing GROUP | User is member | "Hello!" | Alice blocked Bob | 200 OK | "Message sent successfully" |
| Invalid | 999 (non-existent) | N/A | "Ghost message" | N/A | 400 Bad Request | "Conversation not found" |
| Security | Existing | User is member | `<script>alert('XSS')</script>` | No blocks | 200 OK | Stored (should be escaped on display) |
| Security | Existing | User is member | `'; DROP TABLE messages; --` | No blocks | 200 OK | Treated as plain text |

### GET /messages/{conversationId}/get

**Input Parameters:**
- `conversationId` (path parameter, required)
- `Authorization` header with Bearer token
- Query parameters:
  - `page` (integer, optional, default: 0)
  - `size` (integer, optional, default: 20)

**Test Scenarios:**
| Input Type | ConversationId | User Membership | Page | Size | Expected HTTP Status | Expected Output |
|------------|----------------|-----------------|------|------|---------------------|-----------------|
| Valid | Existing | User is member | 0 | 20 | 200 OK | Array of messages |
| Invalid | Existing | User is NOT member | 0 | 20 | 400 Bad Request | "Cannot access messages" |
| Valid | Existing with 50 messages | User is member | 1 | 10 | 200 OK | Paginated messages (if supported) |

---

## 5. Test Environment

- **API Base URL:** http://localhost:8080
- **Authentication:** JWT Bearer tokens
- **Tools:** Postman, REST Client, or custom scripts
- **Data Storage:** In-memory (resets on restart)

---

## 6. Entry and Exit Criteria

### Entry Criteria:
- API server is running and accessible
- Documentation is available and reviewed
- Test data setup script is ready
- Evidence folder structure is created

### Exit Criteria:
- All test cases executed
- All defects documented with evidence
- Test summary report completed
- Evidence files organized and linked

---

## 7. Deliverables

1. This Test Plan document
2. Test Cases document with execution results
3. Defect Reports document
4. Evidence folder with screenshots and logs
5. Risk & Recommendations document

---

## 8. Risks and Assumptions

### Risks:
- In-memory storage means data resets on server restart
- JWT tokens may expire during long test sessions
- No database persistence may mask certain defects

### Assumptions:
- API specification in documentation.md is accurate
- Server is running on localhost:8080
- Test execution order may affect results due to shared state
