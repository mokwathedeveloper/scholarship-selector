# Scoring Engine Design

This document outlines the design and formulas used in the applicant scoring engine.

## Overview

The scoring engine calculates a total score for each applicant based on several criteria. The total score is a simple average of the individual scores for each criterion. Each criterion is scored on a scale of 0-100.

## Scoring Criteria

### 1. Skills Match

- **Description:** This score measures how well the applicant's skills match a predefined set of required and nice-to-have skills.
- **Formula:**
  - A base score of 60 is awarded if all required skills are met. If not, the score is 0.
  - The remaining 40 points are awarded based on the percentage of nice-to-have skills met.
- **Configuration:** The required and nice-to-have skills are currently hardcoded in `scoring.service.ts`.

### 2. Experience

- **Description:** This score evaluates the applicant's years of experience.
- **Formula:** A logarithmic scale is used: `score = log(years + 1) / log(20) * 100`. This gives diminishing returns for more years of experience. The score is capped at 100.

### 3. Education Level

- **Description:** This score is based on the applicant's highest level of education.
- **Formula:** A configurable mapping from education level to a score. The current mapping is:
  - Bachelor's: 70
  - Master's: 90
  - PhD: 100

### 4. Assessments

- **Description:** This score is based on the results of any assessments the applicant has taken.
- **Formula:** The score is the average of the normalized scores of all assessments. Each assessment score is normalized to a 0-100 scale using `(score / maxScore) * 100`.

### 5. Semantic Similarity

- **Description:** This score measures the semantic similarity between the applicant's resume text and a job description.
- **Formula:**
  1. Both the resume and job description are tokenized, stemmed, and stopwords are removed.
  2. A bag-of-words vector is created for each text based on a shared vocabulary.
  3. The cosine similarity between the two vectors is calculated.
  4. The similarity score is scaled to 0-100.

## Example Output

```json
{
  "items": [
    {
      "applicantId": "64f...",
      "score": 86.4,
      "breakdown": {
        "skillsScore": 78,
        "experienceScore": 88,
        "educationScore": 100,
        "assessmentsScore": 74,
        "semanticScore": 62
      },
      "explanation": "Meets required skills, 6+ years experience, BSc; strong assessment."
    }
  ]
}
```
