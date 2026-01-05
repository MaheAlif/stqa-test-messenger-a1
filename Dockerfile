# Use Eclipse Temurin JDK 17 (official OpenJDK distribution)
FROM eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Copy Gradle wrapper and configuration files
COPY gradlew .
COPY gradlew.bat .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# Copy source code
COPY src src

# Make gradlew executable
RUN chmod +x gradlew

# Build the application (this caches dependencies in Docker layer)
RUN ./gradlew build -x test --no-daemon

# Expose port 8080
EXPOSE 8080

# Run the application
CMD ["./gradlew", "bootRun", "--no-daemon"]
