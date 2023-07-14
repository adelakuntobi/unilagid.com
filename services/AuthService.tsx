import { getWithExpiry } from "../utils/req";
// import { useQuery } from "react-query";
// import { getOverview } from "@/pages/dashboard";

class AuthService {
  static async isAuthenticated() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const { data: overviewRes, isLoading: loading, error, isSuccess: isSuccessful, isError } = useQuery('overviewData', getOverview, {
    //   staleTime: Infinity,
    //   refetchOnWindowFocus: 'always'
    // });
    // Implement your authentication logic here
    // For example, you can check if the user has a valid session or token
    // You might use localStorage, cookies, or an API request to verify the user's authentication status
    const token = getWithExpiry("jwtToken");

    return !!token; // Return true if the token exists, indicating the user is authenticated
  }

  static isLoading() {
    // Implement a loading state logic if necessary
    // For example, you might use a state variable to track the loading status of authentication checks
    return false; // Return true if authentication check is still loading, false otherwise
  }
}

export default AuthService;
