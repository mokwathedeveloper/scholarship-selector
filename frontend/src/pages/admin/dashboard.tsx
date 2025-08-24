import React, { useState, useEffect } from 'react';
import withAuth from '../../components/withAuth';
import { getAllUsers, deleteUserByAdmin } from '../../services/api'; // Removed updateUserByAdmin as it's used in modal
import { User } from '../../types/user';
import EditUserModal from '../../components/EditUserModal'; // Import the new modal component

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null); // State for user being edited
  const [showEditModal, setShowEditModal] = useState(false); // State to control modal visibility

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const userList = await getAllUsers();
      setUsers(userList);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUserByAdmin(id);
        setUsers(users.filter((user) => user._id !== id)); // Remove deleted user from state
      } catch (err: any) {
        setError(err.message || 'Failed to delete user.');
      }
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setEditingUser(null);
    setShowEditModal(false);
  };

  const handleSaveEdit = (updatedUser: User) => {
    // Update the user in the list
    setUsers(users.map((user) => (user._id === updatedUser._id ? updatedUser : user)));
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard - All Users</h1>
        {loading && <p className="text-center">Loading users...</p>}
        {error && <p className="text-center text-red-600">Error: {error}</p>}
        {users.length > 0 && (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3 font-bold">Name</th>
                  <th className="p-3 font-bold">Email</th>
                  <th className="p-3 font-bold">Role</th>
                  <th className="p-3 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.role}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!loading && users.length === 0 && (
          <p className="text-center text-gray-500">No users found.</p>
        )}
      </div>

      {showEditModal && editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={handleCloseModal}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default withAuth(AdminDashboard, { roles: ['admin'] });