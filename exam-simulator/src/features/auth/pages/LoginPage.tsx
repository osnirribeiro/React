import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/shared/ui';
import { LoginButton } from '../components';
import { useAuthUser } from '../hooks/useAuthUser';
import { BookOpen, GraduationCap } from 'lucide-react';
import { Skeleton } from '@/shared/ui';

export const LoginPage = () => {
  const { isAuthenticated, isLoading } = useAuthUser();
  const location = useLocation();
  const navigate = useNavigate();

  const from =
    (location.state as { from?: { pathname?: string } })?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, from]);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader className="space-y-4 text-center">
          <Skeleton className="mx-auto h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="mx-auto h-8 w-48" />
            <Skeleton className="mx-auto h-4 w-64" />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-12 w-full rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <Card className="w-full border-2 shadow-soft-lg">
      <CardHeader className="space-y-4 pb-4 text-center">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
            <GraduationCap className="h-8 w-8" />
          </div>
        </div>
        <div className="space-y-2">
          <CardTitle className="text-3xl font-bold">Bem-vindo</CardTitle>
          <CardDescription className="text-base">
            Faça login para acessar o Exam Simulator
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-4">
            <BookOpen className="h-5 w-5 text-primary" />
            <div className="flex-1 text-sm">
              <p className="font-medium">Simulador de Provas</p>
              <p className="text-muted-foreground">
                Pratique com questões reais e melhore seu desempenho
              </p>
            </div>
          </div>
        </div>

        <LoginButton className="w-full" size="lg" returnTo={from} />

        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          Ao fazer login, você concorda com nossos{' '}
          <a href="#" className="text-primary hover:underline">
            termos de uso
          </a>{' '}
          e{' '}
          <a href="#" className="text-primary hover:underline">
            política de privacidade
          </a>
          .
        </p>
      </CardContent>
    </Card>
  );
};
