import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../utils/cn';

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, id, checked, ...props }, ref) => {
    const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="flex items-center space-x-2">
        <div className="relative inline-flex items-center">
          <input
            ref={ref}
            type="checkbox"
            id={switchId}
            role="switch"
            aria-checked={checked}
            className="peer sr-only"
            checked={checked}
            {...props}
          />
          <div
            className={cn(
              'h-6 w-11 rounded-full border-2 border-input bg-muted transition-colors peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
              className
            )}
            aria-hidden="true"
          >
            <div
              className={cn(
                'absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-background shadow-sm transition-transform peer-checked:translate-x-5'
              )}
            />
          </div>
        </div>
        {label && (
          <label
            htmlFor={switchId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';
