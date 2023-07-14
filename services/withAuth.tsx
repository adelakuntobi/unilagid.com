import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AuthService from './AuthService';
import FullPageLoader from '../components/FullpageLoader';
import { useQuery } from 'react-query';
import { getOverview } from '@/pages/dashboard';

const withAuth = (WrappedComponent) => {
  const RequiresAuth = (props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const { data: overviewRes, isLoading: loading, error, isSuccess: isSuccessful, isError } = useQuery('overviewData', getOverview, {
      staleTime: Infinity,
      refetchOnWindowFocus: 'always'
    });
    useEffect(() => {
      const checkAuth = async () => {
        const isAuthenticated = await AuthService.isAuthenticated();

        setIsLoading(false);
        if (!isAuthenticated) {
            router.replace('/login');
        }
          if (error && error['response'].data.message === "Unauthenticated") {
            router.replace('/login');
        }
      };

      checkAuth();
    }, [router, isError, error]);

    if (isLoading || loading) {
      // Show loading spinner or message while checking authentication
      return <FullPageLoader />;
    }

    // Render the protected component if authenticated
    return <WrappedComponent {...props} />;
  };

  return RequiresAuth;
};

export default withAuth;
