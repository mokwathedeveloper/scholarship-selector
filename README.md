# NaijaTalentRank

## AI-Driven Applicant Selection Tool

**Goal:** Rank applicants for LSETF/PLP programs using structured criteria + AI extraction, with auditability, fairness, and LMS integration readiness.

---

## 1) Product Framing

*   **Problem:** Reviewers drown in resumes, written answers, and assessments; manual scoring is slow and inconsistent.
*   **Solution:** A platform that **extracts** signals from applicant data, **scores** them against program criteria, and **ranks** candidates with **transparent explanations**, bias checks, and one-click export to the LMS.
*   **Why we win:** Fast, accurate, auditable, and easy to integrate. Designed for **scale**, **multi-program reuse**, and **Nigerian context** (local skills/qualifications, NYSC, polytechnic/university equivalence, bootcamps).

---

## 2) System Architecture (TypeScript-first)

This project is structured as a monorepo using Turborepo.

```
apps/
  web/            # Next.js 14 (App Router), Tailwind, shadcn/ui
  api/            # Express + Zod, background jobs (BullMQ)
packages/
  core/           # shared types, scoring, feature engineering
  ai/             # LLM adapters (OpenAI/Gemini/Azure), prompt templates
  db/             # Mongoose models & repositories
  config/         # env schema (zod) + runtime config
infra/
  docker/         # Dockerfiles + Compose
```

**Data layer:** MongoDB Atlas (or local MongoDB via Docker Compose) with:

*   **Collections:** `applicants`, `programs`, `criteria`, `evaluations`, `rankings`, `audits`.
*   **Vector Search:** store text embeddings (`resumeEmbedding`, `answersEmbedding`) for semantic matching.
*   **Change streams:** trigger re-ranking on updates.

**AI layer (provider-agnostic):**

*   **Extraction:** LLM parses resume/answers → normalized fields (skills, edu, years, certifications).
*   **Embeddings:** text chunks → `text-embedding-3-large` or equivalent; abstracted behind `IAIProvider`.
*   **Safety:** No PII beyond what’s provided; redact/ignore sensitive attributes for scoring.

**Job queue:** BullMQ + Redis for async ingestion & batch scoring.

**Auth:** Admin (reviewers) with OAuth (Google/Microsoft) + role-based access; **no applicant login** needed for prototype.

---

## 3) Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm (v8 or higher)
*   Docker and Docker Compose (for local development with services)

### Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd naijatalentrank
    ```
2.  **Install root dependencies:**
    ```bash
    npm install
    ```
3.  **Install workspace dependencies:**
    ```bash
    npm install --workspace apps/web
    npm install --workspace apps/api
    npm install --workspace packages/db
    npm install --workspace packages/core
    npm install --workspace packages/ai
    npm install --workspace packages/config
    ```
    *(Note: `npm install` at the root should ideally handle all workspace dependencies, but explicit installs ensure all are present.)*

### Running the Project (Local Development)

#### Option 1: Using Docker Compose (Recommended for full stack)

1.  **Build and run services:**
    ```bash
    docker-compose up --build
    ```
    This will start the `api`, `web`, `mongo`, and `redis` services.

2.  **Access the applications:**
    *   API: `http://localhost:3001`
    *   Web: `http://localhost:3000`

#### Option 2: Running Services Individually (for specific development)

**Backend API:**

1.  **Navigate to the API directory:**
    ```bash
    cd apps/api
    ```
2.  **Set up environment variables:**
    Create a `.env` file in `apps/api` with:
    ```
    PORT=3001
    REDIS_HOST=localhost
    REDIS_PORT=6379
    MONGO_URI=mongodb://localhost:27017/naijatalentrank
    ```
    *(Note: Ensure you have a local MongoDB and Redis instance running, or adjust `MONGO_URI` and `REDIS_HOST` to point to your services.)*
3.  **Start the API:**
    ```bash
    npm run dev
    ```

**Frontend Web:**

1.  **Navigate to the Web directory:**
    ```bash
    cd apps/web
    ```
2.  **Set up environment variables:**
    Create a `.env.local` file in `apps/web` with:
    ```
    NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
    ```
3.  **Start the Web app:**
    ```bash
    npm run dev
    ```

---

## 4) Data Model (Mongo + TypeScript)

*(Detailed schema definitions for Applicant, Criteria, Ranking will go here)*

---

## 5) Key Scoring Code

*(Code snippets for cosine similarity and scoreApplicant will go here)*

---

## 6) AI Extraction

*(Details on Zod schema for extraction and prompt summary will go here)*

---

## 7) APIs

*(Endpoints and sample controller code will go here)*

---

## 8) Admin UI

*(Pages and component details will go here)*

---

## 9) Fairness & Governance

*(Details on bias mitigation and audit reporting will go here)*

---

## 10) Evaluation

*(Metrics and demo strategy will go here)*

---

## 11) Deployment

*(Deployment strategy details will go here)*

---

## 12) Judge-facing Demo Script

*(Detailed demo script will go here)*

---

## 13) Step-by-step Commits

*(Commit history outline will go here)*

---
