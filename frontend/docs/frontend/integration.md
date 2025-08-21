# Integration Feature Documentation

This document details the integration of the frontend with the backend APIs for the Scholarship Selector application.

## Libraries Used:

- **Axios**: A promise-based HTTP client for the browser and Node.js, used for making API requests.

## Components Implemented/Modified:

- `package.json`: Added `axios` as a dependency.
- `api.js` (service): Created functions to interact with the backend API endpoints.
- `upload.js` (page): Modified to send uploaded files to the backend.
- `rank.js` (page): Modified to fetch ranked applicants from the backend.

## Implementation Details:

1.  **`axios` Integration:**
    - `axios` was added to `package.json` as a project dependency.

2.  **`api.js` Service:**
    - A new `api.js` file was created in `src/services/`.
    - It exports two main functions:
        - `uploadApplicants(file)`: Takes a `File` object, creates `FormData`, and sends a POST request to the `/upload` endpoint. It handles `multipart/form-data` content type.
        - `getRankedApplicants()`: Sends a GET request to the `/rank` endpoint to retrieve the list of ranked applicants.
    - A base URL for the API is configured using `process.env.NEXT_PUBLIC_API_BASE_URL` for flexibility, defaulting to `http://localhost:5000/api`.
    - Basic error handling is included to catch and re-throw API response errors.

3.  **`upload.js` Page Update:**
    - The `upload.js` page was updated to use the `uploadApplicants` function from `api.js`.
    - It now includes state variables for `loading` (to show upload progress), `message` (for success/error feedback), and `isError`.
    - The `handleSubmit` function is now asynchronous and calls `uploadApplicants`.
    - Visual feedback (loading state, success/error messages) is provided to the user during the upload process.

4.  **`rank.js` Page Update:**
    - The `rank.js` page was updated to use the `getRankedApplicants` function from `api.js`.
    - It uses `useEffect` to fetch data when the component mounts.
    - State variables for `loading` and `error` are introduced to manage data fetching states.
    - Conditional rendering is implemented to show loading messages, error messages, or the list of ranked applicants.

## Usage:

- The `/upload` page now sends the selected file to the backend for processing.
- The `/rank` page dynamically fetches and displays the ranked applicant data from the backend.

This integration establishes the communication layer between the frontend and backend, making the application fully functional.
