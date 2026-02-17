import React, { useEffect } from 'react';
import { useAuthUser } from '@/features/auth';
import { setAuthTokenGetter, clearAuthTokenGetter } from '@/shared/lib';

interface AuthLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout component that initializes Auth0 token getter for axios interceptors
 *
 * This component:
 * - Injects the token getter function into the axios interceptor system
 * - Clears the token getter on logout
 * - Ensures axios requests include the Bearer token automatically
 *
 * This should wrap the app after AuthProvider is mounted
 *
 * Note: This is NOT a visual layout - it's for auth logic only.
 * Use PageLayout or DashboardLayout for visual layouts.
 */
export const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuthUser();

  useEffect(() => {
    if (isAuthenticated && getAccessTokenSilently) {
      // Inject the token getter function into axios interceptor
      // This allows axios to get tokens without importing React hooks
      setAuthTokenGetter(getAccessTokenSilently);
    } else {
      // Clear token getter when user logs out
      clearAuthTokenGetter();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  return <>{children}</>;
};
