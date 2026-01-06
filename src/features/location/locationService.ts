// utils/location.ts
import * as Location from 'expo-location';
import { Alert, Platform, Linking } from 'react-native';

export type AppLocationResult = {
  status: 'granted' | 'denied' | 'settings';
  location?: {
    latitude: number;
    longitude: number;
  };
};

export async function getUserLocation(): Promise<AppLocationResult> {
  try {
    // 1. Check existing permissions
    let { status } = await Location.getForegroundPermissionsAsync();
    // 2. Ask again if not granted
    if (status !== 'granted') {
      const request = await Location.requestForegroundPermissionsAsync();
      status = request.status;
    }

    // 3. Still not granted?
    if (status !== 'granted') {
      const canAskAgain = await Location.getForegroundPermissionsAsync();

      // User permanently denied → must go to settings manually
      if (!canAskAgain.canAskAgain) {
        Alert.alert('Location Permission Needed', 'You denied location access. To enable it, open your device settings.', [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Open Settings',
            onPress: () => {
              if (Platform.OS === 'ios') {
                Linking.openURL('app-settings:');
              } else {
                Linking.openSettings();
              }
            },
          },
        ]);

        return { status: 'settings' };
      }

      // User denied but still askable
      return { status: 'denied' };
    }

    // 4. Permission granted — get coordinates
    const loc = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    return {
      status: 'granted',
      location: {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      },
    };
  } catch (err) {
    console.log('Location error:', err);
    return { status: 'denied' };
  }
}
export function openAppSettings() {
  Linking.openSettings();
}
