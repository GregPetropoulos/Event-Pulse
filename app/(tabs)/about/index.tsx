import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useAppTheme } from '@/providers/ThemeProvider';
const about = () => {
  const {
    theme: {
      colors,
      typography: { aiQuote },
    },
  } = useAppTheme();
  return (
    <View>
      <Text style={{ ...aiQuote, color: colors.textSecondary }}>about</Text>
    </View>
  );
};

export default about;

const styles = StyleSheet.create({});
