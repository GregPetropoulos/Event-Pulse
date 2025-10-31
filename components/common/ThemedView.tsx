import { View, type ViewProps } from 'react-native';

// import { useThemeColor } from '@/hooks/use-theme-color';
import { useAppTheme } from '@/providers/ThemeProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
// export type ThemedViewProps = ViewProps & {
//   lightColor?: string;
//   darkColor?: string;
// };

export const ThemedView = ({ children }: any) => {
  const {
    theme: { colors },
  } = useAppTheme();

  return <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>{children}</SafeAreaView>;
};
