import TextBody from '@/components/common/Typography/TextBody/TextBody';
import { useEffect, useRef } from 'react';
import { AppState, View } from 'react-native';
import EventMap from '../../features/events/ui/EventMap/EventMap';
import EventList from '@/features/events/ui/EventList/EventList';
import Loader from '@/components/common/Loader/Loader';
// Hooks
import { useEvents } from '@/features/events/hooks';
import { useAppTheme } from '@/providers/ThemeProvider';
import { useAppStore } from '@/store/useAppStore';

// Service
import { getUserLocationIfGranted } from '@/features/location/locationService';

// Utils & Types
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
    // Only get location if permission is already granted
    // This won't show any permission dialogs
    const result = await getUserLocationIfGranted();

    if (result.status === 'granted' && result.location) {
      updateUserLocation(result.location);
    } else {
      // No permission - use fallback location
      // Don't update if already at NYC_DEFAULT to avoid unnecessary re-renders
      if (userCoords.latitude !== NYC_DEFAULT.latitude || userCoords.longitude !== NYC_DEFAULT.longitude) {
        updateUserLocation(NYC_DEFAULT);
      }
    }
  };

  useEffect(() => {
    // Check location on initial mount (won't request permission)
    updateAppStateLocation();

    // Subscribe to app state changes
    const subscription = AppState.addEventListener('change', async (nextAppState) => {
      // Transition from background/inactive to active
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        // User might have granted permission in settings
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
