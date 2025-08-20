# Applicant Ranking System - Backend

This repository contains the backend for the AI-powered applicant ranking system.

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

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd applicant-ranking-backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the `backend/` directory based on `.env.example` and fill in your environment variables.

4.  **Run the application:**
    ```bash
    npm start
    ```

## Documentation

Refer to the `docs/backend/` directory for detailed technical documentation on various features and modules.