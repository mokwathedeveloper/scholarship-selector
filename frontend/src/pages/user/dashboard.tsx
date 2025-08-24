import React from 'react';
import withAuth from '../../components/withAuth';

const UserDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to your User Dashboard!</h1>
        <p className="text-gray-600">This is a placeholder for user-specific content.</p>
        <p className="text-gray-600">You can view your profile, scholarships, and application status here.</p>
      </div>
    </div>
  );
};

export default withAuth(UserDashboard, { roles: ['user', 'admin'] });