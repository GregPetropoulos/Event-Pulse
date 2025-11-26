import { Text } from 'react-native';
import React from 'react';
import { useAppTheme } from '@/providers/ThemeProvider';

type TextTitleProps = {
  children: string | React.ReactNode;
  color?: string;
};
const TextTitle = ({ children, color }: TextTitleProps) => {
  const { theme } = useAppTheme();

  return <Text style={{ ...theme.typography.title, color: color ?? theme.colors.textPrimary }}>{children}</Text>;
};

export default TextTitle;
