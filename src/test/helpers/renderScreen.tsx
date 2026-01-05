import { ThemeProvider } from '@/providers/ThemeProvider';
import { render } from '@testing-library/react-native';
import React from 'react';

export function renderScreen(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}
