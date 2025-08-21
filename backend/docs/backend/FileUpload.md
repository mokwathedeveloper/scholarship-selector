# File Upload Feature (Backend)

This document outlines the implementation of the file upload and parsing functionality on the backend.

## Overview

The backend provides an API endpoint (`POST /api/upload`) to receive uploaded files (primarily CSV format) containing applicant data. This data is then parsed, validated, and saved to the database.

## Technologies Used

*   **Multer:** Middleware for handling `multipart/form-data`, which is primarily used for uploading files.
*   **csv-parser:** A streaming CSV parser that transforms CSV text into JavaScript objects.

## Implementation Details

### 1. File Storage (`uploads/` directory)

Uploaded files are temporarily stored in the `uploads/` directory within the project root. This directory is created if it doesn't exist.

### 2. Multer Configuration (`src/routes/uploadRoutes.js`)

Multer is configured to handle file storage.
*   `destination`: Specifies the directory where the uploaded files will be stored (`uploads/`).
*   `filename`: Defines how the files will be named to prevent collisions, using a timestamp and the original file extension.

### 3. Upload Route (`POST /api/upload` in `src/routes/uploadRoutes.js`)

The `/api/upload` endpoint is a `POST` route that uses Multer as middleware (`upload.single('file')`). This middleware processes the incoming file and makes its information available in `req.file`.

### 4. Controller Logic (`src/controllers/uploadController.js`)

The `uploadApplicantData` controller function handles the uploaded file:
*   **File Presence Check:** It first checks if a file was uploaded (`req.file`). If not, it returns a `400 Bad Request` error.
*   **CSV Parsing:** It calls `uploadService.parseCsvFile(req.file.path)` to parse the temporary CSV file.
*   **Data Processing:** The parsed JSON data is then passed to `uploadService.processApplicantData({ applicants: parsedData })` for validation and saving to the database.
*   **Response:** On success, it returns a `200 OK` response with a success message and the processing result.
*   **Error Handling:** A `try...catch` block ensures that any errors during parsing or processing are caught and passed to the global error handling middleware.

### 5. Service Logic (`src/services/uploadService.js`)

*   **`parseCsvFile(filePath)`:**
    *   This new function takes the path to the uploaded CSV file.
    *   It uses `fs.createReadStream` to read the file and pipes it through `csv-parser`.
    *   It collects all parsed rows as JSON objects into an array.
    *   It returns a Promise that resolves with the array of parsed applicant data or rejects with an error.
*   **`processApplicantData(data)`:**
    *   This function now expects an object with an `applicants` array (the output from `parseCsvFile`).
    *   **Data Validation:** It validates if the `applicants` array is present and not empty. If not, it throws a `400 Bad Request` error.
    *   **Saving to Database:** It iterates through each applicant object and attempts to save it to the `Applicant` MongoDB collection.
    *   **Error Collection:** It collects errors for individual applicant saves (e.g., due to validation failures) and returns them in the response, allowing for partial success scenarios.

## Error Handling

*   **400 Bad Request:** Returned if no file is uploaded or if the provided data format is invalid (e.g., missing `applicants` array).
*   **500 Internal Server Error:** Handled by the global `errorMiddleware` for any unhandled exceptions during file processing or database operations. Detailed stack traces are provided in development mode.

## Future Enhancements

*   Support for other file formats (e.g., JSON, Excel, PDF).
*   More robust validation of individual applicant data fields.
*   Asynchronous processing of large files to prevent timeouts.
*   Integration with a job queue for background processing.
