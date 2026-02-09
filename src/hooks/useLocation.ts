import { useState, useCallback } from 'react';
import * as Location from 'expo-location';
import { Alert, Platform, Linking } from 'react-native';

export type AppLocationResult = {
  status: 'granted' | 'denied' | 'settings';
  location?: {
    latitude: number;
    longitude: number;
  };
};

export type UseLocationReturn = {
  location: AppLocationResult | null;
  loading: boolean;
  error: string | null;
  requestLocation: () => Promise<void>;
  openSettings: () => void;
};

export function useLocation(): UseLocationReturn {
  const [location, setLocation] = useState<AppLocationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Check existing permissions first
      const { status: currentStatus, canAskAgain } = await Location.getForegroundPermissionsAsync();
      
      // 2. If already granted, just get the location
      if (currentStatus === 'granted') {
        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        setLocation({
          status: 'granted',
          location: {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          },
        });
        return;
      }

      // 3. If not granted and can't ask again, set to settings state
      if (!canAskAgain) {
        setLocation({ status: 'settings' });
        return;
      }

      // 4. If we previously denied, don't ask again automatically
      // Only ask if location state is null (first time) or was previously granted
      if (location?.status === 'denied' || location?.status === 'settings') {
        console.log('Location already denied, not asking again');
        setLocation({ status: 'denied' });
        return;
      }

      // 5. First time or checking after user might have enabled in settings
      // Only request if we haven't set a denied state yet
      const request = await Location.requestForegroundPermissionsAsync();
      
      if (request.status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        setLocation({
          status: 'granted',
          location: {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          },
        });
      } else if (!request.canAskAgain) {
        Alert.alert(
          'Location Permission Needed',
          'You denied location access. To enable it, open your device settings.',
          [
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
          ]
        );
        setLocation({ status: 'settings' });
      } else {
        setLocation({ status: 'denied' });
      }
    } catch (err) {
      console.log('Location error:', err);
      setError(err instanceof Error ? err.message : 'Failed to get location');
      setLocation({ status: 'denied' });
    } finally {
      setLoading(false);
    }
  }, [location?.status]);

  const openSettings = useCallback(() => {
    Linking.openSettings();
  }, []);

  return {
    location,
    loading,
    error,
    requestLocation,
    openSettings,
  };
}