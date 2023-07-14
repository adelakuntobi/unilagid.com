import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AuthService from './AuthService';
import FullPageLoader from '../components/FullpageLoader';
// import { useQuery } from 'react-query';
import { getOverview } from '@/pages/dashboard';

const withAuth = (WrappedComponent) => {
  const RequiresAuth = (props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
      const checkAuth = async () => {
        const isAuthenticated = await AuthService.isAuthenticated();

        setIsLoading(false);
        if (!isAuthenticated) {
        // if (!isAuthenticated || (error && error['response'].data.message === "Unauthenticated")) {
            router.replace('/login');
        }
      };

      checkAuth();
    }, [router]);
    // }, [router, isError, error]);

    if (isLoading) {
    // if (isLoading || loading) {
      return <FullPageLoader />;
    }

    return <WrappedComponent {...props} />;
  };
  return RequiresAuth;
};
export default withAuth;
