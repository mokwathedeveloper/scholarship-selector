import React, { useState } from 'react';
import Link from 'next/link';
// Removed useRouter as window.location.href is used for redirect

const AdminRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // Removed router as window.location.href is used for redirect

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear previous errors

    try {
      const res = await fetch(`/api/auth/admin/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }), // Include name for registration
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Admin registration failed");
      }

      const data = await res.json();
      // For signup, a token might not be returned immediately, but if it is, store it.
      if (data.token) {
        localStorage.setItem("token", data.token);
        if (data.user && data.user.role) {
          localStorage.setItem('userRole', data.user.role);
        }
      }

      alert("Registration successful! Please login."); // Inform user
      window.location.href = "/admin/login"; // Redirect to admin login after successful registration
    } catch (err: any) {
      alert(err.message); // Use alert for error as per prompt
      setError(err.message); // Also set error state for display in the component
    } finally {
      setLoading(false);
    }
  };
