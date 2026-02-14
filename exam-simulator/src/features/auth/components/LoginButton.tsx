import React from 'react';
import { Button, ButtonProps } from '@/shared/ui';
import { useAuthUser } from '../hooks/useAuthUser';
import { LogIn } from 'lucide-react';

interface LoginButtonProps extends Omit<ButtonProps, 'onClick'> {
  returnTo?: string;
}

export const LoginButton = ({ returnTo, ...buttonProps }: LoginButtonProps) => {
  const { login, isLoading } = useAuthUser();

  const handleLogin = () => {
    login({
      appState: {
        returnTo: returnTo || window.location.pathname,
      },
    });
  };

  return (
    <Button
      onClick={handleLogin}
      disabled={isLoading}
      loading={isLoading}
      {...buttonProps}
    >
      <LogIn className="mr-2 h-4 w-4" />
      Entrar
    </Button>
  );
};
