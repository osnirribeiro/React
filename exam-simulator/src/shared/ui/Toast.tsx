import React, { useEffect, useState, ReactNode } from 'react';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '../utils/cn';
import { Button } from './Button';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  id: string;
  type?: ToastType;
  title?: string;
  description?: string;
  duration?: number;
  onClose: (id: string) => void;
}

export const Toast = ({
  id,
  type = 'info',
  title,
  description,
  duration = 5000,
  onClose,
}: ToastProps) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, id, onClose]);

  const icons = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info,
    warning: AlertTriangle,
  };

  const styles = {
    success: 'bg-green-500 text-white',
    error: 'bg-destructive text-destructive-foreground',
    info: 'bg-primary text-primary-foreground',
    warning: 'bg-yellow-500 text-white',
  };

  const Icon = icons[type];

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-lg border border-border bg-card p-4 shadow-lg',
        styles[type]
      )}
      role="alert"
    >
      <Icon className="h-5 w-5 shrink-0" />
      <div className="flex-1">
        {title && <p className="font-semibold">{title}</p>}
        {description && <p className="text-sm opacity-90">{description}</p>}
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onClose(id)}
        aria-label="Fechar notificação"
        className="h-6 w-6 p-0 shrink-0"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

// Toast Provider
interface ToastContextValue {
  addToast: (toast: Omit<ToastProps, 'id' | 'onClose'>) => void;
}

const ToastContext = React.createContext<ToastContextValue | undefined>(
  undefined
);

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Array<ToastProps & { id: string }>>(
    []
  );

  const addToast = (toast: Omit<ToastProps, 'id' | 'onClose'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { ...toast, id, onClose: removeToast }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
        role="region"
        aria-label="Notificações"
      >
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
