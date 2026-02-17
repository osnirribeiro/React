import { Question, SubmitAttemptPayload } from '../model/types';
import { getQuestionsForExam, delay, shouldFail } from './mockData';
import { ResultSummary } from '../../results/model/types';

export const sessionApi = {
  getQuestions: async (examId: string, count: number): Promise<Question[]> => {
    await delay(600 + Math.random() * 400); // 600-1000ms

    if (shouldFail()) {
      throw new Error('Erro ao carregar questões. Tente novamente.');
    }

    return getQuestionsForExam(examId, count);
  },

  submitAttempt: async (
    payload: SubmitAttemptPayload
  ): Promise<ResultSummary> => {
    await delay(1000 + Math.random() * 500); // 1000-1500ms

    if (shouldFail()) {
      throw new Error('Erro ao enviar prova. Tente novamente.');
    }

    const questions = getQuestionsForExam(
      payload.examId,
      payload.answers.length
    );
    const questionResults = questions.map((question) => {
      const answer = payload.answers.find((a) => a.questionId === question.id);
      const isCorrect =
        answer?.selectedOptionId === question.correctOptionId || false;

      return {
        question,
        userAnswer: answer || {
          questionId: question.id,
          selectedOptionId: null,
          markedForReview: false,
          eliminatedOptions: [],
        },
        isCorrect,
      };
    });

    const correctAnswers = questionResults.filter((r) => r.isCorrect).length;
    const incorrectAnswers = questionResults.filter(
      (r) => !r.isCorrect && r.userAnswer.selectedOptionId !== null
    ).length;
    const unansweredQuestions = questionResults.filter(
      (r) => r.userAnswer.selectedOptionId === null
    ).length;

    const score = (correctAnswers / questions.length) * 100;

    return {
      id: `result-${Date.now()}`,
      examId: payload.examId,
      examTitle: `Prova ${payload.examId}`,
      totalQuestions: questions.length,
      correctAnswers,
      incorrectAnswers,
      unansweredQuestions,
      score: Math.round(score * 100) / 100,
      timeSpentSeconds: payload.timeSpentSeconds,
      completedAt: new Date().toISOString(),
      questionResults,
    };
  },
};
