import { ThemedView } from '@/components/common/ThemedView';
import {View, Text, Switch, Button } from 'react-native';
import { useAppTheme } from '@/providers/ThemeProvider';

const Settings = () => {
  const { theme, toggleTheme, resetToSystem, mode } = useAppTheme();
  return (
    <View>
      <Text>Settings</Text>
      <Switch
        value={mode === 'dark'}
        onValueChange={toggleTheme}
        thumbColor={theme.colors.primary}
        trackColor={{ true: theme.colors.secondary, false: '#888' }}
        style={{ marginVertical: 20 }}
      />

      <Button
        title='Reset to System'
        onPress={resetToSystem}
        color={theme.colors.primary}
      />
    </View>
  );
};

export default Settings;
