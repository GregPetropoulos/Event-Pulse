import * as Location from 'expo-location';
import { Linking, Platform } from 'react-native';

export type UserLocation = {
  latitude: number;
  longitude: number;
};

export const requestUserLocation = async (): Promise<UserLocation | null> => {
  // 1️⃣ Ask for foreground permission
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    return null;
  }

  // 2️⃣ Ensure location services are turned on (Android only)
  if (Platform.OS === 'android') {
    const isEnabled = await Location.hasServicesEnabledAsync();
    if (!isEnabled) {
      return null;
    }
  }

  // 3️⃣ Get location
  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
};

export function openAppSettings() {
  Linking.openSettings();
}
