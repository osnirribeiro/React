import { lazy } from 'react';

export const ExamSessionPage = lazy(() =>
  import('./pages/ExamSessionPage').then((m) => ({
    default: m.ExamSessionPage,
  }))
);
