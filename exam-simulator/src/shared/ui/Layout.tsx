import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Container = ({ className, children, ...props }: ContainerProps) => {
  return (
    <div
      className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  direction?: 'row' | 'col';
  spacing?: 'sm' | 'md' | 'lg';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
}

export const Stack = ({
  className,
  children,
  direction = 'col',
  spacing = 'md',
  align = 'stretch',
  justify = 'start',
  ...props
}: StackProps) => {
  const spacingMap = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };

  const alignMap = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const justifyMap = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
  };

  return (
    <div
      className={cn(
        'flex',
        direction === 'col' ? 'flex-col' : 'flex-row',
        spacingMap[spacing],
        alignMap[align],
        justifyMap[justify],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg';
}

export const Grid = ({
  className,
  children,
  cols = 3,
  gap = 'md',
  ...props
}: GridProps) => {
  const colsMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
    12: 'grid-cols-12',
  };

  const gapMap = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };

  return (
    <div
      className={cn('grid', colsMap[cols], gapMap[gap], className)}
      {...props}
    >
      {children}
    </div>
  );
};
