import { Text } from 'react-native';
import React from 'react';
import { useAppTheme } from '@/providers/ThemeProvider';

type TextBodyProps = {
  children: string | React.ReactNode;
  color?: string;
};
const TextBody = ({ children, color }: TextBodyProps) => {
  const { theme } = useAppTheme();

  return <Text style={{ ...theme.typography.body, color: color ?? theme.colors.textPrimary }}>{children}</Text>;
};

export default TextBody;
