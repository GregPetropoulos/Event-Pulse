import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React from 'react';
import { useAppTheme } from '@/providers/ThemeProvider';

const Loader = () => {
  const { theme } = useAppTheme();
  return (
    <View style={styles.activityView}>
      <ActivityIndicator
        size='large'
        color={theme.colors.primary}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  activityView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
