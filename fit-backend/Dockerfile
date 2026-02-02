# Use OpenJDK 17 with Maven
FROM maven:3.9.4-eclipse-temurin-17

# Set working directory
WORKDIR /app

# Copy source code
COPY . .

# Build the project
RUN ./mvnw clean package -DskipTests

# Run the Spring Boot app
CMD ["java", "-jar", "target/*.jar"]