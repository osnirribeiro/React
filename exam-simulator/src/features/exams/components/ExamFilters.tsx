import React from 'react';
import { ExamFilters as ExamFiltersType, ExamArea, ExamDifficulty } from '../model/types';
import { Input, Select, Stack } from '@/shared/ui';
import { useDebounce } from '@/shared/hooks';

interface ExamFiltersProps {
  filters: ExamFiltersType;
  onFiltersChange: (filters: ExamFiltersType) => void;
}

const areaOptions = [
  { value: '', label: 'Todas as áreas' },
  { value: 'matematica', label: 'Matemática' },
  { value: 'portugues', label: 'Português' },
  { value: 'ciencias', label: 'Ciências' },
  { value: 'historia', label: 'História' },
  { value: 'geografia', label: 'Geografia' },
];

const difficultyOptions = [
  { value: '', label: 'Todas as dificuldades' },
  { value: 'easy', label: 'Fácil' },
  { value: 'medium', label: 'Médio' },
  { value: 'hard', label: 'Difícil' },
];

export const ExamFilters = ({ filters, onFiltersChange }: ExamFiltersProps) => {
  const [searchValue, setSearchValue] = React.useState(filters.search || '');
  const debouncedSearch = useDebounce(searchValue, 300);

  React.useEffect(() => {
    onFiltersChange({ ...filters, search: debouncedSearch || undefined });
  }, [debouncedSearch]);

  return (
    <Stack direction="row" spacing="md" className="flex-wrap">
      <div className="flex-1 min-w-[200px]">
        <Input
          placeholder="Buscar provas..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className="w-[180px]">
        <Select
          options={areaOptions}
          value={filters.area || ''}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              area: (e.target.value as ExamArea) || undefined,
            })
          }
        />
      </div>
      <div className="w-[180px]">
        <Select
          options={difficultyOptions}
          value={filters.difficulty || ''}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              difficulty: (e.target.value as ExamDifficulty) || undefined,
            })
          }
        />
      </div>
    </Stack>
  );
};
