import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from '../../pages/HomePage';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

describe('HomePage', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = createTestQueryClient();
  });

  afterEach(() => {
    queryClient.clear();
  });

  const TestWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    );
  };

  it('renders the page title', async () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );

    expect(screen.getByText('Simulador de Provas')).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.getByPlaceholderText('Buscar provas...')
      ).toBeInTheDocument();
    });
  });

  it('renders the search input', async () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText('Buscar provas...')
      ).toBeInTheDocument();
    });
  });
});
