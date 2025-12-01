import PrimaryButton from '@/components/common/PrimaryButton/PrimaryButton';
import CancelButton from '@/components/common/CancelButton/CancelButton';
import TextBody from '@/components/common/TextBody/TextBody';
import { useAppTheme } from '@/providers/ThemeProvider';
import { openAppSettings } from '@/utils/location';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function LocationPermissionsModalScreen() {
  const { theme } = useAppTheme();
  const route = useRouter();
  const handleCancel = () => {
    route.dismiss();
  };
  const handleOpenSettings = () => {
    route.dismiss();
    openAppSettings();
  };
  return (
    <View style={{ ...styles.container, padding: theme.spacing.md, backgroundColor: theme.colors.surface }}>
      <View style={{ alignItems: 'center' }}>
        <TextBody style={{ marginVertical: 10 }}>Event Pulse uses your location to find the best events near you.</TextBody>
        <TextBody>Enable the location serivces on your device settings.</TextBody>
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <PrimaryButton
          title='Device Settings'
          onPress={handleOpenSettings}
        />

        <CancelButton onPress={handleCancel} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
