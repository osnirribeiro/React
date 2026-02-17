import { Exam } from '../model/types';
import { ExamCard } from './ExamCard';
import { Grid, EmptyState, Skeleton } from '@/shared/ui';

interface ExamListProps {
  exams: Exam[];
  isLoading?: boolean;
}

export const ExamList = ({ exams, isLoading }: ExamListProps) => {
  if (isLoading) {
    return (
      <Grid cols={3} gap="lg">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-64" />
        ))}
      </Grid>
    );
  }

  if (exams.length === 0) {
    return (
      <EmptyState
        title="Nenhuma prova encontrada"
        description="Tente ajustar os filtros de busca."
      />
    );
  }

  return (
    <Grid cols={3} gap="lg">
      {exams.map((exam) => (
        <ExamCard key={exam.id} exam={exam} />
      ))}
    </Grid>
  );
};
