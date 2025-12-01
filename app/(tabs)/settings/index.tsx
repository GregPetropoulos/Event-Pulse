import { View, Text, Switch, Button } from 'react-native';
import { useAppTheme } from '@/providers/ThemeProvider';
import Link from '@/components/common/Link/Link';

const Settings = () => {
  const { theme, toggleTheme, resetToSystem, mode } = useAppTheme();
  const formatMode = mode[0].toUpperCase() + mode.slice(1);
  return (
    <View>
      <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
        <Text style={{ ...theme.typography.body, color: theme.colors.textPrimary }}>{`Toggle ${formatMode} Mode`}</Text>
        <Switch
          value={mode === 'dark'}
          onValueChange={toggleTheme}
          thumbColor={theme.colors.primary}
          trackColor={{ true: theme.colors.secondary, false: '#47f00a' }}
          style={{ marginVertical: 20 }}
        />
      </View>

      <Button
        title='Reset to System'
        onPress={resetToSystem}
        color={theme.colors.primary}
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Text style={{ ...theme.typography.body, color: theme.colors.textPrimary }}> Enable Location on/off</Text>
        <Link href='/locationPermissionsModal'>Enable</Link>
      </View>
    </View>
  );
};

export default Settings;
