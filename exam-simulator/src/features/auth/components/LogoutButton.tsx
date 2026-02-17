import { Button, ButtonProps } from '@/shared/ui';
import { useAuthUser } from '../hooks/useAuthUser';
import { LogOut } from 'lucide-react';

interface LogoutButtonProps extends Omit<ButtonProps, 'onClick'> {
  returnTo?: string;
}

export const LogoutButton = ({ returnTo, variant = 'ghost', ...buttonProps }: LogoutButtonProps) => {
  const { logout, isLoading } = useAuthUser();

  const handleLogout = () => {
    logout({ returnTo: returnTo || window.location.origin });
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={isLoading}
      variant={variant}
      {...buttonProps}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Sair
    </Button>
  );
};
