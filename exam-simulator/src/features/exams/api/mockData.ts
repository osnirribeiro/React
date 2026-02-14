import { Exam } from '../model/types';

export const mockExams: Exam[] = [
  {
    id: '1',
    title: 'ENEM - Matemática Básica',
    description:
      'Prova completa de matemática básica com questões de álgebra, geometria e estatística.',
    area: 'matematica',
    difficulty: 'medium',
    durationMinutes: 90,
    questionCount: 30,
  },
  {
    id: '2',
    title: 'ENEM - Português e Literatura',
    description:
      'Questões de interpretação de texto, gramática e literatura brasileira.',
    area: 'portugues',
    difficulty: 'medium',
    durationMinutes: 60,
    questionCount: 20,
  },
  {
    id: '3',
    title: 'Vestibular - Ciências da Natureza',
    description:
      'Prova de física, química e biologia com questões de múltipla escolha.',
    area: 'ciencias',
    difficulty: 'hard',
    durationMinutes: 120,
    questionCount: 40,
  },
  {
    id: '4',
    title: 'Concurso Público - História do Brasil',
    description:
      'Questões sobre história do Brasil desde o período colonial até a república.',
    area: 'historia',
    difficulty: 'easy',
    durationMinutes: 45,
    questionCount: 15,
  },
  {
    id: '5',
    title: 'ENEM - Geografia Geral',
    description:
      'Questões de geografia física, humana e cartografia para o ENEM.',
    area: 'geografia',
    difficulty: 'medium',
    durationMinutes: 60,
    questionCount: 20,
  },
  {
    id: '6',
    title: 'Matemática Avançada',
    description:
      'Prova desafiadora com questões de cálculo, trigonometria e geometria analítica.',
    area: 'matematica',
    difficulty: 'hard',
    durationMinutes: 150,
    questionCount: 35,
  },
];

// Simular latência e erros ocasionais
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const shouldFail = (): boolean => {
  return Math.random() < 0.1; // 10% chance de erro
};
