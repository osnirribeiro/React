import React, { useEffect } from 'react';
import { useSettingsStore } from '@/features/settings';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useSettingsStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return <>{children}</>;
};
