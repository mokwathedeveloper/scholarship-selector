import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const withAuth = (WrappedComponent: React.ComponentType, allowedRoles: string[]) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const { token, role, isAuthenticated, loading } = useAuth(); // Get auth state from useAuth

    useEffect(() => {
      // If still loading auth state from localStorage, do nothing yet
      if (loading) {
        return;
      }

      if (!isAuthenticated) {
        // Not authenticated, redirect to login
        router.push('/login');
      } else {
        // Authenticated, check role
        if (!role || !allowedRoles.includes(role)) {
          // Wrong role, redirect to appropriate dashboard
          if (role === 'admin') {
            router.push('/admin/dashboard');
          } else if (role === 'client') {
            router.push('/user/dashboard');
          } else {
            // Unknown role or no role, redirect to generic login
            router.push('/login');
          }
        }
      }
    }, [isAuthenticated, loading, role, router, allowedRoles]);

    // Render the wrapped component only if authenticated and authorized
    // and not in initial loading state
    if (loading) {
      return null; // Or a loading spinner
    }

    if (isAuthenticated && role && allowedRoles.includes(role)) {
      return <WrappedComponent {...props} />;
    }

    // If not authenticated or not authorized after loading, return null (will be redirected by useEffect)
    return null;
  };

  return Wrapper;
};

export default withAuth;
