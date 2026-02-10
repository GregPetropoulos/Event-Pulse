import TextBody from '@/components/common/Typography/TextBody/TextBody';
import { useEffect, useRef } from 'react';
import { ActivityIndicator, AppState, StyleSheet, View } from 'react-native';
import EventMap from '../../features/events/ui/EventMap/EventMap';
import EventList from '@/features/events/ui/EventList/EventList';
import Loader from '@/components/common/Loader/Loader';
// Hooks
import { useEvents } from '@/features/events/hooks';
import { useAppTheme } from '@/providers/ThemeProvider';
import { useAppStore } from '@/store/useAppStore';

// Service
import { getUserLocation } from '@/features/location/locationService';

// Utils & Types
import TextSmall from '@/components/common/Typography/TextSmall/TextSmall';
import { NYC_DEFAULT } from '@/constants/mapDefaults';

export default function HomeScreen() {
  const appState = useRef(AppState.currentState);
  const { theme } = useAppTheme();
  const { userCoords, updateUserLocation } = useAppStore((state) => state);

  const { data, isLoading, error } = useEvents({
    lat: userCoords.latitude,
    lng: userCoords.longitude,
    radius: 30,
    size: 100,
  });

  const updateAppStateLocation = async () => {
    const result = await getUserLocation();
    if (result.status === 'granted' && result.location) {
      updateUserLocation(result.location);
    } else {
      // Handle "no permission" mode – maybe default to a fallback location
      updateUserLocation(NYC_DEFAULT); // NYC fallback
    }
  };

  useEffect(() => {
    // Subscribe to app state changes for detecting when app is is in background or foreground
    const subscription = AppState.addEventListener('change', async (nextAppState) => {
      // Transition from background/inactive to active
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        // console.log('App returned to foreground. Re-checking settings...');
        updateAppStateLocation();
      }
      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}>
      <View style={{ flex: 1 }}>
        <EventMap />
      </View>
      <View style={{ flex: 1 }}>
        {error && <TextBody>{error.message}</TextBody>}
        <EventList events={data?.events} />
      </View>
    </View>
  );
}
