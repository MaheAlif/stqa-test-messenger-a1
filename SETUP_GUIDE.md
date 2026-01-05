# Messenger API - Setup Guide

This guide will help you set up and run the Messenger API project on your local machine.

## Quick Start with Docker (Recommended) 🐳

**The easiest and most reliable way to run this project:**

### Prerequisites
- Docker Desktop installed ([Download here](https://www.docker.com/products/docker-desktop))

### Run in One Command

```bash
docker-compose up
```

That's it! The application will:
1. Build with the correct Java 17 environment
2. Download all dependencies
3. Start the API server on http://localhost:8080

### Test the API

```bash
curl http://localhost:8080/health
```

### Stop the Application

Press `Ctrl+C` in the terminal, or run:

```bash
docker-compose down
```

---

## Alternative: IntelliJ IDEA

**If you prefer using an IDE:**

1. **Open IntelliJ IDEA**
2. **Open the project:** File → Open → Select the project folder
3. **Wait for IntelliJ to sync:** It will automatically download Gradle and all dependencies
4. **Run the application:** 
   - Navigate to `src/main/java/com/ezmata/messenger/MessengerApplication.java`
   - Right-click and select "Run 'MessengerApplication'"
5. **Test:** Open browser to http://localhost:8080/health

---

## Prerequisites

### Required Software

1. **Java Development Kit (JDK) 17 or higher**
   - Check if Java is installed: `java -version`
   - Download from: https://www.oracle.com/java/technologies/downloads/
   - Or use OpenJDK: https://adoptium.net/

2. **Gradle** (Optional - can use Gradle wrapper)
   - Download from: https://gradle.org/install/
   - Or use the Gradle wrapper included in the project (recommended)

## Setup Instructions

### Step 1: Verify Java Installation

Open a terminal/command prompt and run:

```bash
java -version
```

You should see output showing Java 17 or higher. Example:
```
java version "17.0.x" or higher
```

### Step 2: Clone/Download the Project

If you haven't already, download or clone the project to your local machine.

```bash
cd c:\Users\mahee\OneDrive\Documents\Semester-12\STQA\stqa-test-messenger
```

### Step 3: Set Up Gradle Wrapper (If Missing)

If the Gradle wrapper jar is missing, you'll need to either:

**Option A: Install Gradle locally and regenerate wrapper**

1. Install Gradle from https://gradle.org/install/
2. Navigate to project directory
3. Run: `gradle wrapper`

**Option B: Download Gradle wrapper manually**

1. Create the directory: `gradle\wrapper`
2. Download gradle-wrapper.jar from the Gradle distribution
3. Place it in `gradle\wrapper\`

**Option C: Use IntelliJ IDEA (Recommended)**

1. Open the project in IntelliJ IDEA
2. IntelliJ will automatically download Gradle and dependencies
3. Wait for the indexing to complete

### Step 4: Build the Project

#### On Windows:

```bash
.\gradlew.bat clean build
```

#### On Linux/Mac:

```bash
./gradlew clean build
```

This will:
- Download all required dependencies
- Compile the source code
- Run tests
- Create a JAR file in `build/libs/`

### Step 5: Run the Application

#### Using Gradle:

**Windows:**
```bash
.\gradlew.bat bootRun
```

**Linux/Mac:**
```bash
./gradlew bootRun
```

#### Using IntelliJ IDEA:

1. Open the project in IntelliJ IDEA
2. Navigate to `src/main/java/com/ezmata/messenger/MessengerApplication.java`
3. Right-click and select "Run 'MessengerApplication'"

#### Using the JAR file:

After building the project, you can run the JAR directly:

```bash
java -jar build/libs/messenger-0.0.1-SNAPSHOT.jar
```

### Step 6: Verify the Application is Running

Once the application starts, you should see output indicating the server is running on port 8080.

Test the health endpoint:

```bash
curl http://localhost:8080/health
```

Or open in a browser:
```
http://localhost:8080/health
```

Expected response:
```json
{
  "message": "Service is up and running",
  "data": null
}
```

## Configuration

### Changing the Port

If port 8080 is already in use, you can change it in `src/main/resources/application.properties`:

```properties
server.port=8081
```

## Common Issues and Troubleshooting

### Issue 1: Gradle Wrapper JAR Missing

**Error:** `Unable to access jarfile ...\gradle\wrapper\gradle-wrapper.jar`

**Solution:** Use one of the options in Step 3 above, or open the project in IntelliJ IDEA.

### Issue 2: Java Version Mismatch

**Error:** `Unsupported class file major version XX`

**Solution:** Ensure you have Java 17 or higher installed and set as your JAVA_HOME.

### Issue 3: Port Already in Use

**Error:** `Port 8080 was already in use`

**Solution:** 
- Stop the application using port 8080
- Or change the port in `application.properties` (see Configuration section)

### Issue 4: Permission Denied (Linux/Mac)

**Error:** `Permission denied` when running `./gradlew`

**Solution:** Make the gradlew script executable:
```bash
chmod +x gradlew
```

## Project Structure

```
stqa-test-messenger/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/ezmata/messenger/
│   │   │       ├── MessengerApplication.java    # Main application class
│   │   │       ├── controller/                   # REST controllers
│   │   │       ├── model/                        # Domain models
│   │   │       ├── repository/                   # Data repositories
│   │   │       ├── service/                      # Business logic
│   │   │       └── security/                     # Security & JWT
│   │   └── resources/
│   │       └── application.properties            # Configuration
│   └── test/
│       └── java/                                 # Test files
├── build.gradle                                  # Gradle build configuration
├── gradlew                                       # Gradle wrapper (Linux/Mac)
├── gradlew.bat                                   # Gradle wrapper (Windows)
└── Documentation.md                              # API documentation
```

## Next Steps

1. **Review the API Documentation:** See [Documentation.md](Documentation.md) for detailed API endpoints and usage
2. **Test the APIs:** Use tools like Postman, curl, or REST clients to interact with the API
3. **Explore the Code:** Navigate through the controllers, services, and models to understand the implementation

## API Quick Start

### 1. Create a User (Signup)

```bash
curl -X POST http://localhost:8080/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","email":"alice@test.com","password":"1234"}'
```

### 2. Login

```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"1234"}'
```

Save the returned JWT token for authenticated requests.

### 3. Test Authenticated Endpoint

```bash
curl -X GET http://localhost:8080/auth/test \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Stopping the Application

- **If running with Gradle:** Press `Ctrl+C` in the terminal
- **If running in IntelliJ:** Click the red stop button in the Run window

## Additional Resources

- **Spring Boot Documentation:** https://spring.boot.io/
- **Gradle Documentation:** https://docs.gradle.org/
- **JWT Documentation:** https://jwt.io/

## Support

For issues related to:
- **API Behavior:** Refer to [Documentation.md](Documentation.md)
- **Project Setup:** Check the Troubleshooting section above
- **Assignment Questions:** Refer to [Readme.md](Readme.md)

---

**Last Updated:** January 2026  
**Project:** STQA Messenger API Testing Assignment
