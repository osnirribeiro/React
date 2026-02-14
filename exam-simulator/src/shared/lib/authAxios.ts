import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';

/**
 * Options for getting access token
 */
export interface TokenGetterOptions {
  authorizationParams?: {
    audience?: string;
    scope?: string;
  };
}

/**
 * Type for token getter function
 */
export type TokenGetter = (options?: TokenGetterOptions) => Promise<string>;

/**
 * Token provider function - injected from Auth0 hook
 */
let tokenGetter: TokenGetter | null = null;

/**
 * Sets the token getter function to be used by axios interceptors
 * This should be called from a React component that has access to Auth0 hooks
 * 
 * @param getter - Function that returns a promise resolving to an access token
 */
export const setAuthTokenGetter = (getter: TokenGetter | null): void => {
  tokenGetter = getter;
};

/**
 * Clears the token getter (useful for logout)
 */
export const clearAuthTokenGetter = (): void => {
  tokenGetter = null;
};

/**
 * Gets the current access token using the injected token getter
 * Returns null if no token getter is set or if it fails
 */
export const getCurrentAccessToken = async (
  options?: TokenGetterOptions
): Promise<string | null> => {
  if (!tokenGetter) {
    return null;
  }

  try {
    return await tokenGetter(options);
  } catch (error) {
    console.error('[Auth] Failed to get access token:', error);
    return null;
  }
};

/**
 * Creates an axios instance configured with Auth0 token interceptor
 * The token getter must be set using setAuthTokenGetter() before making requests
 */
export const createAuthAxiosInstance = (): AxiosInstance => {
  const apiUrl = import.meta.env.VITE_API_URL || '/api';

  const instance = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor to attach access token
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      // Only attach token if token getter is available
      if (tokenGetter) {
        try {
          const token = await tokenGetter();
          if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.error('[Auth] Failed to get access token for request:', error);
          // Don't block the request - let it proceed without token
          // The API will handle 401 responses appropriately
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor for error handling
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        // Token expired or invalid
        console.warn('[API] Unauthorized - token may be expired or invalid');
        // The app should handle this by redirecting to login if needed
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

/**
 * Default axios instance with Auth0 token interceptor
 * Make sure to call setAuthTokenGetter() before using this instance
 */
export const authApi = createAuthAxiosInstance();
