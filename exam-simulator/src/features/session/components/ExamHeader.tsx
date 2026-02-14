import React from 'react';
import { TimerBadge, Progress, Button, Stack } from '@/shared/ui';
import { LogOut } from 'lucide-react';
import { formatTime } from '@/shared/utils/formatTime';

interface ExamHeaderProps {
  examTitle: string;
  timeRemaining: number;
  currentQuestion: number;
  totalQuestions: number;
  onFinish: () => void;
}

export const ExamHeader = ({
  examTitle,
  timeRemaining,
  currentQuestion,
  totalQuestions,
  onFinish,
}: ExamHeaderProps) => {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="border-b border-border bg-card sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <Stack direction="row" spacing="md" justify="between" align="center">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold truncate">{examTitle}</h1>
            <Progress value={progress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Questão {currentQuestion} de {totalQuestions}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <TimerBadge seconds={timeRemaining} />
            <Button variant="danger" onClick={onFinish}>
              <LogOut className="mr-2 h-4 w-4" />
              Finalizar
            </Button>
          </div>
        </Stack>
      </div>
    </div>
  );
};
