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

Documentation for the `/api/rank` endpoint, including request/response formats and ranking logic.

---

## Testing

Information about unit and integration tests, how to run them, and test coverage.

---

## Quality Gates (SonarQube)

Guidelines and information regarding SonarQube quality checks and how to ensure code compliance.