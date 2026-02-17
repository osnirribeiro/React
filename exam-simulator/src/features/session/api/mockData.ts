import { Question } from '../model/types';

const generateQuestions = (examId: string, count: number): Question[] => {
  const questions: Question[] = [];

  for (let i = 1; i <= count; i++) {
    const options = [
      { id: `${examId}-q${i}-opt1`, text: `Alternativa A da questão ${i}` },
      { id: `${examId}-q${i}-opt2`, text: `Alternativa B da questão ${i}` },
      { id: `${examId}-q${i}-opt3`, text: `Alternativa C da questão ${i}` },
      { id: `${examId}-q${i}-opt4`, text: `Alternativa D da questão ${i}` },
      { id: `${examId}-q${i}-opt5`, text: `Alternativa E da questão ${i}` },
    ];

    questions.push({
      id: `${examId}-q${i}`,
      examId,
      text: `Questão ${i}: Esta é uma questão de exemplo. Qual é a resposta correta?`,
      options,
      correctOptionId: options[Math.floor(Math.random() * options.length)].id,
      explanation: `Explicação da questão ${i}: A resposta correta é a alternativa escolhida porque...`,
    });
  }

  return questions;
};

export const getQuestionsForExam = (
  examId: string,
  count: number
): Question[] => {
  return generateQuestions(examId, count);
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const shouldFail = () => Math.random() < 0.1; // 10% chance de erro

export { delay, shouldFail };
