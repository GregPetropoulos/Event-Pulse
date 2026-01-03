import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@/providers/ThemeProvider';

export function renderScreen(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}
