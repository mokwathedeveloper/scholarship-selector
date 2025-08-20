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

Details about the User schema, validation, and user-related operations.

---

## API Endpoints

### /api/upload

Documentation for the `/api/upload` endpoint, including request/response formats and functionality.

### /api/rank

Documentation for the `/api/rank` endpoint, including request/response formats and ranking logic.

---

## Testing

Information about unit and integration tests, how to run them, and test coverage.

---

## Quality Gates (SonarQube)

Guidelines and information regarding SonarQube quality checks and how to ensure code compliance.