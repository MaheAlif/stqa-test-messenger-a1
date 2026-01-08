# Messenger API Endpoints Reference

## Base URL
`http://localhost:8080`

---

## 1. HEALTH & UTILITIES

### 1.1 Health Check
- **Endpoint:** `GET /health`
- **Auth Required:** No
- **Parameters:** None
- **Expected Response:** 200 OK

### 1.2 Reset Data
- **Endpoint:** `GET /reset`
- **Auth Required:** No
- **Parameters:** None
- **Expected Response:** 200 OK

---

## 2. AUTH APIs

### 2.1 Signup
- **Endpoint:** `POST /auth/signup`
- **Auth Required:** No
- **Content-Type:** application/json
- **Request Body:**
  ```json
  {
    "username": "string (required)",
    "email": "string (required)",
    "password": "string (required)"
  }
  ```
- **Expected Response:** 201 Created
- **Success Response:**
  ```json
  {
    "username": "string",
    "userId": integer
  }
  ```
- **Error Responses:**
  - 400: "Username already taken"

### 2.2 Login
- **Endpoint:** `POST /auth/login`
- **Auth Required:** No
- **Content-Type:** application/json
- **Request Body:**
  ```json
  {
    "username": "string (required)",
    "password": "string (required)"
  }
  ```
- **Expected Response:** 200 OK
- **Success Response:**
  ```json
  {
    "token": "string (JWT)",
    "userId": integer
  }
  ```
- **Error Responses:**
  - 401: "Invalid password"
  - 401: "User not found"

### 2.3 Logout
- **Endpoint:** `POST /auth/logout?username={username}`
- **Auth Required:** No
- **Query Parameters:**
  - `username`: string (required)
- **Expected Response:** 200 OK

### 2.4 Auth Test
- **Endpoint:** `GET /auth/test`
- **Auth Required:** Yes (Bearer Token)
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Expected Response:** 200 OK
- **Error Responses:**
  - 403: Forbidden (no/invalid token)

---

## 3. USER APIs

### 3.1 Get All Users
- **Endpoint:** `GET /users/`
- **Auth Required:** Yes (Bearer Token)
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Expected Response:** 200 OK
- **Success Response:**
  ```json
  [
    {
      "userId": integer,
      "username": "string",
      "email": "string or null",
      "password": "string or null"
    }
  ]
  ```
- **Error Responses:**
  - 401: "You must be logged in to view users"
  - 401: "Unauthorized"

### 3.2 Get User by ID
- **Endpoint:** `GET /users/{id}`
- **Auth Required:** Yes (Bearer Token)
- **Path Parameters:**
  - `id`: integer (userId)
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Expected Response:** 200 OK
- **Error Responses:**
  - 404: "User not found"
  - 401: Unauthorized

### 3.3 Get User by Username
- **Endpoint:** `GET /users/username/{username}`
- **Auth Required:** Yes (Bearer Token)
- **Path Parameters:**
  - `username`: string
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Expected Response:** 200 OK
- **Error Responses:**
  - 404: "User not found"
  - 401: Unauthorized

### 3.4 Update User (Self Only)
- **Endpoint:** `PATCH /users/{id}`
- **Auth Required:** Yes (Bearer Token)
- **Path Parameters:**
  - `id`: integer (must match authenticated user's ID)
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
- **Request Body:** (any combination of fields)
  ```json
  {
    "username": "string (optional)",
    "email": "string (optional)",
    "password": "string (optional)"
  }
  ```
- **Expected Response:** 200 OK
- **Error Responses:**
  - 400: "User ID cannot be updated" (if body contains 'id' field)
  - 400: "User not found"
  - 403: "You can only update your own user details"
  - 401: Unauthorized

### 3.5 Block User
- **Endpoint:** `PATCH /users/block/{id}`
- **Auth Required:** Yes (Bearer Token)
- **Path Parameters:**
  - `id`: integer (userId to block)
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Expected Response:** 200 OK
- **Error Responses:**
  - 400: "User not found"
  - 400: "User to be blocked not found"
  - 400: "Failed to block user"
  - 401: Unauthorized

### 3.6 Unblock User
- **Endpoint:** `DELETE /users/block/{id}`
- **Auth Required:** Yes (Bearer Token)
- **Path Parameters:**
  - `id`: integer (userId to unblock)
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Expected Response:** 200 OK
- **Error Responses:**
  - 400: "User not found"
  - 400: "User to be unblocked not found"
  - 400: "Failed to unblock user"
  - 401: Unauthorized

---

## 4. CONVERSATION APIs

### 4.1 Get My Conversations
- **Endpoint:** `GET /conversations/get`
- **Auth Required:** Yes (Bearer Token)
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Expected Response:** 200 OK
- **Success Response:**
  ```json
  [
    {
      "conversationId": integer,
      "type": "DIRECT | GROUP",
      "name": "string or null"
    }
  ]
  ```
- **Error Responses:**
  - 400: "User not found"

### 4.2 Get Conversation by ID
- **Endpoint:** `GET /conversations/{conversationId}`
- **Auth Required:** Yes (Bearer Token)
- **Path Parameters:**
  - `conversationId`: integer
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Expected Response:** 200 OK
- **Error Responses:**
  - 400: "User not found"
  - 400: "Conversation not found"
  - 400: "User is not a member of this conversation"

### 4.3 Create Conversation (DIRECT or GROUP)
- **Endpoint:** `POST /conversations/create`
- **Auth Required:** Yes (Bearer Token)
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "type": "DIRECT | GROUP (required)",
    "name": "string (required for GROUP, null for DIRECT)",
    "memberIds": [integer array (required)]
  }
  ```
- **Expected Response:** 200 OK
- **Success Response:**
  ```json
  {
    "conversationId": integer,
    "type": "DIRECT | GROUP",
    "name": "string or null"
  }
  ```
- **Error Responses:**
  - 400: "User not found"
  - 400: "Failed to create direct conversation"
  - 400: "Failed to create group conversation"

### 4.4 Add Members
- **Endpoint:** `POST /conversations/addMember`
- **Auth Required:** Yes (Bearer Token)
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "conversationId": integer (required),
    "members": [integer array (required)]
  }
  ```
- **Expected Response:** 200 OK
- **Success Response:**
  ```json
  {
    "message": "Members added successfully",
    "conversationId": integer,
    "memberIds": [integer array]
  }
  ```
- **Error Responses:**
  - 400: "User is not a member of this conversation"
  - 400: "Conversation not found"
  - 400: "Failed to add member to conversation"

### 4.5 Remove Members
- **Endpoint:** `POST /conversations/removeMember`
- **Auth Required:** Yes (Bearer Token)
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "conversationId": integer (required),
    "members": [integer array (required)]
  }
  ```
- **Expected Response:** 200 OK
- **Success Response:**
  ```json
  {
    "message": "Member removed successfully",
    "conversationId": integer,
    "memberIds": [integer array]
  }
  ```
- **Error Responses:**
  - 400: "User is not a member of this conversation"
  - 400: "Conversation not found"
  - 400: "Failed to remove member from conversation"

---

## 5. MESSAGE APIs

### 5.1 Get Messages
- **Endpoint:** `GET /messages/{conversationId}/get?page={page}&size={size}`
- **Auth Required:** Yes (Bearer Token)
- **Path Parameters:**
  - `conversationId`: integer
- **Query Parameters:**
  - `page`: integer (optional, default 0)
  - `size`: integer (optional, default 20)
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Expected Response:** 200 OK
- **Success Response:**
  ```json
  {
    "message": "Messages retrieved successfully",
    "data": [
      {
        "id": integer,
        "conversationId": integer,
        "senderId": integer,
        "content": "string",
        "timestamp": long
      }
    ]
  }
  ```
- **Error Responses:**
  - 400: "Cannot access messages for this conversation: User is not a member of this conversation"

### 5.2 Send Message
- **Endpoint:** `POST /messages/{conversationId}/send`
- **Auth Required:** Yes (Bearer Token)
- **Path Parameters:**
  - `conversationId`: integer
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: text/plain`
- **Request Body:** Plain text message content
- **Expected Response:** 200 OK
- **Success Response:**
  ```json
  {
    "message": "Message sent successfully",
    "data": [
      {
        "id": integer,
        "conversationId": integer,
        "senderId": integer,
        "content": "string",
        "timestamp": long
      }
    ]
  }
  ```
- **Error Responses (DIRECT chats only):**
  - 400: "You must unblock the user to send messages" (receiver blocked sender)
  - 400: "You cannot send message to this conversation" (sender blocked receiver)
  - 400: "User is not a member of this conversation"

---

## API Summary Count

| Category | Endpoint Count |
|----------|----------------|
| Health & Utilities | 2 |
| Auth | 4 |
| Users | 6 |
| Conversations | 5 |
| Messages | 2 |
| **TOTAL** | **19 endpoints** |
