# Upload UI Feature Documentation

This document details the implementation of the user interface for uploading applicant lists in the Scholarship Selector frontend application.

## Components Implemented/Modified:

- `upload.js` (page): This page now includes a form with a file input and a drag-and-drop area for uploading applicant data.

## Implementation Details:

1.  **File Input and Drag-and-Drop Area:**
    - The `upload.js` page was updated to include a visually intuitive drag-and-drop zone.
    - Users can either click on the area to select a file or drag and drop a file directly onto it.
    - The accepted file types are `.csv`, `.xlsx`, and `.xls`.

2.  **State Management:**
    - `useState` hook is used to manage the selected `file` and the `dragOver` state for visual feedback during drag-and-drop operations.

3.  **Event Handlers:**
    - `handleFileChange`: Updates the `file` state when a file is selected via the input.
    - `handleDragOver`: Prevents default behavior and sets `dragOver` to `true` for visual indication.
    - `handleDragLeave`: Sets `dragOver` to `false` when the dragged file leaves the area.
    - `handleDrop`: Prevents default behavior, sets `dragOver` to `false`, and updates the `file` state with the dropped file.
    - `handleSubmit`: A placeholder function that currently logs the file name and shows an alert. This will be integrated with the backend API in a future feature.

4.  **Visual Feedback:**
    - The drag-and-drop area changes its border and background color when a file is dragged over it, providing clear visual feedback to the user.
    - Once a file is selected or dropped, its name, type, and size are displayed.

5.  **Submit Button:**
    - A submit button is provided to trigger the upload process. It is disabled until a file is selected.

## Usage:

Users can navigate to the `/upload` page to upload their applicant data files. The UI provides a user-friendly way to select files, either by browsing or by dragging and dropping.
