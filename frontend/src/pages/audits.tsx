import React from 'react';
import withAuth from '../components/withAuth'; // Import withAuth HOC

const AuditsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Fairness Audits</h1>
      <p>This page will display fairness reports, including selection rate parity, top-K composition, and proxy drift.</p>
      {/* Future: Fairness report components */}
    </div>
  );
};

export default withAuth(AuditsPage, ['client']); // Wrap with withAuth HOC