import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { sessionApi } from '../api/sessionApi';
import { Question, AttemptAnswer, ExamAttempt } from '../model/types';
import { storage } from '@/shared/utils/storage';
import { useToast } from '@/shared/ui';

const STORAGE_KEY_PREFIX = 'exam-attempt-';

export const useExamSession = (
  examId: string,
  totalDurationSeconds: number,
  questionCount: number = 30
) => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [timeRemaining, setTimeRemaining] = useState(totalDurationSeconds);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AttemptAnswer[]>([]);

  // Load saved attempt from localStorage
  useEffect(() => {
    const saved = storage.get<ExamAttempt>(`${STORAGE_KEY_PREFIX}${examId}`);
    if (saved && saved.examId === examId) {
      setTimeRemaining(saved.timeRemainingSeconds);
      setCurrentQuestionIndex(saved.currentQuestionIndex);
      setAnswers(saved.answers);
    }
  }, [examId]);

  // Auto-save attempt
  useEffect(() => {
    const attempt: ExamAttempt = {
      examId,
      startedAt: new Date().toISOString(),
      answers,
      currentQuestionIndex,
      timeRemainingSeconds: timeRemaining,
    };
    storage.set(`${STORAGE_KEY_PREFIX}${examId}`, attempt);
  }, [examId, answers, currentQuestionIndex, timeRemaining]);

  // Timer
  useEffect(() => {
    if (timeRemaining <= 0) {
      handleSubmit();
      return;
    }

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  const { data: questions, isLoading } = useQuery({
    queryKey: ['questions', examId, questionCount],
    queryFn: () => sessionApi.getQuestions(examId, questionCount),
    enabled: !!examId,
  });

  const submitMutation = useMutation({
    mutationFn: sessionApi.submitAttempt,
    onSuccess: (result) => {
      storage.remove(`${STORAGE_KEY_PREFIX}${examId}`);
      navigate(`/results/${result.id}`, { state: { result } });
    },
    onError: (error: Error) => {
      addToast({
        type: 'error',
        title: 'Erro ao enviar prova',
        description: error.message,
      });
    },
  });

  const handleSubmit = useCallback(() => {
    if (!questions) return;

    const timeSpent = totalDurationSeconds - timeRemaining;
    submitMutation.mutate({
      examId,
      answers,
      timeSpentSeconds: timeSpent,
    });
  }, [examId, answers, timeRemaining, totalDurationSeconds, questions, submitMutation]);

  const updateAnswer = useCallback(
    (questionId: string, selectedOptionId: string | null) => {
      setAnswers((prev) => {
        const existing = prev.find((a) => a.questionId === questionId);
        if (existing) {
          return prev.map((a) =>
            a.questionId === questionId
              ? { ...a, selectedOptionId }
              : a
          );
        }
        return [
          ...prev,
          {
            questionId,
            selectedOptionId,
            markedForReview: false,
            eliminatedOptions: [],
          },
        ];
      });
    },
    []
  );

  const toggleMarkForReview = useCallback((questionId: string) => {
    setAnswers((prev) => {
      const existing = prev.find((a) => a.questionId === questionId);
      if (existing) {
        return prev.map((a) =>
          a.questionId === questionId
            ? { ...a, markedForReview: !a.markedForReview }
            : a
        );
      }
      return [
        ...prev,
        {
          questionId,
          selectedOptionId: null,
          markedForReview: true,
          eliminatedOptions: [],
        },
      ];
    });
  }, []);

  const getAnswer = (questionId: string): AttemptAnswer | undefined => {
    return answers.find((a) => a.questionId === questionId);
  };

  return {
    questions: questions || [],
    isLoading,
    timeRemaining,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    updateAnswer,
    toggleMarkForReview,
    getAnswer,
    handleSubmit,
    isSubmitting: submitMutation.isPending,
    answers,
  };
};
