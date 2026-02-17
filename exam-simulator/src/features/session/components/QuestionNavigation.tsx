import React from 'react';
import { Question, AttemptAnswer } from '../model/types';
import { Flag } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

interface QuestionNavigationProps {
  questions: Question[];
  answers: AttemptAnswer[];
  currentIndex: number;
  onQuestionSelect: (index: number) => void;
}

export const QuestionNavigation = ({
  questions,
  answers,
  currentIndex,
  onQuestionSelect,
}: QuestionNavigationProps) => {
  const getQuestionStatus = (questionId: string) => {
    const answer = answers.find((a) => a.questionId === questionId);
    if (!answer) return 'unanswered';
    if (answer.markedForReview) return 'review';
    if (answer.selectedOptionId) return 'answered';
    return 'unanswered';
  };

  return (
    <div className="p-4 border-r border-border">
      <h3 className="font-semibold mb-4">Navegação</h3>
      <div className="grid grid-cols-5 gap-2">
        {questions.map((question, index) => {
          const status = getQuestionStatus(question.id);
          const isCurrent = index === currentIndex;

          return (
            <button
              key={question.id}
              onClick={() => onQuestionSelect(index)}
              className={cn(
                'relative h-10 w-10 rounded-md border-2 transition-colors flex items-center justify-center',
                isCurrent && 'border-primary bg-primary/10',
                status === 'answered' && 'bg-green-500/20 border-green-500',
                status === 'review' && 'bg-yellow-500/20 border-yellow-500',
                status === 'unanswered' && 'bg-muted border-border'
              )}
              aria-label={`Questão ${index + 1} - ${status === 'answered' ? 'Respondida' : status === 'review' ? 'Marcada' : 'Não respondida'}`}
            >
              <span className="text-xs font-medium">{index + 1}</span>
              {status === 'review' && (
                <Flag className="absolute -top-1 -right-1 h-3 w-3 text-yellow-500" />
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-4 space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border-2 border-green-500 bg-green-500/20" />
          <span>Respondida</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border-2 border-yellow-500 bg-yellow-500/20" />
          <span>Marcada</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border-2 border-border bg-muted" />
          <span>Não respondida</span>
        </div>
      </div>
    </div>
  );
};
