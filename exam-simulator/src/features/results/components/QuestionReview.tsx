import { QuestionResult } from '../model/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Stack,
} from '@/shared/ui';
import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

interface QuestionReviewProps {
  questionResult: QuestionResult;
  questionNumber: number;
}

export const QuestionReview = ({
  questionResult,
  questionNumber,
}: QuestionReviewProps) => {
  const { question, userAnswer, isCorrect } = questionResult;

  return (
    <Card className={cn(isCorrect ? 'border-green-500' : 'border-destructive')}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">Questão {questionNumber}</CardTitle>
          <Badge variant={isCorrect ? 'success' : 'destructive'}>
            {isCorrect ? (
              <CheckCircle2 className="mr-1 h-4 w-4" />
            ) : (
              <XCircle className="mr-1 h-4 w-4" />
            )}
            {isCorrect ? 'Correta' : 'Incorreta'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Stack spacing="md">
          <p className="text-base leading-relaxed">{question.text}</p>
          <div className="space-y-2">
            {question.options.map((option) => {
              const isSelected = option.id === userAnswer.selectedOptionId;
              const isCorrectOption = option.id === question.correctOptionId;

              return (
                <div
                  key={option.id}
                  className={cn(
                    'rounded-md border-2 p-3',
                    isCorrectOption && 'border-green-500 bg-green-500/10',
                    isSelected &&
                      !isCorrectOption &&
                      'border-destructive bg-destructive/10',
                    !isSelected && !isCorrectOption && 'border-border'
                  )}
                >
                  <div className="flex items-center gap-2">
                    {isCorrectOption && (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    )}
                    {isSelected && !isCorrectOption && (
                      <XCircle className="h-5 w-5 text-destructive" />
                    )}
                    <span
                      className={cn(
                        isCorrectOption && 'font-semibold',
                        isSelected && !isCorrectOption && 'font-semibold'
                      )}
                    >
                      {option.text}
                    </span>
                    {isCorrectOption && (
                      <Badge variant="success" className="ml-auto">
                        Correta
                      </Badge>
                    )}
                    {isSelected && !isCorrectOption && (
                      <Badge variant="destructive" className="ml-auto">
                        Sua resposta
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {question.explanation && (
            <div className="mt-4 rounded-md bg-muted p-4">
              <p className="mb-1 text-sm font-semibold">Explicação:</p>
              <p className="text-sm text-muted-foreground">
                {question.explanation}
              </p>
            </div>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};
