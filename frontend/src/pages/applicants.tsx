import React from 'react';
import withAuth from '../components/withAuth'; // Import the HOC

const ApplicantsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Applicants Management</h1>
      <p>This page will display a table of applicants with search, filters, and deduplication options.</p>
      {/* Future: Applicants table, CSV upload, PDF drag-n-drop */}
    </div>
  );
};

// Wrap the component with withAuth, restricting to admin role
export default withAuth(ApplicantsPage, { roles: ['admin'] });