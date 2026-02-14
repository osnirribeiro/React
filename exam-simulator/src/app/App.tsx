import React from 'react';
import { AppRouter } from './router';
import { ErrorBoundary } from '@/shared/components';
import { AuthLayout } from './layouts/AuthLayout';
import './styles/globals.css';

export const App = () => {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <AuthLayout>
          <AppRouter />
        </AuthLayout>
      </ErrorBoundary>
    </React.StrictMode>
  );
};
