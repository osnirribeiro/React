import { useAuth0 } from '@auth0/auth0-react';
import { AuthUser } from '../types';

export interface UseAuthUserReturn {
  user: AuthUser | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | undefined;
  login: (options?: { appState?: { returnTo?: string } }) => Promise<void>;
  logout: (options?: { returnTo?: string }) => void;
  getAccessTokenSilently: (options?: {
    authorizationParams?: { audience?: string; scope?: string };
  }) => Promise<string>;
}

export const useAuthUser = (): UseAuthUserReturn => {
  const {
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
    error,
  } = useAuth0();

  const login = async (options?: { appState?: { returnTo?: string } }) => {
    await loginWithRedirect(options);
  };

  const logoutUser = (options?: { returnTo?: string }) => {
    logout({
      logoutParams: {
        returnTo: options?.returnTo || window.location.origin,
      },
    });
  };

  return {
    user: user as AuthUser | undefined,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout: logoutUser,
    getAccessTokenSilently,
  };
};
