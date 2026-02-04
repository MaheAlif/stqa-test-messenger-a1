# AUTH API Testing - Teammate Findings (Formatted)

## Summary

**Total Test Cases Executed:** 39
- Signup: 12 test cases
- Login: 14 test cases  
- Logout: 10 test cases
- Auth Test Endpoint: 6 test cases

**Results:**
- **Passed:** 27
- **Failed (Bugs Found):** 12

---

## NEW DEFECTS FOUND (Not in original testCases.md)

### DEFECT-AUTH-01: Signup Accepts Empty Email
**Severity:** High  
**Test Case:** TC-1.4-SIGNUP  
**Expected:** 400 Bad Request - "Email required"  
**Actual:** 400 Bad Request - "Username already taken" (wrong error message when username exists)  
**Impact:** Input validation missing for email field. Security issue - accounts can be created without email addresses.

---

### DEFECT-AUTH-02: Signup Accepts Invalid Email Format
**Severity:** High  
**Test Case:** TC-1.5-SIGNUP  
**Steps:**
1. POST /auth/signup
2. Body: `{"username": "JARIN", "email": "NOT A MAIL", "password": "1234"}`

**Expected:** 400 Bad Request - "Invalid email format"  
**Actual:** 201 Created - Account created with userId 103  
**Impact:** Critical validation bug. No email format validation. Users can register with garbage email values, breaking any email-based functionality.

---

### DEFECT-AUTH-03: Signup Accepts Empty Password
**Severity:** CRITICAL  
**Test Case:** TC-1.6-SIGNUP  
**Steps:**
1. POST /auth/signup
2. Body: `{"username": "Fariha", "email": "fariha@test.com", "password": ""}`

**Expected:** 400 Bad Request - "Password required"  
**Actual:** 201 Created - Account created with userId 104  
**Impact:** CRITICAL SECURITY BUG. Users can create accounts without passwords. This completely breaks authentication security.

---

### DEFECT-AUTH-04: Signup Vulnerable to SQL Injection
**Severity:** CRITICAL  
**Test Case:** TC-1.11-SIGNUP  
**Steps:**
1. POST /auth/signup
2. Body: `{"username": "' OR '1'='1", "email": "sql@test.com", "password": "1234"}`

**Expected:** 400 Bad Request - "Invalid input"  
**Actual:** 201 Created - Account created with username "' OR '1'='1" and userId 106  
**Impact:** CRITICAL SECURITY VULNERABILITY. SQL injection attack possible. Input sanitization completely missing.

---

### DEFECT-AUTH-05: Duplicate Email Allowed with Different Username
**Severity:** Medium  
**Test Case:** TC-1.12-SIGNUP  
**Steps:**
1. User with email alice@test.com already exists
2. POST /auth/signup
3. Body: `{"username": "alice_new", "email": "alice@test.com", "password": "1234"}`

**Expected:** 400 Bad Request - "Email already in use"  
**Actual:** 201 Created - New account created with userId 107  
**Impact:** Business logic flaw. Same email can be used for multiple accounts, causing confusion and potential account recovery issues.

---

### DEFECT-AUTH-06: Login Works Without Password
**Severity:** CRITICAL  
**Test Case:** TC-AUTH-2.6  
**Steps:**
1. User "Fariha" already exists
2. POST /auth/login
3. Body: `{"username": "Fariha", "email": "fariha@test.com", "password": ""}`

**Expected:** 401 Unauthorized - "Password required"  
**Actual:** 200 OK - Returns valid JWT token and userId 104  
**Impact:** CRITICAL SECURITY BREACH. Users can login without providing password. Complete authentication bypass.

---

### DEFECT-AUTH-07: Login with Email Only Causes Server Crash
**Severity:** High  
**Test Case:** TC-AUTH-2.3  
**Steps:**
1. Two users exist with same email alice@test.com but different usernames
2. POST /auth/login
3. Body: `{"email": "alice@test.com", "password": "1234"}`

**Expected:** 400 Bad Request - "Username required"  
**Actual:** 500 Internal Server Error  
**Impact:** Server crash on predictable input. Indicates poor error handling when username field is missing.

---

### DEFECT-AUTH-08: Login Accepts Wrong Email (Ignored in Validation)
**Severity:** Medium  
**Test Case:** TC-AUTH-2.14  
**Steps:**
1. User "alice" exists with email alice@test.com
2. POST /auth/login
3. Body: `{"username": "alice", "email": "WRONG@EMAIL.com", "password": "1234"}`

**Expected:** 400 Bad Request - "Email mismatch"  
**Actual:** 200 OK - Returns token, email field ignored completely  
**Impact:** Email field in login request is not validated. While not critical, indicates inconsistent validation logic.

---

### DEFECT-AUTH-09: Logout Works for Non-Existent User
**Severity:** Medium  
**Test Case:** TC-AUTH-3.3  
**Steps:**
1. User "MUBASSIR" does not exist
2. POST /auth/logout?username=MUBASSIR

**Expected:** 404 Not Found - "User not found"  
**Actual:** 200 OK - "User logged out successfully"  
**Impact:** Logout doesn't validate user existence. Information disclosure - allows enumeration of non-existent users.

---

### DEFECT-AUTH-10: Logout Accepts Empty Username
**Severity:** Medium  
**Test Case:** TC-AUTH-3.4  
**Steps:**
1. POST /auth/logout?username=

**Expected:** 400 Bad Request - "Username required"  
**Actual:** 200 OK - "User logged out successfully"  
**Impact:** Input validation bug. Empty username should be rejected.

---

### DEFECT-AUTH-11: Logout Accepts Invalid Username Format
**Severity:** Low  
**Test Case:** TC-AUTH-3.5  
**Steps:**
1. POST /auth/logout?username=@@@###

**Expected:** 400 Bad Request - "Invalid username format"  
**Actual:** 200 OK - "User logged out successfully"  
**Impact:** Input validation missing for username format.

---

### DEFECT-AUTH-12: Logout Accepts Extra Parameters (Potential Security Risk)
**Severity:** Medium  
**Test Case:** TC-AUTH-3.8  
**Steps:**
1. User "alice" is logged in
2. POST /auth/logout?username=alice&role=admin

**Expected:** 400 Bad Request - "Extra parameters not allowed"  
**Actual:** 200 OK - "User logged out successfully"  
**Impact:** Extra parameters not filtered. Potential security risk if parameters affect logout behavior.

---

## FORMATTED TEST CASES FOR INTEGRATION

### SIGNUP Tests (12 total)

| Test ID | Title | Pre-conditions | Steps | Expected | Actual | Status | Pass/Fail |
|---------|-------|----------------|-------|----------|--------|--------|-----------|
| TC-AUTH-SIGNUP-01 | Valid User Signup | None | POST /auth/signup with valid data | 201 Created with userId | 201 Created with userId | Completed | Pass |
| TC-AUTH-SIGNUP-02 | Duplicate Username Signup | User "alice" exists | POST /auth/signup with duplicate username | 400 Bad Request | 400 Bad Request | Completed | Pass |
| TC-AUTH-SIGNUP-03 | Signup with Empty Username | None | POST /auth/signup with empty username | 400 Bad Request | 201 Created (userId 102) | Completed | **Fail** |
| TC-AUTH-SIGNUP-04 | Signup with Empty Email | User "alice" exists | POST /auth/signup with empty email | 400 Bad Request | 400 Bad Request (wrong error) | Completed | **Fail** |
| TC-AUTH-SIGNUP-05 | Signup with Invalid Email | None | POST /auth/signup with "NOT A MAIL" | 400 Bad Request | 201 Created (userId 103) | Completed | **Fail** |
| TC-AUTH-SIGNUP-06 | Signup with Empty Password | None | POST /auth/signup with empty password | 400 Bad Request | 201 Created (userId 104) | Completed | **Fail** |
| TC-AUTH-SIGNUP-07 | Signup with GET Method | None | GET /auth/signup | 405 Method Not Allowed | 405 Method Not Allowed | Completed | Pass |
| TC-AUTH-SIGNUP-08 | Signup with PUT Method | None | PUT /auth/signup | 405 Method Not Allowed | 405 Method Not Allowed | Completed | Pass |
| TC-AUTH-SIGNUP-09 | Signup with Role Injection | None | PUT /auth/signup with "role":"admin" | 405 Method Not Allowed | 405 Method Not Allowed | Completed | Pass |
| TC-AUTH-SIGNUP-10 | Signup with Very Long Username | None | POST /auth/signup with 50+ char username | 201 Created | 201 Created (userId 105) | Completed | Pass |
| TC-AUTH-SIGNUP-11 | Signup with SQL Injection | None | POST /auth/signup with "' OR '1'='1" | 400 Bad Request | 201 Created (userId 106) | Completed | **Fail** |
| TC-AUTH-SIGNUP-12 | Signup with Duplicate Email | Email alice@test.com exists | POST /auth/signup with same email, different username | 400 Bad Request | 201 Created (userId 107) | Completed | **Fail** |

### LOGIN Tests (14 total)

| Test ID | Title | Pre-conditions | Steps | Expected | Actual | Status | Pass/Fail |
|---------|-------|----------------|-------|----------|--------|--------|-----------|
| TC-AUTH-LOGIN-01 | Valid Login | User "alice" exists | POST /auth/login with correct credentials | 200 OK with token | 200 OK with token | Completed | Pass |
| TC-AUTH-LOGIN-02 | Login with Wrong Password | User "alice" exists | POST /auth/login with wrong password | 401 Unauthorized | 401 Unauthorized | Completed | Pass |
| TC-AUTH-LOGIN-03 | Login with Email Only (Duplicate Email) | 2 users with same email exist | POST /auth/login with only email | 500 Internal Server Error | 500 Internal Server Error | Completed | **Fail** |
| TC-AUTH-LOGIN-04 | Login with Non-Existent User | User "afrin" does not exist | POST /auth/login | 401 Unauthorized | 401 Unauthorized | Completed | Pass |
| TC-AUTH-LOGIN-05 | Login with Empty Username | None | POST /auth/login with empty username | 400 Bad Request | 200 OK with token (userId 102) | Completed | Pass |
| TC-AUTH-LOGIN-06 | Login Without Password | User "Fariha" exists | POST /auth/login with empty password | 401 Unauthorized | 200 OK with token | Completed | **Fail** |
| TC-AUTH-LOGIN-07 | Login with Missing Password Field | User "alice" exists | POST /auth/login without password field | 401 Unauthorized | 401 Unauthorized | Completed | Pass |
| TC-AUTH-LOGIN-08 | Login with Missing Username Field | None | POST /auth/login without username field | 500 Internal Server Error | 500 Internal Server Error | Completed | Pass |
| TC-AUTH-LOGIN-09 | Login with GET Method | None | GET /auth/login | 405 Method Not Allowed | 405 Method Not Allowed | Completed | Pass |
| TC-AUTH-LOGIN-10 | Login with Extra Field (role) | User "alice" exists | POST /auth/login with "role":"admin" | 200 OK (role ignored) | 200 OK with token | Completed | Pass |
| TC-AUTH-LOGIN-11 | Login with SQL Injection | None | POST /auth/login with SQL injection | 401 Unauthorized | 401 Unauthorized | Completed | Pass |
| TC-AUTH-LOGIN-12 | Login with Empty Body | None | POST /auth/login with {} | 400 Bad Request | 400 Bad Request | Completed | Pass |
| TC-AUTH-LOGIN-13 | Login with Case-Sensitive Username | User "alice" exists | POST /auth/login with "Alice" | 401 Unauthorized | 401 Unauthorized | Completed | Pass |
| TC-AUTH-LOGIN-14 | Login with Wrong Email (Field Ignored) | User "alice" exists | POST /auth/login with wrong email but correct username/password | 400 Bad Request | 200 OK with token | Completed | **Fail** |

### LOGOUT Tests (10 total)

| Test ID | Title | Pre-conditions | Steps | Expected | Actual | Status | Pass/Fail |
|---------|-------|----------------|-------|----------|--------|--------|-----------|
| TC-AUTH-LOGOUT-01 | Valid User Logout | User "alice" logged in | POST /auth/logout?username=alice | 200 OK | 200 OK | Completed | Pass |
| TC-AUTH-LOGOUT-02 | Logout Without Login | User "alice" NOT logged in | POST /auth/logout?username=alice | 400 Bad Request | 400 Bad Request | Completed | Pass |
| TC-AUTH-LOGOUT-03 | Logout with Non-Existent User | User "MUBASSIR" does not exist | POST /auth/logout?username=MUBASSIR | 404 Not Found | 200 OK | Completed | **Fail** |
| TC-AUTH-LOGOUT-04 | Logout with Empty Username | None | POST /auth/logout?username= | 400 Bad Request | 200 OK | Completed | **Fail** |
| TC-AUTH-LOGOUT-05 | Logout with Invalid Username Format | None | POST /auth/logout?username=@@@### | 400 Bad Request | 200 OK | Completed | **Fail** |
| TC-AUTH-LOGOUT-06 | Logout Using GET Method | User "alice" logged in | GET /auth/logout?username=alice | 405 Method Not Allowed | 405 Method Not Allowed | Completed | Pass |
| TC-AUTH-LOGOUT-07 | Logout Without Username Parameter | None | POST /auth/logout | 400 Bad Request | 400 Bad Request | Completed | Pass |
| TC-AUTH-LOGOUT-08 | Logout with Extra Parameter | User "alice" logged in | POST /auth/logout?username=alice&role=admin | 400 Bad Request | 200 OK | Completed | **Fail** |
| TC-AUTH-LOGOUT-09 | Multiple Logout Requests | User "alice" logged in | POST /auth/logout twice | 1st: 200, 2nd: 404 | 404 Not Found | Completed | Pass |
| TC-AUTH-LOGOUT-10 | Logout with SQL Injection | None | POST /auth/logout?username=' OR '1'='1 | 400 Bad Request | 404 Not Found | Completed | Pass |

### AUTH TEST Endpoint Tests (6 total)

| Test ID | Title | Pre-conditions | Steps | Expected | Actual | Status | Pass/Fail |
|---------|-------|----------------|-------|----------|--------|--------|-----------|
| TC-AUTH-TEST-01 | Access Protected API with Valid Token | User "alice" logged in | GET /auth/test with valid token | 200 OK | 405 Method Not Allowed | Completed | **Fail** |
| TC-AUTH-TEST-02 | Access Protected API Without Token | None | GET /auth/test without Authorization | 403 Forbidden | 403 Forbidden | Completed | Pass |
| TC-AUTH-TEST-03 | Access Protected API with Empty Token | None | GET /auth/test with "Bearer " only | 403 Forbidden | 403 Forbidden | Completed | Pass |
| TC-AUTH-TEST-04 | Access Protected API with Invalid Token | None | GET /auth/test with invalid token | 403 Forbidden | 403 Forbidden | Completed | Pass |
| TC-AUTH-TEST-05 | Access Protected API Using POST Method | User "alice" logged in | POST /auth/test with valid token | 405 Method Not Allowed | 403 Forbidden | Completed | Pass |
| TC-AUTH-TEST-06 | Access Protected API After Logout | User "alice" logged out | GET /auth/test with old token | 403 Forbidden | 403 Forbidden | Completed | Pass |

---

## CRITICAL FINDINGS SUMMARY

### CRITICAL Security Issues (Must Fix Immediately):
1. **DEFECT-AUTH-03:** Signup without password allowed
2. **DEFECT-AUTH-04:** SQL injection vulnerability in signup
3. **DEFECT-AUTH-06:** Login without password allowed

### HIGH Priority Issues:
4. **DEFECT-AUTH-01:** Missing email validation
5. **DEFECT-AUTH-02:** Invalid email format accepted
6. **DEFECT-AUTH-07:** Server crash on missing username in login

### MEDIUM Priority Issues:
7. **DEFECT-AUTH-05:** Duplicate emails allowed
8. **DEFECT-AUTH-08:** Email field ignored in login
9. **DEFECT-AUTH-09:** Logout works for non-existent users
10. **DEFECT-AUTH-10:** Logout accepts empty username
11. **DEFECT-AUTH-12:** Extra parameters not filtered in logout

### LOW Priority Issues:
12. **DEFECT-AUTH-11:** Invalid username format accepted in logout

---

## INTEGRATION NOTES

### For testCases.md:
- TC-AUTH-003 through TC-AUTH-013 are currently marked as "Pending" in your testCases.md
- Teammate has completed many similar tests but with different test case IDs
- Recommend: Update existing TC-AUTH-003 to TC-AUTH-013 with teammate's actual results OR add new test case IDs

### For TestPlan.md:
- Add test scenarios for:
  - Empty password validation
  - Email format validation  
  - SQL injection attempts
  - Duplicate email handling
  - Extra parameter filtering

### For DefectReports.md:
- Add 12 new defects (DEFECT-AUTH-01 through DEFECT-AUTH-12)
- 3 are CRITICAL severity
- 3 are HIGH severity
- 5 are MEDIUM severity
- 1 is LOW severity

---

## TEST EVIDENCE FILES NEEDED

The teammate should provide screenshots/evidence for:
- TC-AUTH-SIGNUP-03, 04, 05, 06, 11, 12 (6 failed tests)
- TC-AUTH-LOGIN-03, 06, 14 (3 failed tests)
- TC-AUTH-LOGOUT-03, 04, 05, 08 (4 failed tests)
- TC-AUTH-TEST-01 (1 failed test)

**Total new evidence files needed:** 14

---

## RECOMMENDATIONS FOR TEAMMATE

1. **Naming Convention:** Use consistent test case IDs (TC-AUTH-XXX format)
2. **Evidence Files:** Create proper screenshot files matching test case IDs
3. **Consolidation:** Several tests overlap with existing TC-AUTH-003 to TC-AUTH-013 - discuss with team which to keep
4. **Priority:** Focus evidence collection on CRITICAL and HIGH severity defects first
