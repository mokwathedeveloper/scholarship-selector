import React from 'react';

const ApplicantsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Applicants Management</h1>
      <p>This page will display a table of applicants with search, filters, and deduplication options.</p>
      {/* Future: Applicants table, CSV upload, PDF drag-n-drop */}
    </div>
  );
};

export default ApplicantsPage;