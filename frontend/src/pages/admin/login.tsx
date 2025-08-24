import React, { useState } from 'react';
import Link from 'next/link';
// Removed useRouter as window.location.href is used for redirect

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // Removed router as window.location.href is used for redirect

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear previous errors

    try {
      const res = await fetch(`/api/auth/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Admin login failed");
      }

      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        // Store userRole if provided by the backend
        if (data.user && data.user.role) {
          localStorage.setItem('userRole', data.user.role);
        }
      }

      window.location.href = "/admin/dashboard"; // Always redirect to admin dashboard for admin login
    } catch (err: any) {
      alert(err.message); // Use alert for error as per prompt
      setError(err.message); // Also set error state for display in the component
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Admin Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs mt-4">
          Don't have an admin account?{' '}
          <Link href="/admin/signup" className="text-blue-600 hover:text-blue-800">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
