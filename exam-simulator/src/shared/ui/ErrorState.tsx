import { ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button, ButtonProps } from './Button';
import { Stack } from './Layout';

export interface ErrorStateProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  } & Partial<ButtonProps>;
}

export const ErrorState = ({
  icon,
  title = 'Algo deu errado',
  description = 'Não foi possível carregar os dados. Tente novamente.',
  action,
}: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <Stack spacing="lg" align="center">
        <div className="text-destructive">
          {icon || <AlertCircle className="h-12 w-12" />}
        </div>
        <Stack spacing="sm" align="center">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground text-center max-w-md">
              {description}
            </p>
          )}
        </Stack>
        {action && (
          <Button onClick={action.onClick} {...action}>
            {action.label}
          </Button>
        )}
      </Stack>
    </div>
  );
};
