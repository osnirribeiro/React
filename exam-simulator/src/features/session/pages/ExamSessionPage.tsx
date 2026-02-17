import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useExam } from '../../exams/hooks/useExam';
import { useExamSession } from '../hooks/useExamSession';
import {
  ExamHeader,
  QuestionCard,
  QuestionNavigation,
} from '../components';
import { Modal, Button, Stack, Skeleton, ErrorState, Container } from '@/shared/ui';

export const ExamSessionPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: exam, isLoading: examLoading } = useExam(id);
  const [showFinishModal, setShowFinishModal] = useState(false);

  const totalDurationSeconds = exam ? exam.durationMinutes * 60 : 0;
  const questionCount = exam?.questionCount || 30;

  const {
    questions,
    isLoading: questionsLoading,
    timeRemaining,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    updateAnswer,
    toggleMarkForReview,
    getAnswer,
    handleSubmit,
    isSubmitting,
    answers,
  } = useExamSession(id || '', totalDurationSeconds, questionCount);

  if (examLoading || questionsLoading) {
    return (
      <div>
        <div className="border-b border-border bg-card sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
        <Container className="py-8">
          <Skeleton className="h-96 w-full" />
        </Container>
      </div>
    );
  }

  if (!exam || !id) {
    return (
      <Container className="py-8">
        <ErrorState title="Prova não encontrada" />
      </Container>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const answer = currentQuestion ? getAnswer(currentQuestion.id) : undefined;

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinishClick = () => {
    setShowFinishModal(true);
  };

  const handleConfirmFinish = () => {
    handleSubmit();
  };

  return (
    <div className="min-h-screen bg-background">
      <ExamHeader
        examTitle={exam.title}
        timeRemaining={timeRemaining}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        onFinish={handleFinishClick}
      />
      <div className="flex">
        <div className="hidden lg:block">
          <QuestionNavigation
            questions={questions}
            answers={answers}
            currentIndex={currentQuestionIndex}
            onQuestionSelect={setCurrentQuestionIndex}
          />
        </div>
        <div className="flex-1">
          <Container className="py-8">
            {currentQuestion && (
              <>
                <QuestionCard
                  question={currentQuestion}
                  answer={answer}
                  onAnswerChange={(optionId) =>
                    updateAnswer(currentQuestion.id, optionId)
                  }
                  onMarkForReview={() => toggleMarkForReview(currentQuestion.id)}
                  questionNumber={currentQuestionIndex + 1}
                  totalQuestions={questions.length}
                />
                <div className="mt-6 flex justify-between">
                  <Button
                    variant="secondary"
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                  >
                    Anterior
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={currentQuestionIndex === questions.length - 1}
                  >
                    Próxima
                  </Button>
                </div>
              </>
            )}
          </Container>
        </div>
      </div>

      <Modal
        open={showFinishModal}
        onClose={() => setShowFinishModal(false)}
        title="Finalizar Prova"
        description="Tem certeza que deseja finalizar a prova? Você não poderá voltar depois."
      >
        <Stack spacing="md">
          <p className="text-sm text-muted-foreground">
            Você respondeu {questions.filter((q) => getAnswer(q.id)?.selectedOptionId).length} de{' '}
            {questions.length} questões.
          </p>
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => setShowFinishModal(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={handleConfirmFinish}
              loading={isSubmitting}
            >
              Finalizar Prova
            </Button>
          </div>
        </Stack>
      </Modal>
    </div>
  );
};
