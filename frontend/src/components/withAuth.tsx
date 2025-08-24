import { useRouter } from 'next/router';
import { useEffect, ComponentType } from 'react';
import { getUser } from '../utils/auth';

interface WithAuthProps {
  roles: string[];
}

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>,
  options: WithAuthProps
) => {
  const AuthComponent = (props: P) => {
    const router = useRouter();
    const user = getUser();

    useEffect(() => {
      if (!user) {
        router.push('/login');
        return;
      }

      if (options.roles && !options.roles.includes(user.role)) {
        router.push('/login'); // Or a dedicated unauthorized page
      }
    }, [user, router]);

    if (!user || (options.roles && !options.roles.includes(user.role))) {
      return null; // Or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;