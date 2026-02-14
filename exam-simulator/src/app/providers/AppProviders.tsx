import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { queryClient } from '@/shared/lib';
import { ToastProvider } from '@/shared/ui';
import { ThemeProvider } from './ThemeProvider';
import { AuthProvider } from './AuthProvider';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <ToastProvider>{children}</ToastProvider>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};
