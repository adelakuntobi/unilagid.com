import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AuthService from './AuthService';
import FullPageLoader from '../components/FullpageLoader';

const withAuth = (WrappedComponent) => {
  const RequiresAuth = (props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        const isAuthenticated = await AuthService.isAuthenticated();

        setIsLoading(false);
        if (!isAuthenticated) {
          // Redirect to login page if not authenticated
          // setIsLoading(false);
          router.replace('/login');
        }
      };

      checkAuth();
    }, [router]);

    if (isLoading) {
      // Show loading spinner or message while checking authentication
      return <FullPageLoader />;
    }

    // Render the protected component if authenticated
    return <WrappedComponent {...props} />;
  };

  return RequiresAuth;
};

export default withAuth;
