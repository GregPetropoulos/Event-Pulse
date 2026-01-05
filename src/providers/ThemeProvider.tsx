import { storage } from '@/storage/mmkv';
import { ThemeMode, THEMES } from '@/theme/theme';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

const THEME_KEY = 'themeMode'; //stored in MMKV

interface ThemeContextProps {
  mode: ThemeMode;
  theme: typeof THEMES.light;
  toggleTheme: () => void;
  setTheme: (m: ThemeMode) => void;
  resetToSystem: () => void;
}

const ThemeContext = createContext<ThemeContextProps | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemMode = useColorScheme() as ThemeMode; //light | dark | null

  // ✅ Only read storage once → prevents flashing
  const storedMode = storage.getString(THEME_KEY) as ThemeMode | 'system' | null;
  // initial mode: respect system unless user explicitly chose one
  const [mode, setModeState] = useState<ThemeMode>(storedMode && storedMode !== 'system' ? storedMode : systemMode || 'dark');
  // persist whenever user explicitly sets
  const setTheme = useCallback((m: ThemeMode) => {
    setModeState(m);
    storage.set(THEME_KEY, m);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = mode === 'dark' ? 'light' : 'dark';
    setTheme(next);
  }, [mode]);

  // allow “reset to auto” (system)
  const resetToSystem = useCallback(() => {
    storage.set(THEME_KEY, 'system');
    setModeState(systemMode || 'dark');
  }, [systemMode]);

  // watch system preference changes
  useEffect(() => {
    if (storedMode === 'system' || !storedMode) {
      setModeState(systemMode || 'dark');
    }
  }, [systemMode, storedMode]);

  const theme = THEMES[mode];

  return <ThemeContext.Provider value={{ mode, theme, toggleTheme, setTheme, resetToSystem }}>{children}</ThemeContext.Provider>;
};

export const useAppTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useAppTheme must be used in the ThemeProvider');
  return ctx;
};
