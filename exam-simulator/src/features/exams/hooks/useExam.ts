import { useQuery } from '@tanstack/react-query';
import { examsApi } from '../api/examsApi';

export const useExam = (id: string | undefined) => {
  return useQuery({
    queryKey: ['exam', id],
    queryFn: () => {
      if (!id) throw new Error('Exam ID is required');
      return examsApi.getExamById(id);
    },
    enabled: !!id,
  });
};
