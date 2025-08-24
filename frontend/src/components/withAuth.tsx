import { useRouter } from 'next/router';
import { useEffect, ComponentType } from 'react';
import { jwtDecode } from 'jwt-decode';

interface WithAuthProps {
  roles: string[];
}

interface DecodedToken {
  id: string;
  role: string;
  exp: number;
  iat: number;
}

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>,
  options: WithAuthProps
) => {
  const AuthComponent = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');

      if (!token) {
        router.replace('/login');
        return;
      }

      try {
        const decodedToken: DecodedToken = jwtDecode(token);
        const { role, exp } = decodedToken;

        if (exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          router.replace('/login');
          return;
        }

        if (!options.roles.includes(role)) {
          // Redirect to a generic page if role doesn't match
          // For example, a user trying to access an admin page
          router.replace('/user/dashboard'); // Or a dedicated '/unauthorized' page
          return;
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        router.replace('/login');
      }
    }, [router]);

    // Render a loading state or null while checking auth
    // This prevents a flash of the protected content
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      return null; // Or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };

  AuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthComponent;
};

export default withAuth;
