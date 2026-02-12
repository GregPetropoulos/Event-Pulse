import * as Location from 'expo-location';
import { Alert, Platform, Linking } from 'react-native';

export type AppLocationResult = {
  status: 'granted' | 'denied' | 'settings';
  location?: {
    latitude: number;
    longitude: number;
  };
};

/**
 * Check if location permission is granted WITHOUT requesting it
 * Use this for passive checks (like on app startup, map render, etc.)
 */
export async function checkLocationPermission(): Promise<'granted' | 'denied'> {
  try {
    const { status } = await Location.getForegroundPermissionsAsync();
    return status === 'granted' ? 'granted' : 'denied';
  } catch (error) {
    console.error('Error checking location permission:', error);
    return 'denied';
  }
}

/**
 * Request location permission and get user's location
 * Only call this when user explicitly interacts (like pressing a button)
 * DO NOT call this automatically on mount or in useEffect
 */
export async function requestAndGetUserLocation(): Promise<AppLocationResult> {
  try {
    // 1. Check existing permissions
    let { status, canAskAgain } = await Location.getForegroundPermissionsAsync();

    // 2. If not granted, request permission
    if (status !== 'granted') {
      // Check if we can ask again
      if (!canAskAgain) {
        // User has permanently denied - must go to settings
        return { status: 'settings' };
      }

      const request = await Location.requestForegroundPermissionsAsync();
      status = request.status;
      canAskAgain = request.canAskAgain;
    }

    // 3. Still not granted?
    if (status !== 'granted') {
      // Check if permanently denied now
      if (!canAskAgain) {
        return { status: 'settings' };
      }

      // User denied but can ask again
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
    console.error('Location error:', err);
    return { status: 'denied' };
  }
}

/**
 * Get user location if permission is already granted
 * Returns null if permission not granted (does NOT request)
 */
export async function getUserLocationIfGranted(): Promise<AppLocationResult> {
  try {
    const { status } = await Location.getForegroundPermissionsAsync();

    if (status !== 'granted') {
      return { status: 'denied' };
    }

    // Permission granted — get coordinates
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
    console.error('Location error:', err);
    return { status: 'denied' };
  }
}

/**
 * Show alert and open settings
 */
export function showSettingsAlert() {
  Alert.alert('Location Permission Needed', 'You denied location access. To enable it, please go to your device settings.', [
    { text: 'Cancel', style: 'cancel' },
    {
      text: 'Open Settings',
      onPress: () => openAppSettings(),
    },
  ]);
}

export function openAppSettings() {
  if (Platform.OS === 'ios') {
    Linking.openURL('app-settings:');
  } else {
    Linking.openSettings();
  }
}
