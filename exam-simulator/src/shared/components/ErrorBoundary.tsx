import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorState } from '../ui';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <ErrorState
            title="Algo deu errado"
            description={this.state.error?.message || 'Ocorreu um erro inesperado'}
            action={{
              label: 'Recarregar página',
              onClick: () => window.location.reload(),
            }}
          />
        </div>
      );
    }

    return this.props.children;
  }
}
