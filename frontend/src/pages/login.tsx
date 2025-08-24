import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { loginUser } from '../services/authApi'; // Import loginUser from authApi

// Validation Schema
const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const [error, setError] = useState(''); // error state remains local for general API errors
  const { login: authLogin, setLoading: authSetLoading, loading: authLoading } = useAuth();
  const router = useRouter();

  // Initialize useForm
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // onSubmit now receives validated data
  const onSubmit = async (formData: { email: string; password: string }) => {
    authSetLoading(true);
    setError(''); // Clear previous general API errors

    try {
      const data = await loginUser(formData.email, formData.password); // Use loginUser from authApi

      if (!data.token || !data.user || !data.user.role) {
        throw new Error("Login successful, but token or role missing.");
      }

      authLogin(data.token, data.user.role);
      router.push("/user/dashboard");
    } catch (err: any) {
      toast.error(err.message);
      setError(err.message);
    } finally {
      authSetLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Client Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)}> {/* Use handleSubmit */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              {...register('email')} {/* Register input */}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>} {/* Display error */}
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
              {...register('password')} {/* Register input */}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>} {/* Display error */}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full"
              type="submit"
              disabled={authLoading}
            >
              {authLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs mt-4">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-600 hover:text-blue-800">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;