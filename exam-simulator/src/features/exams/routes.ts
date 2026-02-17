import { lazy } from 'react';

export const HomePage = lazy(() =>
  import('./pages/HomePage').then((m) => ({ default: m.HomePage }))
);

export const ExamDetailsPage = lazy(() =>
  import('./pages/ExamDetailsPage').then((m) => ({
    default: m.ExamDetailsPage,
  }))
);
