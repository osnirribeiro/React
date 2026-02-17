import { useNavigate } from 'react-router-dom';
import { Clock, BookOpen, Play } from 'lucide-react';
import { Exam } from '../model/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Badge,
  Stack,
  Skeleton,
  ErrorState,
} from '@/shared/ui';
import { formatDuration } from '@/shared/utils/formatTime';

interface ExamDetailsProps {
  exam: Exam | undefined;
  isLoading: boolean;
  error: Error | null;
}

const difficultyLabels = {
  easy: 'Fácil',
  medium: 'Médio',
  hard: 'Difícil',
};

const areaLabels = {
  matematica: 'Matemática',
  portugues: 'Português',
  ciencias: 'Ciências',
  historia: 'História',
  geografia: 'Geografia',
};

export const ExamDetails = ({ exam, isLoading, error }: ExamDetailsProps) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error || !exam) {
    return (
      <ErrorState
        title="Erro ao carregar prova"
        description={error?.message || 'Prova não encontrada'}
        action={{
          label: 'Voltar',
          onClick: () => navigate('/'),
        }}
      />
    );
  }

  const handleStart = () => {
    navigate(`/exams/${exam.id}/session`);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{exam.title}</CardTitle>
            <CardDescription className="mt-2">{exam.description}</CardDescription>
          </div>
          <Badge
            variant={
              exam.difficulty === 'hard'
                ? 'destructive'
                : exam.difficulty === 'medium'
                ? 'secondary'
                : 'success'
            }
          >
            {difficultyLabels[exam.difficulty]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Stack spacing="lg">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Questões</p>
                <p className="font-semibold">{exam.questionCount}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Duração</p>
                <p className="font-semibold">
                  {formatDuration(exam.durationMinutes)}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Área</p>
              <p className="font-semibold">{areaLabels[exam.area]}</p>
            </div>
          </div>
          <div className="pt-4">
            <Button size="lg" onClick={handleStart} className="w-full sm:w-auto">
              <Play className="mr-2 h-5 w-5" />
              Iniciar Prova
            </Button>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
};
