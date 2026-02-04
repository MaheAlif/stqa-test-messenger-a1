# Messenger API - System Testing Project

**Course:** Software Testing and Quality Assurance (STQA)  
**Assignment:** System Testing  
**Date:** January 12, 2026

## Team Members

| Name | Student ID |
|------|------------|
| A. M. Shahriar Rashid Mahe | 011221130 |
| Saida Zaman | 011221141 |
| Eila Afrin | 011221149 |
| Jarin Fariha | 011213124 |

---

## Project Overview

This repository contains comprehensive **system testing** performed on the Messenger API - a REST API implementing user authentication, user management, conversation handling (DIRECT and GROUP), and messaging functionality with JWT-based authentication and in-memory storage.

We conducted **black-box system testing** using **Postman** to identify defects, validate business logic, test security vulnerabilities, and assess system reliability across all API endpoints.

---

## Testing Approach

### Testing Strategy
- **Black-box system testing** with focus on:
  - Boundary value analysis
  - Equivalence partitioning  
  - Negative testing
  - Authorization and permission validation
  - Security testing (SQL injection, XSS attacks)
  - Business logic validation

### Tools Used
- **Postman** - Primary API testing tool
- **Docker** - Application containerization and deployment
- **Node.js** - Test automation scripts
- **Git/GitHub** - Version control and collaboration

### Testing Scope
- Authentication APIs (signup, login, logout, JWT validation)
- User Management APIs (CRUD operations, block/unblock)
- Conversation APIs (create, retrieve, member management)
- Message APIs (send, retrieve, pagination)
- Authorization checks across all protected endpoints
- Data integrity and constraint validation

---

## Testing Results Summary

### Test Execution
- **Total Test Cases:** 72
- **Passed:** 50 (69%)
- **Failed:** 22 (31%)

### Test Coverage by Category

| API Category | Total Tests | Passed | Failed | Pass Rate |
|--------------|-------------|--------|--------|-----------|
| Authentication | 26 | 16 | 10 | 62% |
| User Management | 14 | 12 | 2 | 86% |
| Conversations | 18 | 10 | 8 | 56% |
| Messages | 14 | 12 | 2 | 86% |

### Defects Identified

**Total Defects:** 24

| Severity | Count | Percentage | Priority |
|----------|-------|------------|----------|
| **Critical** | 3 | 12.5% | P0 - Immediate Fix |
| **High** | 8 | 33.3% | P0/P1 - Urgent |
| **Medium** | 11 | 45.8% | P2 - Short Term |
| **Low** | 2 | 8.3% | P3 - Future |

### Critical Security Vulnerabilities
1. **Authentication Bypass** - Login/signup without password (DEFECT-015, DEFECT-016)
2. **SQL Injection** - Malicious input accepted in signup (DEFECT-017)
3. **XSS-induced Server Crash** - Denial of Service vulnerability (DEFECT-013)
4. **Data Integrity Issues** - User ID modification, invalid references (DEFECT-001, DEFECT-004)

---

## Repository Structure

```
stqa-test-messenger/
├── SystemTestingReport.md       # Comprehensive testing report (all deliverables)
├── testCases.md                 # Detailed test case documentation
├── TestPlan.md                  # Input/output test strategy per endpoint
├── DefectReports.md             # Individual defect reports with evidence
├── Evidence/                    # Screenshots and test evidence
├── convert-to-pdf.js            # PDF generation utility
├── setup-test-data.js           # Test data automation tool (bonus)
├── docker-compose.yml           # Docker deployment configuration
├── Documentation.md             # API specification and usage guide
└── src/                         # Source code (provided)
```

---

## Deliverables

All testing deliverables are consolidated in **`SystemTestingReport.md`** which includes:

### 1. Test Plan
Comprehensive input/parameter test strategy for all API endpoints:
- Authentication APIs (signup, login, logout, token validation)
- User Management APIs (CRUD, block/unblock)
- Conversation APIs (create, member management)
- Message APIs (send, retrieve, pagination)

Each endpoint includes tables with:
- Input types (valid/invalid)
- Test scenarios
- Expected HTTP status codes
- Expected outputs

### 2. Test Cases (72 Total)
Complete test case documentation with:
- **Test ID** (TC-AUTH-001, TC-USER-001, etc.)
- **Title** - Short description
- **Pre-conditions** - Required setup
- **Expected Result** - Correct behavior
- **Actual Result** - Observed behavior
- **Pass/Fail Status**
- **Evidence** - Screenshot references in Evidence folder

All test cases executed manually via Postman with comprehensive screenshots.

### 3. Defect Reports (24 Defects)
Detailed defect documentation including:
- **Defect ID** (DEFECT-001 to DEFECT-026)
- **Severity** (Critical/High/Medium/Low)
- **Test Case Reference**
- **Steps to Reproduce**
- **Expected vs Actual Behavior**
- **Impact Assessment**

Defects categorized into:
- Critical Auth Vulnerabilities (3)
- Data Integrity Issues (6)
- Input Validation Problems (5)
- Server Stability Issues (3)
- Authorization Bypasses (2)
- Business Logic Violations (4)
- API Design Issues (3)

### 4. Risk & Recommendations
Analysis of high-risk issues with priority roadmap:
- **P0 (Security Critical):** Authentication bypass, SQL injection, XSS protection
- **P1 (Data Integrity):** User ID immutability, validation improvements
- **P2 (Business Logic):** Authorization checks, error handling

Includes testing improvements, code quality recommendations, and business impact assessment.

### 5. Individual Reflections
Team member contributions and insights:
- **Fariha Islam** - Authentication testing
- **Eila Afrin** - User management testing
- **Mahe** - Conversation testing, Docker containerization, test automation
- **Saida Zaman** - Message testing, documentation

---

## Evidence Documentation

The `Evidence/` folder contains **comprehensive screenshot evidence** for all test cases:
- Organized by test case ID
- Postman request/response screenshots
- Server logs for error scenarios
- JWT token validation screenshots
- Visual proof of all defects

---

## Bonus Work - Test Automation Tools

### 1. Test Data Setup Tool (`setup-test-data.js`)
Automated test environment creation tool developed by our team:
- **Purpose:** Populate system with realistic test data
- **Features:**
  - Automated user creation with JWT token management
  - Pre-configured conversation scenarios (DIRECT/GROUP)
  - Message history generation
  - Blocking relationship setup
  - Configurable via command-line flags

**Usage:**
```bash
node setup-test-data.js
```

**Benefits:**
- Eliminates manual test data creation
- Ensures consistent test environment
- Speeds up testing workflow for entire team
- Reusable across test runs

### 2. PDF Conversion Tool (`convert-to-pdf.js`)
Professional PDF generation utility:
- Converts SystemTestingReport.md to professionally formatted PDF
- Custom CSS styling with color-coded tables
- Automatic page breaks and headers/footers
- Syntax highlighting for code blocks

**Usage:**
```bash
npm install marked puppeteer
node convert-to-pdf.js
```

---

## Docker Deployment

The project is fully containerized for easy deployment:

**Run the application:**
```bash
docker-compose up
```

**API Base URL:** `http://localhost:8080`

Full setup instructions available in `SETUP_GUIDE.md`.

---

## Key Findings

### System Status: **NOT PRODUCTION-READY**

**Critical Issues:**
1. **Complete authentication bypass** - Anyone can login without password
2. **SQL injection vulnerability** - No input sanitization
3. **Server crashes on XSS payloads** - DoS vulnerability
4. **Data integrity violations** - Primary key modification allowed
5. **Authorization bypass** - Access control not enforced

**Recommendation:** **DO NOT DEPLOY** without addressing P0 security fixes.

### Testing Coverage Assessment
- ✅ Comprehensive endpoint coverage (4 API categories, 72 tests)
- ✅ Security testing (injection attacks, auth bypass)
- ✅ Negative testing (invalid inputs, edge cases)
- ✅ Authorization validation (self-update, creator permissions)
- ✅ Business logic validation (conversation types, blocking)
- ✅ Evidence-backed findings (screenshots for all tests)

---

## Documentation

- **`Documentation.md`** - Complete API specification and endpoint details
- **`SETUP_GUIDE.md`** - Application setup and deployment instructions
- **`TESTING_GUIDE.md`** - Testing methodology and Postman usage
- **`SystemTestingReport.md`** - Complete testing report (primary deliverable)

---

## GitHub Repository

**Repository:** [stqa-test-messenger-a1](https://github.com/MaheAlif/stqa-test-messenger-a1)

Contains:
- Complete source code
- Test documentation
- Evidence screenshots
- Automation tools
- Docker configuration

---

## Conclusion

This comprehensive system testing effort identified **24 defects** including **3 critical security vulnerabilities** that prevent production deployment. Our testing revealed significant gaps in:
- Input validation
- Authentication security
- Authorization enforcement
- Data integrity protection
- Error handling

The 31% test failure rate indicates substantial quality issues requiring immediate attention. We provide a prioritized roadmap (P0/P1/P2) for remediation, with P0 fixes essential before any production consideration.

---

## Contact

For questions or clarifications about this testing project, please contact any team member listed above.

**Completed:** January 12, 2026  
**Course:** Software Testing and Quality Assurance  
**Institution:** [Your Institution Name]
