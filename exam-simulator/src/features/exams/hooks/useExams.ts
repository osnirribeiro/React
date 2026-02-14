import { useQuery } from '@tanstack/react-query';
import { examsApi } from '../api/examsApi';
import { ExamFilters } from '../model/types';

export const useExams = (filters?: ExamFilters) => {
  return useQuery({
    queryKey: ['exams', filters],
    queryFn: () => examsApi.getExams(filters),
  });
};
