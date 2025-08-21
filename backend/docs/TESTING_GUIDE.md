# How to Test the Backend

This document outlines the strategy and best practices for testing the backend of the scholarship-selector application.

## 1. Introduction to Backend Testing

Backend testing focuses on verifying the server-side logic, database interactions, and API endpoints. The goal is to ensure the backend is reliable, performant, and secure.

We use a combination of testing strategies to achieve comprehensive test coverage:

- **Unit Testing:** Testing individual components (e.g., a single function or service) in isolation.
- **Integration Testing:** Testing how multiple components work together (e.g., a controller and a service, or a service and the database).
- **End-to-End (E2E) Testing:** Testing the entire application flow from the API endpoint to the database and back.

## 2. Tooling

Our testing stack consists of:

- **Jest:** A delightful JavaScript Testing Framework with a focus on simplicity.
- **Supertest:** A library for testing Node.js HTTP servers, allowing us to make requests to our API endpoints.
- **mongodb-memory-server:** An in-memory MongoDB server that allows us to run tests without connecting to a real database.

## 3. Unit Testing

Unit tests are the foundation of our testing strategy. They are fast, easy to write, and help us pinpoint bugs in specific components.

**What to test:**

- Service functions (e.g., `authService.js`, `rankService.js`)
- Utility functions
- Models (e.g., validation rules)

**Example (`tests/unit/authService.test.js`):**

```javascript
describe('Auth Service', () => {
  it('should register a new user', async () => {
    // ... test implementation
  });

  it('should throw an error if user already exists', async () => {
    // ... test implementation
  });
});
```

## 4. Integration Testing

Integration tests ensure that different parts of our application work together as expected.

**What to test:**

- API endpoints (e.g., `authRoutes.js`, `rankRoutes.js`)
- Interactions between services and the database

**Example (`tests/integration/rank.test.js`):**

```javascript
const request = require('supertest');
const app = require('../../src/app'); // our express app

describe('POST /api/rank', () => {
  it('should return a ranked list of applicants', async () => {
    const res = await request(app)
      .post('/api/rank')
      .send({
        // ... criteria
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('rankedApplicants');
  });
});
```

## 5. Running the Tests

To run all tests, use the following command from the `backend` directory:

```bash
npm test
```

This command will execute all files ending in `.test.js` in the `tests` directory.

## 6. Best Practices

- **Write clean and readable tests:** Use clear descriptions and assertions.
- **Test one thing at a time:** Each test should focus on a single piece of functionality.
- **Use a consistent naming convention:** For example, `[component-name].test.js`.
- **Isolate tests:** Use `beforeEach` and `afterEach` hooks to set up and tear down the test environment, ensuring that tests do not interfere with each other.
- **Aim for high test coverage:** While 100% coverage is not always practical, we should strive to test all critical paths in our application.
