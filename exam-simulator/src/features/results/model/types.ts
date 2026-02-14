import { Question, AttemptAnswer } from '../../session/model/types';

export interface QuestionResult {
  question: Question;
  userAnswer: AttemptAnswer;
  isCorrect: boolean;
}

export interface ResultSummary {
  id: string;
  examId: string;
  examTitle: string;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unansweredQuestions: number;
  score: number; // percentage
  timeSpentSeconds: number;
  completedAt: string;
  questionResults: QuestionResult[];
}
