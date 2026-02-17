import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Stack, Button, Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui';
import { ResultSummary, QuestionReview } from '../components';
import { ResultSummary as ResultSummaryType } from '../model/types';

export const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result as ResultSummaryType | undefined;
  const [activeTab, setActiveTab] = useState('summary');

  if (!result) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 py-12">
          <h2 className="text-2xl font-bold">Resultado não encontrado</h2>
          <Button onClick={() => navigate('/')}>Voltar para Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate('/')}
        className="w-fit"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para Home
      </Button>

      <ResultSummary result={result} />

      <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="summary">Resumo</TabsTrigger>
          <TabsTrigger value="review">Revisão</TabsTrigger>
        </TabsList>
        <TabsContent value="summary">
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Você completou a prova em {new Date(result.completedAt).toLocaleString('pt-BR')}.</p>
          </div>
        </TabsContent>
        <TabsContent value="review">
          <Stack spacing="md" className="mt-4">
            {result.questionResults.map((questionResult, index) => (
              <QuestionReview
                key={questionResult.question.id}
                questionResult={questionResult}
                questionNumber={index + 1}
              />
            ))}
          </Stack>
        </TabsContent>
      </Tabs>
    </div>
  );
};
