import PrimaryButton from '@/components/common/Button/PrimaryButton/PrimaryButton';
import CancelButton from '@/components/common/CancelButton/CancelButton';
import TextBody from '@/components/common/Typography/TextBody/TextBody';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';

// Hooks
import { useAppTheme } from '@/providers/ThemeProvider';
import { useAppStore } from '@/store/useAppStore';

// Utils And Types
import { requestAndGetUserLocation, openAppSettings } from '@/features/location/locationService';

export default function LocationPermissionsModalScreen() {
  const { theme } = useAppTheme();
  const route = useRouter();
  const { updateUserLocation } = useAppStore((state) => state);
  const [isRequesting, setIsRequesting] = useState(false);

  const handleCancel = () => {
    route.dismiss();
  };

  const handleRequestPermission = async () => {
    setIsRequesting(true);

    try {
      const result = await requestAndGetUserLocation();

      if (result.status === 'granted' && result.location) {
        // Permission granted! Update location and close modal
        updateUserLocation(result.location);
        route.dismiss();
      } else if (result.status === 'settings') {
        // User has permanently denied - need to go to settings
        // Close modal and open settings
        route.dismiss();
        setTimeout(() => {
          openAppSettings();
        }, 300);
      } else {
        // User denied but can ask again
        // Just close modal - they can try again later
        route.dismiss();
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
      route.dismiss();
    } finally {
      setIsRequesting(false);
    }
  };

  const handleOpenSettings = () => {
    route.dismiss();
    setTimeout(() => {
      openAppSettings();
    }, 300);
  };

  return (
    <View style={{ ...styles.container, padding: theme.spacing.md, backgroundColor: theme.colors.surface }}>
      <View style={{ alignItems: 'center' }}>
        <TextBody style={{ marginVertical: 10 }}>Event Pulse uses your location to find the best events near you.</TextBody>
        <TextBody style={{ marginBottom: 20 }}>Tap "Enable Location" to grant permission, or go to Device Settings to enable it manually.</TextBody>
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <PrimaryButton
          title={isRequesting ? 'Requesting...' : 'Enable Location'}
          onPress={handleRequestPermission}
          disabled={isRequesting}
        />

        <PrimaryButton
          title='Device Settings'
          onPress={handleOpenSettings}
        />
      </View>
      <View style={styles.cancelContainer}>
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
  cancelContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
});
