export type ExamDifficulty = 'easy' | 'medium' | 'hard';
export type ExamArea =
  | 'matematica'
  | 'portugues'
  | 'ciencias'
  | 'historia'
  | 'geografia';

export interface Exam {
  id: string;
  title: string;
  description: string;
  area: ExamArea;
  difficulty: ExamDifficulty;
  durationMinutes: number;
  questionCount: number;
  imageUrl?: string;
}

export interface ExamFilters {
  area?: ExamArea;
  difficulty?: ExamDifficulty;
  search?: string;
}
