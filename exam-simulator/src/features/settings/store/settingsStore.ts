import { create } from 'zustand';
import { storage } from '@/shared/utils/storage';

type Theme = 'light' | 'dark';
type FontSize = 'sm' | 'md' | 'lg';

interface SettingsState {
  theme: Theme;
  fontSize: FontSize;
  setTheme: (theme: Theme) => void;
  setFontSize: (size: FontSize) => void;
}

const STORAGE_KEY = 'exam-simulator-settings';

const loadSettings = (): Partial<SettingsState> => {
  return storage.get<Partial<SettingsState>>(STORAGE_KEY) || {};
};

export const useSettingsStore = create<SettingsState>((set) => {
  const saved = loadSettings();
  
  return {
    theme: saved.theme || 'light',
    fontSize: saved.fontSize || 'md',
    setTheme: (theme) => {
      set({ theme });
      storage.set(STORAGE_KEY, { ...loadSettings(), theme });
    },
    setFontSize: (fontSize) => {
      set({ fontSize });
      storage.set(STORAGE_KEY, { ...loadSettings(), fontSize });
    },
  };
});
