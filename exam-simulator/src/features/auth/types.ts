/**
 * Types for Auth0 user object
 */
export interface AuthUser {
  sub: string;
  name?: string;
  email?: string;
  email_verified?: boolean;
  picture?: string;
  [key: string]: unknown;
}
