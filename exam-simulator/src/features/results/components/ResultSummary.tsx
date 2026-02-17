import { ResultSummary as ResultSummaryType } from '../model/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Stack,
  Grid,
} from '@/shared/ui';
import { CheckCircle2, XCircle, Clock, Trophy, Circle } from 'lucide-react';
import { formatTime } from '@/shared/utils/formatTime';

interface ResultSummaryProps {
  result: ResultSummaryType;
}

export const ResultSummary = ({ result }: ResultSummaryProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 70) return 'success';
    if (score >= 50) return 'secondary';
    return 'destructive';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{result.examTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <Stack spacing="lg">
          <div className="py-6 text-center">
            <div className="mb-4 inline-flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
              <Trophy className="h-12 w-12 text-primary" />
            </div>
            <div className="mb-2 text-4xl font-bold">
              {result.score.toFixed(1)}%
            </div>
            <Badge
              variant={getScoreColor(result.score)}
              className="px-4 py-1 text-lg"
            >
              {result.score >= 70
                ? 'Aprovado'
                : result.score >= 50
                  ? 'Regular'
                  : 'Reprovado'}
            </Badge>
          </div>

          <Grid cols={4} gap="md">
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center gap-2 text-green-600">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold">{result.correctAnswers}</div>
              <div className="text-sm text-muted-foreground">Acertos</div>
            </div>
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center gap-2 text-destructive">
                <XCircle className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold">
                {result.incorrectAnswers}
              </div>
              <div className="text-sm text-muted-foreground">Erros</div>
            </div>
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center gap-2 text-muted-foreground">
                <Circle className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold">
                {result.unansweredQuestions}
              </div>
              <div className="text-sm text-muted-foreground">Em branco</div>
            </div>
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center gap-2 text-primary">
                <Clock className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold">
                {formatTime(result.timeSpentSeconds)}
              </div>
              <div className="text-sm text-muted-foreground">Tempo</div>
            </div>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
};
