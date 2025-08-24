import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent: React.ComponentType, allowedRoles: string[]) => {
  const Wrapper = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      const userRole = localStorage.getItem('userRole');

      if (!token) {
        // No token, redirect to login
        router.push('/login');
      } else {
        // Token exists, check role
        if (!userRole || !allowedRoles.includes(userRole)) {
          // Wrong role, redirect to appropriate dashboard
          if (userRole === 'admin') {
            router.push('/admin/dashboard');
          } else if (userRole === 'client') {
            router.push('/user/dashboard');
          } else {
            // Unknown role or no role, redirect to generic login
            router.push('/login');
          }
        }
      }
    }, [router, allowedRoles]);

    // Render the wrapped component only if authenticated and authorized
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    if (token && userRole && allowedRoles.includes(userRole)) {
      return <WrappedComponent {...props} />;
    }

    // Optionally, render a loading spinner or null while checking auth
    return null;
  };

  return Wrapper;
};

export default withAuth;
