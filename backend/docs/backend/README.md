# Backend Documentation

This directory contains technical documentation for the backend of the applicant ranking system.

## Table of Contents

- [Project Structure](#project-structure)
- [Project Setup](#project-setup)
- [Database Connection](#database-connection)
- [User Management](#user-management)
- [API Endpoints](#api-endpoints)
  - [/api/upload](#apiupload)
  - [/api/rank](#apirank)
- [Testing](#testing)
- [Quality Gates (SonarQube)](#quality-gates-sonarqube)

---

## Project Structure

```
backend/
│── src/
│   ├── config/         # Database and environment config
│   ├── controllers/    # Route handlers
│   ├── models/         # MongoDB schemas
│   ├── routes/         # Express routes
│   ├── services/       # Business logic
│   ├── utils/          # Helper functions
│   └── app.js          # Express app entry
│
│── tests/              # Unit & integration tests
│── .env.example        # Example env file
│── package.json
│── README.md
│── docs/
│    └── backend/       # Documentation files for backend
│── sonar-project.properties   # SonarQube configuration
```

---

## Project Setup

Details about setting up the backend project, including dependencies and environment variables.

---

## Database Connection

The backend connects to MongoDB using Mongoose. The connection logic is encapsulated in `src/config/db.js`.

### Configuration

The MongoDB connection URI is loaded from the `.env` file using the `MONGO_URI` environment variable. Ensure this variable is correctly set in your `.env` file.

Example `.env` entry:
```
MONGO_URI="mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority"
```

### Connection Process

1.  **`src/config/db.js`**: This file contains the `connectDB` asynchronous function responsible for establishing the connection.
    - It uses `mongoose.connect()` with `useNewUrlParser` and `useUnifiedTopology` options for compatibility.
    - Upon successful connection, it logs the host to the console.
    - In case of a connection error, it logs the error and exits the process.

2.  **`src/app.js`**: The main Express application file imports and calls `connectDB()` to initiate the database connection when the application starts.

### Error Handling

Robust error handling is implemented to catch connection failures. If the database connection fails, the application will log the error and terminate, preventing further operations without a database connection.

---

## User Management

The User schema defines the structure and validation rules for user data stored in MongoDB. It is located at `src/models/User.js`.

### Schema Definition

The `UserSchema` includes the following fields:

-   **`name`**: String, required. Represents the user's full name.
-   **`email`**: String, required, unique. Stores the user's email address and includes a regex for basic email format validation.
-   **`password`**: String, required. Stores the user's hashed password. Minimum length of 6 characters.
-   **`role`**: String, enum (`'user'`, `'admin'`), default `'user'`. Defines the user's role within the system.

### Validation

Each field has built-in Mongoose validation:

-   **Required Fields**: `name`, `email`, and `password` are marked as required.
-   **Unique Email**: The `email` field is set to be unique, preventing duplicate user registrations with the same email address.
-   **Email Format**: A regular expression is used to validate the format of the `email` address.
-   **Password Length**: The `password` field enforces a minimum length of 6 characters.
-   **Role Enumeration**: The `role` field is restricted to either `'user'` or `'admin'`.

### Timestamps

The schema is configured with `timestamps: true`, which automatically adds `createdAt` and `updatedAt` fields to each user document, recording when the user was created and last updated.

---

## Error Handling

Robust error handling is crucial for maintaining application stability and providing meaningful feedback. The backend implements a centralized error handling mechanism.

### Centralized Error Handling Middleware

-   **`errorHandler`**: Located in `src/middleware/errorMiddleware.js`, this middleware catches errors propagated from routes, controllers, and services.
    -   It sets the appropriate HTTP status code (defaults to 500 if not explicitly set).
    -   It sends a JSON response containing the error message and, in development environments, the stack trace for debugging.

### Asynchronous Handler Utility

-   **`asyncHandler`**: Located in `src/utils/asyncHandler.js`, this utility simplifies error handling for asynchronous Express route handlers.
    -   It wraps asynchronous functions, automatically catching any errors that occur and passing them to the Express error handling middleware (`errorHandler`).
    -   This eliminates the need for repetitive `try...catch` blocks in every asynchronous controller function.

### Usage

To use the `asyncHandler` utility, simply wrap your asynchronous controller functions:

```javascript
const someControllerFunction = asyncHandler(async (req, res) => {
  // Your asynchronous logic here
  // Any errors thrown will be caught by asyncHandler and passed to errorHandler
});
```

---

## Authentication and Authorization

Authentication is implemented using JSON Web Tokens (JWTs) to secure API endpoints. Authorization is handled through role-based access control.

### Authentication Flow

1.  **User Registration**: Users register with their name, email, and password via `POST /api/auth/register`.
2.  **User Login**: Registered users log in with their email and password via `POST /api/auth/login`.
3.  **JWT Generation**: Upon successful login, a JWT is issued to the user. This token must be included in subsequent requests to protected routes.

### Protecting Routes

-   **`protect` Middleware**: Located in `src/middleware/authMiddleware.js`, this middleware verifies the JWT provided in the `Authorization` header of incoming requests.
    -   If the token is valid, the user's information is attached to the `req.user` object, and the request proceeds.
    -   If the token is missing or invalid, the request is denied with a `401 Unauthorized` status.

### Role-Based Authorization

-   **`authorize` Middleware**: Also in `src/middleware/authMiddleware.js`, this middleware checks if the authenticated user's role is permitted to access a specific route.
    -   It takes a list of allowed roles as arguments.
    -   If the user's role is not in the allowed list, the request is denied with a `403 Forbidden` status.

### Usage

To protect an Express route, simply include the `protect` middleware:

```javascript
router.post('/', protect, controller.someFunction);
```

To add role-based authorization, include the `authorize` middleware with the required roles:

```javascript
router.post('/', protect, authorize('admin'), controller.adminFunction);
```

---

## API Endpoints

All API endpoints are protected by authentication middleware. Requests to these endpoints must include a valid JWT in the `Authorization` header (e.g., `Bearer <token>`).

### /api/auth

**Description**: Handles user authentication, including registration and login.

**Endpoints**:

-   **`POST /api/auth/register`**:
    -   **Description**: Registers a new user.
    -   **Access**: Public
    -   **Request Body (JSON)**:
        ```json
        {
          "name": "John Doe",
          "email": "john.doe@example.com",
          "password": "password123",
          "role": "user" // Optional, defaults to 'user'
        }
        ```
    -   **Response (Success - 201 Created)**:
        ```json
        {
          "message": "User registered successfully",
          "user": {
            "_id": "<user_id>",
            "name": "John Doe",
            "email": "john.doe@example.com",
            "role": "user"
          },
          "token": "<jwt_token>"
        }
        ```

-   **`POST /api/auth/login`**:
    -   **Description**: Authenticates a user and returns a JWT.
    -   **Access**: Public
    -   **Request Body (JSON)**:
        ```json
        {
          "email": "john.doe@example.com",
          "password": "password123"
        }
        ```
    -   **Response (Success - 200 OK)**:
        ```json
        {
          "message": "User logged in successfully",
          "user": {
            "_id": "<user_id>",
            "name": "John Doe",
            "email": "john.doe@example.com",
            "role": "user"
          },
          "token": "<jwt_token>"
        }
        ```

### /api/upload

**Endpoint**: `POST /api/upload`

**Description**: This endpoint is responsible for receiving and processing applicant data for ranking. It acts as the entry point for data ingestion into the system.

**Access**: Private (requires authentication)

**Functionality**:

-   Receives applicant data, typically in a structured format (e.g., JSON, or to be extended for file uploads like CSV/Excel).
-   Delegates data processing to the `uploadService` for validation, transformation, and storage.
-   Returns a success or error response based on the processing outcome.

**Request Body (Example - JSON)**:

```json
{
  "applicants": [
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "gpa": 3.8,
      "experience": 2,
      "skills": ["JavaScript", "Node.js"]
    },
    {
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "gpa": 3.9,
      "experience": 3,
      "skills": ["Python", "Machine Learning"]
    }
  ]
}
```

**Response (Success - 200 OK)**:

```json
{
  "message": "Data uploaded successfully",
  "result": {
    "success": true,
    ""savedCount": 2,
    "savedApplicants": [ { ... }, { ... } ]
  }
}
```

**Response (Error - 500 Internal Server Error)**:

```json
{
  "message": "Server Error",
  "error": "Error details..."
}
```

**Implementation Details**:

-   **Route**: Defined in `src/routes/uploadRoutes.js`.
-   **Controller**: `uploadApplicantData` in `src/controllers/uploadController.js` handles the request and response.
-   **Service**: `processApplicantData` in `src/services/uploadService.js` contains the core business logic for data handling.

**Future Enhancements**:

-   Implement actual file upload parsing (e.g., using `multer` for CSV/Excel files).
-   Add comprehensive data validation and error handling within the service layer.
-   Implement authorization based on user roles.

### /api/rank

**Endpoint**: `POST /api/rank`

**Description**: This endpoint is responsible for ranking applicants based on specified criteria. It leverages AI-powered algorithms (to be implemented in the service layer) to provide a ranked list of applicants.

**Access**: Private (requires authentication)

**Functionality**:

-   Receives ranking criteria (e.g., desired skills, GPA thresholds, experience levels).
-   Fetches relevant applicant data (from the database).
-   Applies ranking logic to score and sort applicants.
-   Returns a ranked list of applicants.

**Request Body (Example - JSON)**:

```json
{
  "criteria": {
    "minGpa": 3.5,
    "requiredSkills": ["Python", "Machine Learning"],
    "minExperience": 2
  }
}
```

**Response (Success - 200 OK)**:

```json
{
  "message": "Applicants ranked successfully",
  "rankedApplicants": [
    {
      "id": "app1",
      "name": "Applicant A",
      "score": 95
    },
    {
      "id": "app2",
      "name": "Applicant B",
      "score": 88
    }
  ]
}
```

**Response (Error - 500 Internal Server Error)**:

```json
{
  "message": "Server Error",
  "error": "Error details..."
}
```

**Implementation Details**:

-   **Route**: Defined in `src/routes/rankRoutes.js`.
-   **Controller**: `rankApplicants` in `src/controllers/rankController.js` handles the request and response.
-   **Service**: `performRanking` in `src/services/rankService.js` contains the core business logic for ranking.

**Future Enhancements**:

-   Implement sophisticated AI-powered ranking algorithms.
-   Add comprehensive validation for ranking criteria.
-   Implement authorization based on user roles.

---

## Testing

This section outlines the testing strategy and how to run tests for the backend application.

### Framework

**Jest** is used as the primary testing framework for both unit and integration tests.

### Configuration

Jest is configured via `backend/jest.config.js` to load environment variables using `dotenv/config` before tests run, ensuring that database connections and other environment-dependent settings are correctly picked up.

### Running Tests

To run all tests, navigate to the `backend/` directory and execute the following command:

```bash
npm test
```

This command is configured in `package.json` to run Jest with options to detect open handles and force exit, which helps in cleaning up resources after tests, especially database connections.

### Test Types

1.  **Unit Tests**:
    -   Located in `backend/tests/unit/`.
    -   Focus on testing individual components in isolation (ee.g., Mongoose models, helper functions).
    -   Example: `user.test.js` tests the `User` model's schema validation.

2.  **Integration Tests**:
    -   Located in `backend/tests/integration/`.
    -   Focus on testing the interaction between different components (e.g., API endpoints, controllers, services).
    -   Examples: `upload.test.js` and `rank.test.js` test the `/api/upload` and `/api/rank` endpoints respectively, using `supertest` to simulate HTTP requests.

### Database for Testing

Tests that interact with the database connect to a MongoDB instance. The connection URI is typically loaded from the `MONGO_URI` environment variable. For testing, it's recommended to use a dedicated test database to avoid data corruption in development or production environments.

**Important Note on MongoDB Authentication**: If you encounter `MongoServerError: Command requires authentication` during testing, ensure that the MongoDB user specified in your `MONGO_URI` has the necessary read and write permissions on the test database. This is an external MongoDB configuration that needs to be set up in your MongoDB Atlas (or self-hosted MongoDB) account.

### Test Coverage (Future Enhancement)

Test coverage reports can be generated to identify areas of the codebase that are not adequately tested. This will be configured and documented in a future iteration.

---

## Quality Gates (SonarQube)

Guidelines and information regarding SonarQube quality checks and how to ensure code compliance.

### Running SonarQube Analysis

To run a SonarQube analysis, navigate to the project root directory and execute the following command:

```bash
sonar-scanner
```

Ensure you have the SonarQube Scanner CLI installed and configured. The analysis will use the `sonar-project.properties` file located in the project root for configuration.

### Quality Gate Compliance

All new code and modifications must comply with the quality gates defined in SonarQube. This includes:

-   **Code Smells**: Adherence to coding best practices and maintainability.
-   **Bugs**: Absence of critical and major bugs.
-   **Vulnerabilities**: No security vulnerabilities introduced.
-   **Duplication**: Minimizing code duplication.
-   **Coverage**: Maintaining a high level of test coverage (once configured).

Regularly running SonarQube analysis is crucial to ensure code quality and adherence to project standards.