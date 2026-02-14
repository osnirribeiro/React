export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  examId: string;
  text: string;
  options: Option[];
  correctOptionId: string;
  explanation?: string;
}

export interface AttemptAnswer {
  questionId: string;
  selectedOptionId: string | null;
  markedForReview: boolean;
  eliminatedOptions: string[];
}

export interface ExamAttempt {
  examId: string;
  startedAt: string;
  answers: AttemptAnswer[];
  currentQuestionIndex: number;
  timeRemainingSeconds: number;
}

export interface SubmitAttemptPayload {
  examId: string;
  answers: AttemptAnswer[];
  timeSpentSeconds: number;
}
