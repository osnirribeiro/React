import { TimerBadge, Progress, Button, Stack } from '@/shared/ui';
import { LogOut } from 'lucide-react';
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
    <div className="sticky top-0 z-10 border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <Stack direction="row" spacing="md" justify="between" align="center">
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-semibold">{examTitle}</h1>
            <Progress value={progress} className="mt-2" />
            <p className="mt-1 text-xs text-muted-foreground">
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
