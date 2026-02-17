import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
}

/**
 * Simple page layout wrapper for auth pages
 * Centers content vertically and horizontally
 */
export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
};
