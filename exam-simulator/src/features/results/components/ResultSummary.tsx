import { ResultSummary as ResultSummaryType } from '../model/types';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Stack, Grid } from '@/shared/ui';
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
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-primary/10 mb-4">
              <Trophy className="h-12 w-12 text-primary" />
            </div>
            <div className="text-4xl font-bold mb-2">{result.score.toFixed(1)}%</div>
            <Badge variant={getScoreColor(result.score)} className="text-lg px-4 py-1">
              {result.score >= 70 ? 'Aprovado' : result.score >= 50 ? 'Regular' : 'Reprovado'}
            </Badge>
          </div>

          <Grid cols={4} gap="md">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold">{result.correctAnswers}</div>
              <div className="text-sm text-muted-foreground">Acertos</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-destructive mb-2">
                <XCircle className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold">{result.incorrectAnswers}</div>
              <div className="text-sm text-muted-foreground">Erros</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-muted-foreground mb-2">
                <Circle className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold">{result.unansweredQuestions}</div>
              <div className="text-sm text-muted-foreground">Em branco</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-primary mb-2">
                <Clock className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold">{formatTime(result.timeSpentSeconds)}</div>
              <div className="text-sm text-muted-foreground">Tempo</div>
            </div>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
};
