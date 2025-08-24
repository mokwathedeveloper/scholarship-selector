
import React from 'react';
import withAuth from '../../components/withAuth'; // Import withAuth HOC

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Welcome to the Admin Dashboard</h1>
    </div>
  );
};

export default withAuth(AdminDashboard, ['admin']); // Wrap with withAuth HOC
