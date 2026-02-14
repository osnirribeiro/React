import React from 'react';
import { Question, AttemptAnswer } from '../model/types';
import { Card, CardContent, CardHeader, CardTitle, Badge, Stack, Checkbox } from '@/shared/ui';

interface QuestionCardProps {
  question: Question;
  answer?: AttemptAnswer;
  onAnswerChange: (optionId: string) => void;
  onMarkForReview: () => void;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionCard = ({
  question,
  answer,
  onAnswerChange,
  onMarkForReview,
  questionNumber,
  totalQuestions,
}: QuestionCardProps) => {
  const selectedOptionId = answer?.selectedOptionId;
  const isMarkedForReview = answer?.markedForReview || false;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl">
            Questão {questionNumber} de {totalQuestions}
          </CardTitle>
          {isMarkedForReview && (
            <Badge variant="warning">Marcada para revisão</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Stack spacing="lg">
          <p className="text-base leading-relaxed">{question.text}</p>
          <div className="space-y-3">
            {question.options.map((option) => (
              <label
                key={option.id}
                className="flex items-start gap-3 p-3 rounded-md border border-border hover:bg-accent cursor-pointer transition-colors"
              >
                <Checkbox
                  checked={selectedOptionId === option.id}
                  onChange={() => onAnswerChange(option.id)}
                  className="mt-0.5"
                />
                <span className="flex-1">{option.text}</span>
              </label>
            ))}
          </div>
          <div className="pt-2">
            <button
              onClick={onMarkForReview}
              className="text-sm text-primary hover:underline"
            >
              {isMarkedForReview
                ? 'Remover marcação de revisão'
                : 'Marcar para revisão'}
            </button>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
};
