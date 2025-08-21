# Testing Feature Documentation

This document details the setup and implementation of testing for the Scholarship Selector frontend application using Jest and React Testing Library.

## Libraries Used:

- **Jest**: A JavaScript Testing Framework for unit and integration testing.
- **React Testing Library (@testing-library/react)**: A set of utilities for testing React components in a way that resembles how users interact with them.
- **jest-environment-jsdom**: A Jest environment that provides a browser-like environment for testing React components.
- **@testing-library/jest-dom**: Provides custom Jest matchers for DOM elements.

## Setup Details:

1.  **Dependencies Installation:**
    - Jest and React Testing Library related packages were added as `devDependencies` in `frontend/package.json`.

2.  **Jest Configuration (`jest.config.js`):**
    - `jest.config.js` was created in the `frontend` root directory.
    - It uses `next/jest` to correctly configure Jest for a Next.js project.
    - `setupFilesAfterEnv` is configured to include `jest.setup.js`.
    - `testEnvironment` is set to `jest-environment-jsdom`.
    - `moduleNameMapper` is configured to handle module aliases used in the `src` directory.
    - `testPathIgnorePatterns` and `collectCoverageFrom` are configured for better test management and coverage reporting.

3.  **Jest Setup File (`jest.setup.js`):**
    - `jest.setup.js` was created in the `frontend` root directory.
    - It imports `@testing-library/jest-dom` to extend Jest's `expect` assertions with custom DOM matchers.

4.  **`package.json` Scripts:**
    - A `test` script was added to `frontend/package.json` to run Jest: `"test": "jest --watchAll"`.

## Test Implementation:

### Unit Tests (Components):

- **`Navbar.test.js`**: Tests the rendering of the navigation bar, brand name, and correct links.
- **`Footer.test.js`**: Tests the rendering of the copyright text with the current year.
- **`ApplicantCard.test.js`**: Tests the correct rendering of applicant details and the avatar.

### Integration Tests (Pages):

- **`upload.test.js`**: Tests the `Upload` page functionality, including form rendering, file selection, successful API calls on submission, and error handling.
- **`rank.test.js`**: Tests the `Rank` page functionality, including loading states, successful data fetching and display, error message rendering, and handling of empty data.

## Running Tests:

To run all frontend tests, navigate to the `frontend` directory and execute:

```bash
npm test
```

This command will run Jest in watch mode, re-running tests when files change.
