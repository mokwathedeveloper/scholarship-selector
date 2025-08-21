# Professional Guide to API Testing with Postman

This guide provides a professional workflow for testing the backend API of the scholarship-selector application using Postman.

## 1. Setting Up Postman

### 1.1. Create a Collection

A Postman Collection helps you organize your API requests.

1.  Open Postman and click on **Collections** in the left sidebar.
2.  Click the **+** icon to create a new collection.
3.  Name the collection "Scholarship Selector API".

### 1.2. Create an Environment

An Environment allows you to manage variables that are shared across multiple requests, such as the API base URL and authentication tokens.

1.  Click the **Environments** tab in the left sidebar.
2.  Click the **+** icon to create a new environment.
3.  Name the environment "Scholarship Selector - Dev".
4.  Add a variable named `baseURL` and set its initial value to `http://localhost:5000/api`.
5.  Save the environment.
6.  In the top right corner of Postman, select the "Scholarship Selector - Dev" environment from the dropdown menu.

## 2. Testing the Authentication Endpoints

### 2.1. User Registration (Sign Up)

Create a new request to test the user registration endpoint.

1.  In your "Scholarship Selector API" collection, click **Add a request**.
2.  Name the request "Register User".
3.  Set the request method to **POST**.
4.  Enter the request URL as `{{baseURL}}/auth/register`.
5.  Go to the **Body** tab and select **raw** and **JSON**.
6.  Enter the following JSON in the request body:

    ```json
    {
      "name": "Test User",
      "email": "testuser@example.com",
      "password": "password123",
      "role": "user"
    }
    ```

7.  Click **Send** to execute the request.

**Writing Tests for Registration:**

Go to the **Tests** tab and add the following JavaScript code to verify the response:

```javascript
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Response has user and token", function () {
    const responseData = pm.response.json();
    pm.expect(responseData).to.have.property('user');
    pm.expect(responseData).to.have.property('token');
});
```

### 2.2. User Login

Create a new request to test the user login endpoint.

1.  In your collection, create a new **POST** request named "Login User".
2.  URL: `{{baseURL}}/auth/login`.
3.  Body (raw, JSON):

    ```json
    {
      "email": "testuser@example.com",
      "password": "password123"
    }
    ```

**Writing Tests and Saving the Auth Token:**

Go to the **Tests** tab and add the following code. This will test the response and save the authentication token to an environment variable for use in subsequent requests.

```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has user and token", function () {
    const responseData = pm.response.json();
    pm.expect(responseData).to.have.property('user');
    pm.expect(responseData).to.have.property('token');
});

pm.test("Set auth token as environment variable", function () {
    const responseData = pm.response.json();
    if (responseData.token) {
        pm.environment.set("authToken", responseData.token);
    }
});
```

## 3. Testing Authenticated Endpoints

Now that you have an authentication token, you can test endpoints that require authentication.

### 3.1. Example: Ranking Applicants

1.  Create a new **POST** request named "Rank Applicants".
2.  URL: `{{baseURL}}/rank`.
3.  Go to the **Authorization** tab.
4.  Select **Bearer Token** from the **Type** dropdown.
5.  In the **Token** field, enter `{{authToken}}`. Postman will automatically replace this with the value from your environment.
6.  Go to the **Body** tab and provide the necessary criteria for ranking.

**Writing Tests for Authenticated Requests:**

```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has ranked applicants", function () {
    const responseData = pm.response.json();
    pm.expect(responseData).to.have.property('rankedApplicants');
});
```

## 4. Professional Workflow Summary

1.  **Organize:** Use collections to group related requests.
2.  **Parameterize:** Use environments and variables to avoid hardcoding values like URLs and tokens.
3.  **Automate:** Write tests for each request to verify its correctness automatically.
4.  **Chain Requests:** Extract data from one request's response (like an auth token) and use it in subsequent requests.
5.  **Document:** Use Postman's documentation features to describe your API and how to use it.

By following this guide, you can create a robust and professional testing workflow for your API, ensuring its quality and reliability.
