# Role-Based Access Control (RBAC) Implementation

This document outlines the implementation of role-based access control (RBAC) in the Scholarship Selector project, separating functionalities for 'User' and 'Admin' roles.

## 1. Backend Implementation

### User Model (`backend/src/models/User.ts`)
- The `User` Mongoose schema and `IUser` interface already include a `role` field, which is an enum of `'user'` or `'admin'` with a default value of `'user'`.

### Authentication Service (`backend/src/services/authService.ts`)
- The `generateToken` function has been modified to include the user's `role` in the JWT payload.
- The `register` and `login` functions now pass the user's `role` to the `generateToken` function when creating a new JWT.

### Authentication Middleware (`backend/src/middleware/authMiddleware.ts`)
- The `protect` middleware has been updated to correctly type the decoded JWT payload (`JwtPayload` interface) and the `req.user` property (`IUser` type).
- The existing `authorize` middleware is used to restrict access to routes based on the user's role(s).

### Role-Specific Routes and Controllers
- **User Routes:**
  - `backend/src/controllers/userController.ts`: Contains logic for user-specific actions (e.g., `getUserProfile`).
  - `backend/src/routes/userRoutes.ts`: Defines routes for user-only access (e.g., `GET /api/user/profile`). These routes are protected by `protect` and `authorize(['user', 'admin'])` middleware, allowing both roles to access their own profile.
- **Admin Routes:**
  - `backend/src/controllers/adminController.ts`: Contains logic for admin-specific actions (e.g., `getAllUsers`).
  - `backend/src/routes/adminRoutes.ts`: Defines routes for admin-only access (e.g., `GET /api/admin/users`). These routes are protected by `protect` and `authorize(['admin'])` middleware.

### Application Integration (`backend/src/app.ts`)
- The main Express application (`app.ts`) now imports and uses the `userRoutes` and `adminRoutes` under `/api/user` and `/api/admin` respectively.

## 2. Frontend Implementation

### Centralized Navigation Links (`frontend/src/components/NavLinks.tsx`)
- A new file `NavLinks.tsx` has been created to centralize the main navigation links as an array of objects. This ensures consistency between the Navbar and Footer.

### User Dashboard (`frontend/src/pages/user/dashboard.tsx`)
- A placeholder page for the User Dashboard has been created. This page will serve as the landing point for authenticated users.

### Admin Dashboard (`frontend/src/pages/admin/dashboard.tsx`)
- A placeholder page for the Admin Dashboard has been created. This page will serve as the landing point for authenticated administrators.

### Navigation Bar (`frontend/src/components/Navbar.tsx`)
- The Navbar component has been updated to dynamically display links based on the user's authentication status and role.
- It imports `isAuthenticated`, `getUserRole`, and `logout` from `../utils/auth.ts`.
- It uses React's `useState` and `useEffect` hooks to manage the login state and user role, updating them on component mount and `localStorage` changes.
- Conditional rendering is applied to show:
  - Dashboard links (`/user/dashboard` or `/admin/dashboard`) and a Logout button if the user is logged in.
  - Login and Register links if the user is not logged in.

### Authentication Utilities (`frontend/src/utils/auth.ts`)
- A new utility file `auth.ts` has been created to handle client-side authentication logic:
  - `getToken()`: Retrieves JWT from `localStorage`.
  - `getDecodedToken()`: Decodes the JWT using `jwt-decode` and checks for expiration.
  - `isAuthenticated()`: Checks if a valid, non-expired token exists.
  - `getUserRole()`: Extracts the user's role from the decoded token.
  - `logout()`: Removes the token from `localStorage`.

## 3. Best Practices
- Clear folder structures (`/frontend/src/pages/user/`, `/frontend/src/pages/admin/`, etc.) have been maintained.
- Comments have been added in the code explaining new logic.
- The `README.md` file has not been touched.

## Usage

To test the role-based access control:

1.  **Register a user:**
    - Make a POST request to `/api/auth/register` with `name`, `email`, `password`.
    - By default, this user will have the `user` role.

2.  **To create an admin user (for testing):**
    - You would typically have a separate admin registration process or manually update a user's role in the database. For development, you can temporarily modify the `register` function in `backend/src/services/authService.ts` to allow setting `role: 'admin'` during registration, or directly modify a user's role in your MongoDB database.

3.  **Login:**
    - Make a POST request to `/api/auth/login` with `email` and `password`.
    - The response will include a JWT token.

4.  **Access Protected Routes:**
    - Include the JWT in the `Authorization` header as `Bearer <token>`.
    - **User Profile:** `GET /api/user/profile` (accessible by 'user' and 'admin').
    - **Admin Users List:** `GET /api/admin/users` (accessible only by 'admin').

5.  **Frontend Navigation:**
    - After logging in, the Navbar will dynamically update to show either the 'Dashboard' link (for 'user' role) or the 'Admin' link (for 'admin' role), along with a 'Logout' button.
    - Attempting to manually navigate to `/user/dashboard` or `/admin/dashboard` without the correct role will be handled by frontend routing (to be implemented) or backend protection.
