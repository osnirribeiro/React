import { useNavigate } from 'react-router-dom';
import { Clock, BookOpen, ArrowRight } from 'lucide-react';
import { Exam } from '../model/types';
import { Card, CardContent, CardFooter, Badge, Button } from '@/shared/ui';
import { formatDuration } from '@/shared/utils/formatTime';
import { cn } from '@/shared/utils/cn';

interface ExamCardProps {
  exam: Exam;
}

const difficultyLabels = {
  easy: 'Fácil',
  medium: 'Médio',
  hard: 'Difícil',
};

const areaLabels: Record<string, string> = {
  matematica: 'Matemática',
  portugues: 'Português',
  ciencias: 'Ciências',
  historia: 'História',
  geografia: 'Geografia',
};

export const ExamCard = ({ exam }: ExamCardProps) => {
  const navigate = useNavigate();

  const difficultyColors = {
    easy: 'bg-green-500/10 text-green-700 border-green-500/20 dark:text-green-400',
    medium:
      'bg-yellow-500/10 text-yellow-700 border-yellow-500/20 dark:text-yellow-400',
    hard: 'bg-red-500/10 text-red-700 border-red-500/20 dark:text-red-400',
  };

  return (
    <Card className="group transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-lg">
      <CardContent className="pt-6">
        <div className="mb-4 flex items-start justify-between">
          <h3 className="text-lg font-semibold text-card-foreground transition-colors group-hover:text-primary">
            {exam.title}
          </h3>
          <Badge className={cn('border', difficultyColors[exam.difficulty])}>
            {difficultyLabels[exam.difficulty]}
          </Badge>
        </div>
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {exam.description}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4 text-primary" />
            <span>{exam.questionCount} questões</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-primary" />
            <span>{formatDuration(exam.durationMinutes)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-0">
        <Badge variant="outline" className="text-xs">
          {areaLabels[exam.area]}
        </Badge>
        <Button
          onClick={() => navigate(`/exams/${exam.id}`)}
          variant="ghost"
          size="sm"
          className="group/btn"
        >
          Ver Detalhes
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};
