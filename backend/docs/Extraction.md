# NLP Extraction Rules, Assumptions, and Limitations

This document details the current implementation of the Natural Language Processing (NLP) extraction service, including the rules, assumptions made, and its current limitations.

## Overview

The \'ExtractionService\' is responsible for parsing unstructured text fields (like \'resumeText\' and \'coverLetterText\') from applicant data to extract structured information such as skills, total years of experience, and highest education level. This extracted data is then used by the scoring engine.

## Extraction Rules and Assumptions

### 1. Skills Extraction
- **Method:** Simple keyword matching.
- **Process:** The applicant\'s resume text is tokenized, stopwords are removed, and the remaining tokens are stemmed. These processed tokens are then compared against a predefined list of common skills.
- **Assumption:** Skills are explicitly mentioned in the resume and match the predefined list (case-insensitive after processing).
- **Limitation:** Does not recognize variations, synonyms, or context-dependent skills. Only extracts skills that are exact matches to the hardcoded list.

### 2. Experience Extraction
- **Method:** Regular expression matching.
- **Process:** The service looks for patterns like "X years experience" (e.g., "5 years experience") in the resume text.
- **Assumption:** Experience is explicitly stated in the format "[number] years experience".
- **Limitation:** Highly sensitive to phrasing. Will miss experience stated in other formats (e.g., "over a decade of experience"), or implied experience from job roles/dates.

### 3. Education Level Extraction
- **Method:** Simple keyword matching.
- **Process:** The service searches for keywords like "bachelor", "master", "phd", "doctorate", "b.sc", "m.sc" in the resume text.
- **Assumption:** Education levels are explicitly mentioned using these keywords.
- **Limitation:** Does not infer education levels from institution names or degrees not explicitly listed. May misinterpret context (e.g., "mastering a skill").

## Current Limitations

- **Basic NLP:** The current implementation uses very basic NLP techniques (tokenization, stopword removal, stemming, keyword/regex matching). It does not employ advanced techniques like Named Entity Recognition (NER), dependency parsing, or deep learning models.
- **No Contextual Understanding:** The service lacks contextual understanding. It cannot differentiate between a skill mentioned as a requirement for a job vs. a skill the applicant possesses.
- **Hardcoded Lists:** Skills and education keywords are hardcoded. This makes the system less flexible and requires manual updates for new relevant terms.
- **No Certifications Extraction:** The current implementation does not extract certifications, although the \'extracted\' schema supports it. This would require additional rules and patterns.
- **Single Source:** Primarily focuses on \'resumeText\'. \'coverLetterText\' is available but not fully utilized for extraction beyond basic text processing.
- **Error Handling:** While the upload pipeline has fallbacks, the extraction logic itself has limited error handling for malformed or unexpected text patterns.

## Future Improvements

- Integrate more sophisticated NLP libraries or models for better accuracy.
- Implement configurable rules for extraction rather than hardcoded lists.
- Add support for extracting certifications and other relevant entities.
- Improve contextual understanding to reduce false positives/negatives.

