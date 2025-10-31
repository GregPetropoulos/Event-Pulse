import { Text, View, Switch, Button } from 'react-native';
import { ThemedView } from '@/components/common/ThemedView';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '@/providers/ThemeProvider';
export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { theme, toggleTheme, resetToSystem, mode } = useAppTheme();

  return (
    <ThemedView>
      <Text style={{ color: theme.colors.primary }}>HOME</Text>
      <Text style={{ ...theme.typography.title, color: theme.colors.textPrimary }}>EventPulse{mode}</Text>
      {/* <View> */}
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
      {/* <PrimaryButton
        title='TEST'
        onPress={toggleTheme}
      /> */}
      {/* </View> */}
    </ThemedView>
  );
}
