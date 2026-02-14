import { HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  showLabel?: boolean;
}

export const Progress = ({
  className,
  value,
  max = 100,
  showLabel = false,
  ...props
}: ProgressProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn('w-full', className)} {...props}>
      {showLabel && (
        <div className="mb-1 flex justify-between text-xs text-muted-foreground">
          <span>Progresso</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
};
