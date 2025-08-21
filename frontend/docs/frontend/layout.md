# Layout Feature Documentation

This document details the implementation of the global layout for the Scholarship Selector frontend application.

## Components Implemented:

- `Layout.js`: A wrapper component that provides a consistent structure for all pages, including the `Navbar` and `Footer`.
- `Navbar.js`: The navigation bar component, providing links to the Home, Upload, and Rank pages.
- `Footer.js`: The footer component, displaying copyright information.

## Implementation Details:

1.  **`Layout.js` Creation:**
    - A new `Layout.js` component was created in `src/components/`.
    - It imports `Navbar` and `Footer` and renders them along with `children` (the page content).
    - Basic Tailwind CSS classes were applied for a flex column layout and responsive container.

2.  **`Navbar.js` Enhancement:**
    - The placeholder `Navbar.js` was updated with actual navigation links using Next.js `Link` component.
    - Tailwind CSS classes were added for styling (background color, text color, spacing, and hover effects).

3.  **`Footer.js` Enhancement:**
    - The placeholder `Footer.js` was updated with copyright information.
    - Tailwind CSS classes were applied for styling (background color, text color, and centering).

4.  **`_app.js` Integration:**
    - A new `_app.js` file was created in `src/pages/`.
    - This file is crucial for Next.js to initialize pages.
    - It imports the global CSS (`globals.css`) and the new `Layout` component.
    - All pages are now wrapped within the `Layout` component, ensuring a consistent header and footer across the application.

## Usage:

Any new page created in `src/pages/` will automatically be wrapped by the `Layout` component, providing a consistent look and feel.
