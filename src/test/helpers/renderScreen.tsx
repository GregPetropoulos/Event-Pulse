import { ThemeProvider } from '@/providers/ThemeProvider';
import { render } from '@testing-library/react-native';
import React from 'react';
import { QueryProvider } from '@/providers/QueryProvider';

export function renderScreen(ui: React.ReactElement) {
  return render(
    <QueryProvider>
      <ThemeProvider>{ui}</ThemeProvider>
    </QueryProvider>,
  );
}
