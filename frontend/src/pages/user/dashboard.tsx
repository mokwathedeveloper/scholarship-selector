import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter
import withAuth from '../../components/withAuth';
import { getUserProfile } from '../../services/api';
import { User } from '../../types/user';

const UserDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUserProfile();
        setUser(profile);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">User Dashboard</h1>
        {loading && <p className="text-center">Loading profile...</p>}
        {error && <p className="text-center text-red-600">Error: {error}</p>}
        {user && (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Welcome, {user.name}!</h2>
            <div className="space-y-2">
              <p><span className="font-bold">Email:</span> {user.email}</p>
              <p><span className="font-bold">Role:</span> {user.role}</p>
            </div>
            <button
              onClick={() => router.push('/user/edit-profile')}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(UserDashboard, { roles: ['user', 'admin'] });