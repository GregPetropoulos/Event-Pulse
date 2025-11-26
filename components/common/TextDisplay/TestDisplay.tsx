import { Text } from 'react-native';
import React from 'react';
import { useAppTheme } from '@/providers/ThemeProvider';

type TextDisplayProps = {
  children: string | React.ReactNode;
  color?: string;
};
const TextDisplay = ({ children, color }: TextDisplayProps) => {
  const { theme } = useAppTheme();

  return <Text style={{ ...theme.typography.display, color: color ?? theme.colors.textPrimary }}>{children}</Text>;
};

export default TextDisplay;
