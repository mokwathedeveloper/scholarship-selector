# Backend Documentation

This directory contains technical documentation for the backend of the applicant ranking system.

## Table of Contents

- [Project Setup](#project-setup)
- [Database Connection](#database-connection)
- [User Management](#user-management)
- [API Endpoints](#api-endpoints)
  - [/api/upload](#apiupload)
  - [/api/rank](#apirank)
- [Testing](#testing)
- [Quality Gates (SonarQube)](#quality-gates-sonarqube)

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

## API Endpoints

### /api/upload

**Endpoint**: `POST /api/upload`

**Description**: This endpoint is responsible for receiving and processing applicant data for ranking. It acts as the entry point for data ingestion into the system.

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
    "receivedData": { ... }
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
-   **Service**: `processApplicantData` in `src/services/uploadService.js` contains the core business logic for data handling. Currently, it's a placeholder for future data validation, transformation, and database storage logic.

**Future Enhancements**:

-   Implement actual file upload parsing (e.g., using `multer` for CSV/Excel files).
-   Add comprehensive data validation and error handling within the service layer.
-   Integrate with an `Applicant` model for database persistence.
-   Implement authentication and authorization for endpoint access.

### /api/rank

**Endpoint**: `POST /api/rank`

**Description**: This endpoint is responsible for ranking applicants based on specified criteria. It leverages AI-powered algorithms (to be implemented in the service layer) to provide a ranked list of applicants.

**Functionality**:

-   Receives ranking criteria (e.g., desired skills, GPA thresholds, experience levels).
-   Fetches relevant applicant data (from the database, once implemented).
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
-   **Service**: `performRanking` in `src/services/rankService.js` contains the core business logic for ranking. Currently, it returns dummy data and will be extended with actual ranking algorithms and database interactions.

**Future Enhancements**:

-   Integrate with a database to fetch real applicant data.
-   Implement sophisticated AI-powered ranking algorithms.
-   Add comprehensive validation for ranking criteria.
-   Implement authentication and authorization for endpoint access.

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