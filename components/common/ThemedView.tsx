import { View, type ViewProps } from 'react-native';

// import { useThemeColor } from '@/hooks/use-theme-color';
import { useAppTheme } from '@/providers/ThemeProvider';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { ReactNode } from 'react';

interface ThemedViewProps {
  title?: string;
  children: ReactNode; // Type the children prop as ReactNode
}
export const ThemedView = ({ children }: ThemedViewProps): ReactNode => {
  const { top, left, right, bottom } = useSafeAreaInsets();
  const {
    theme: { colors },
  } = useAppTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        borderColor: 'red',
        borderWidth: 1,
        // paddingTop: top,
        // paddingBottom: bottom,
        paddingLeft: left + 15,
        paddingRight: right + 15,
      }}>
      {children}
    </SafeAreaView>
  );
};
