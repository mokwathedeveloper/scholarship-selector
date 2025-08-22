# Rank UI Usage and API Integration Notes

This document provides an overview of the Rank UI components and their integration with the backend API.

## Components

### `RankTable.tsx`

- **Location:** `frontend/src/components/RankTable.tsx`
- **Description:** Displays a sortable table of ranked applicants. Each row includes the applicant ID, total score, and a brief explanation. It also provides a button to view a detailed score breakdown in a modal.
- **Props:**
  - `applicants: RankedApplicant[]`: An array of ranked applicant data to display.

### `BreakdownModal.tsx`

- **Location:** `frontend/src/components/BreakdownModal.tsx`
- **Description:** A modal component that displays a detailed breakdown of an applicant's score, including individual scores for skills, experience, education, assessments, and semantic similarity, along with a natural language explanation.
- **Props:**
  - `applicant: RankedApplicant`: The selected ranked applicant whose breakdown is to be displayed.
  - `onClose: () => void`: A callback function to close the modal.

## Pages

### `RankPage.tsx`

- **Location:** `frontend/src/app/rank/page.tsx`
- **Description:** This page fetches ranked applicants from the backend API (`/api/rank`) and renders the `RankTable` component to display them. It handles loading and error states.
- **API Integration:** Calls `getRank()` from `frontend/src/services/api.ts` to retrieve ranked applicant data.

### Landing Page (`index.tsx`)

- **Location:** `frontend/src/pages/index.tsx`
- **Description:** The main landing page of the application. It now displays a list of recent uploads, including the document type, fetched from the backend (`/api/applicants`). It also provides navigation links to the Rank Page and Upload Page.
- **API Integration:** Calls `getAllApplicants()` from `frontend/src/services/api.ts` to retrieve recent applicant data.

## API Integration Notes

- **`frontend/src/services/api.ts`:**
  - **`getRank(topK?: number)`:** Fetches ranked applicants from `GET /api/rank`. It now expects the response to be an object with an `items` array (`{ items: RankedApplicant[] }`).
  - **`getApplicant(id: string)`:** Fetches a single applicant's data from `GET /api/applicants/:id`. This function was added to support fetching detailed applicant information.
  - **`getAllApplicants()`:** Fetches all applicants from `GET /api/applicants`. This function was added to support displaying recent uploads on the landing page.

## Manual Test Steps

1.  **Visit `/rank`:** Navigate to the `/rank` page in your browser. You should see a table of ranked applicants. The columns should be sortable. Clicking the "View Breakdown" button should open a modal displaying the score breakdown and explanation.
2.  **Visit Landing Page (`/`):** Navigate to the root URL (`/`). You should see a "Recent Uploads" section displaying a list of recently uploaded applicants with their document types. There should also be links to "View Ranked Applicants" and "Upload New Applicants".
