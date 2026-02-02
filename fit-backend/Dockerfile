# Stage 1: Build the JAR
FROM eclipse-temurin:17-jdk AS build

WORKDIR /app

# Copy Maven wrapper and pom.xml first
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Copy source code
COPY src src

# Build the project
RUN ./mvnw clean package -DskipTests

# Stage 2: Run the JAR
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]