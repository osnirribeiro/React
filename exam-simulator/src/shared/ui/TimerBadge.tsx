import { HTMLAttributes } from 'react';
import { Clock } from 'lucide-react';
import { cn } from '../utils/cn';
import { formatTime } from '../utils/formatTime';

export interface TimerBadgeProps extends HTMLAttributes<HTMLDivElement> {
  seconds: number;
  variant?: 'default' | 'warning' | 'danger';
}

export const TimerBadge = ({
  className,
  seconds,
  variant = 'default',
  ...props
}: TimerBadgeProps) => {
  const variants = {
    default: 'bg-primary text-primary-foreground',
    warning: 'bg-yellow-500 text-white',
    danger: 'bg-destructive text-destructive-foreground',
  };

  const getVariant = () => {
    if (seconds <= 60) return 'danger';
    if (seconds <= 300) return 'warning';
    return 'default';
  };

  const currentVariant = variant === 'default' ? getVariant() : variant;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold',
        variants[currentVariant],
        className
      )}
      {...props}
    >
      <Clock className="h-4 w-4" aria-hidden="true" />
      <span>{formatTime(seconds)}</span>
    </div>
  );
};
