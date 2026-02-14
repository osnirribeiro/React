import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Stack, Switch, Select } from '@/shared/ui';
import { useSettingsStore } from '../store/settingsStore';
import { Moon, Sun, Type } from 'lucide-react';

export const SettingsPanel = () => {
  const { theme, fontSize, setTheme, setFontSize } = useSettingsStore();
  const isDark = theme === 'dark';

  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', checked);
  };

  const fontSizeOptions = [
    { value: 'sm', label: 'Pequeno' },
    { value: 'md', label: 'Médio' },
    { value: 'lg', label: 'Grande' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações</CardTitle>
        <CardDescription>Personalize sua experiência</CardDescription>
      </CardHeader>
      <CardContent>
        <Stack spacing="lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              <span className="font-medium">Modo Escuro</span>
            </div>
            <Switch checked={isDark} onCheckedChange={handleThemeToggle} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Type className="h-5 w-5" />
              <span className="font-medium">Tamanho da Fonte</span>
            </div>
            <Select
              options={fontSizeOptions}
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value as 'sm' | 'md' | 'lg')}
            />
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
};
