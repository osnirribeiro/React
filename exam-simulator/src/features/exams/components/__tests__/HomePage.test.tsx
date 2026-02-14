import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from '../../pages/HomePage';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe('HomePage', () => {
  it('renders the page title', () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );

    expect(screen.getByText('Simulador de Provas')).toBeInTheDocument();
  });

  it('renders the search input', () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );

    expect(screen.getByPlaceholderText('Buscar provas...')).toBeInTheDocument();
  });
});
