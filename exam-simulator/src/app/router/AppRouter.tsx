import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Skeleton } from '@/shared/ui';
import { HomePage, ExamDetailsPage } from '@/features/exams';
import { ExamSessionPage } from '@/features/session';
import { ResultsPage } from '@/features/results';
import { LoginPage } from '@/features/auth';
import { ProtectedRoute } from '@/features/auth';
import { DashboardLayout, PageLayout } from '../layouts';

const LoadingFallback = () => (
  <div className="container mx-auto py-8">
    <Skeleton className="h-96 w-full rounded-xl" />
  </div>
);

export const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route
          path="/login"
          element={
            <PageLayout>
              <LoginPage />
            </PageLayout>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <HomePage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/exams/:id"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ExamDetailsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/exams/:id/session"
          element={
            <ProtectedRoute>
              <ExamSessionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/results/:id"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ResultsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};
