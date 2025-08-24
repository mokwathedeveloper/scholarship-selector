
import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Welcome to the Admin Dashboard</h1>
    </div>
  );
};

import withAuth from '../../components/withAuth';

export default withAuth(AdminDashboard, { roles: ['admin'] });
