import { Exam, ExamFilters } from '../model/types';
import { mockExams, delay, shouldFail } from './mockData';

export const examsApi = {
  getExams: async (filters?: ExamFilters): Promise<Exam[]> => {
    await delay(800 + Math.random() * 400); // 800-1200ms

    if (shouldFail()) {
      throw new Error('Erro ao carregar provas. Tente novamente.');
    }

    let filtered = [...mockExams];

    if (filters?.area) {
      filtered = filtered.filter((exam) => exam.area === filters.area);
    }

    if (filters?.difficulty) {
      filtered = filtered.filter(
        (exam) => exam.difficulty === filters.difficulty
      );
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (exam) =>
          exam.title.toLowerCase().includes(searchLower) ||
          exam.description.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  },

  getExamById: async (id: string): Promise<Exam> => {
    await delay(500 + Math.random() * 300); // 500-800ms

    if (shouldFail()) {
      throw new Error('Erro ao carregar prova. Tente novamente.');
    }

    const exam = mockExams.find((e) => e.id === id);
    if (!exam) {
      throw new Error('Prova não encontrada.');
    }

    return exam;
  },
};
