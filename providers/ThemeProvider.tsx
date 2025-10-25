import React, { useState, createContext, ReactNode, useContext } from 'react';
import { darkTheme, lightTheme } from '@/theme/theme';
import { useColorScheme } from 'react-native';

export type Theme = typeof darkTheme;

enum modeTheme {
  LIGHT = 'light',
  DARK = 'dark',
}

interface ThemeContextValue {
  theme: Theme;
  setOverrideMode: (mode: modeTheme.LIGHT | modeTheme.DARK | null) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: darkTheme,
  setOverrideMode: () => {},
}); // default to dark

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemMode = useColorScheme(); //light or dark
  const [overrideMode, setOverrideMode] = useState<modeTheme.LIGHT | modeTheme.DARK | null>(null);
  const currentTheme =
    overrideMode === modeTheme.LIGHT
      ? lightTheme
      : overrideMode === modeTheme.DARK
        ? darkTheme
        : systemMode === modeTheme.LIGHT
          ? lightTheme
          : darkTheme;
  return <ThemeContext value={{ theme: currentTheme, setOverrideMode }}>{children}</ThemeContext>;
};

export const useTheme = () => useContext(ThemeContext);
// TODO  SET STYLE BACKGROUNDS AND CHECK LIGHT/DARKSWITCH
