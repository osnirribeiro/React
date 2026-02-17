import { useParams } from 'react-router-dom';
import { useExam } from '../hooks/useExam';
import { ExamDetails } from '../components';

export const ExamDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: exam, isLoading, error } = useExam(id);

  return (
    <div className="max-w-4xl mx-auto">
      <ExamDetails exam={exam} isLoading={isLoading} error={error} />
    </div>
  );
};
