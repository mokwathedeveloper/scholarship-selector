import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to your Admin Dashboard!</h1>
        <p className="text-gray-600">This is a placeholder for admin-specific content.</p>
        <p className="text-gray-600">You can manage scholarships, view applicants, and approve/reject applications here.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;