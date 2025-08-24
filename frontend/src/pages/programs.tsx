import React from 'react';
import withAuth from '../components/withAuth'; // Import withAuth HOC

const ProgramsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Programs Management</h1>
      <p>This page will allow creating criteria, setting weights, and defining required/nice skills for different programs.</p>
      {/* Future: Program list, Create Program form */}
    </div>
  );
};

export default withAuth(ProgramsPage, ['client']); // Wrap with withAuth HOC