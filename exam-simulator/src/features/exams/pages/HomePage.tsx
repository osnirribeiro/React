import { useState } from 'react';
import { ErrorState } from '@/shared/ui';
import { useExams } from '../hooks/useExams';
import { ExamFilters, ExamList } from '../components';
import { ExamFilters as ExamFiltersType } from '../model/types';

export const HomePage = () => {
  const [filters, setFilters] = useState<ExamFiltersType>({});
  const { data: exams, isLoading, error } = useExams(filters);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Simulador de Provas</h1>
        <p className="text-muted-foreground text-lg">
          Escolha uma prova e teste seus conhecimentos
        </p>
      </div>
      
      <ExamFilters filters={filters} onFiltersChange={setFilters} />
      
      {error ? (
        <ErrorState
          title="Erro ao carregar provas"
          description={error.message}
          action={{
            label: 'Tentar novamente',
            onClick: () => window.location.reload(),
          }}
        />
      ) : (
        <ExamList exams={exams || []} isLoading={isLoading} />
      )}
    </div>
  );
};
