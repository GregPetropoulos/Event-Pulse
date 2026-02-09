import TextBody from '@/components/common/Typography/TextBody/TextBody';
import { useEffect, useRef, useCallback, useState } from 'react';
import { AppState, StyleSheet, View, Button } from 'react-native';
import EventMap from '../../features/events/ui/EventMap/EventMap';
import EventList from '@/features/events/ui/EventList/EventList';

// Hooks
import { useAppTheme } from '@/providers/ThemeProvider';
import { useAppStore } from '@/store/useAppStore';
import { useLocation } from '@/hooks/useLocation';

// Utils & Types
import Loader from '@/components/common/Loader/Loader';

// Default location - NYC
const NYC_DEFAULT = {
  latitude: 40.7128,
  longitude: -74.0060,
};

export default function HomeScreen() {
  const appState = useRef(AppState.currentState);
  const { theme } = useAppTheme();
  const { userCoords, updateUserLocation, setLocationPermission } = useAppStore((state) => state);
  const { location, loading, error, requestLocation } = useLocation();
  const [hasRequestedOnMount, setHasRequestedOnMount] = useState(false);

  // Update store when location changes
  useEffect(() => {
    if (location?.status === 'granted' && location.location) {
      updateUserLocation({
        latitude: location.location.latitude,
        longitude: location.location.longitude,
      });
       setLocationPermission(true);
    } else if (location?.status === 'denied' || location?.status === 'settings') {
      // Set default NYC location when permission is denied
      console.log('Permission denied, using NYC default location');
      updateUserLocation(NYC_DEFAULT);
       setLocationPermission(false);
    }
  }, [location, updateUserLocation]);

  // Request location - this will check current permission status
  const handleLocationRequest = useCallback(async () => {
    try {
      await requestLocation();
    } catch (err) {
      console.error('Failed to request location:', err);
    }
  }, [requestLocation]);

useEffect(() => {
  // Initial location request - only once
  if (!hasRequestedOnMount) {
    handleLocationRequest();
    setHasRequestedOnMount(true);
  }

  // Subscribe to app state changes
  const subscription = AppState.addEventListener('change', async (nextAppState) => {
    // Transition from background/inactive to active
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App returned to foreground. Re-checking location permissions...');
      
      // Only re-request if we're in a 'settings' state (user might have enabled it)
      // Or if previously granted (to refresh location)
      if (location?.status === 'settings' || location?.status === 'granted') {
        await handleLocationRequest();
      }
    }
    appState.current = nextAppState;
  });

  return () => subscription.remove();
}, [handleLocationRequest, hasRequestedOnMount, location?.status]);


  // useEffect(() => {
  //   // Initial location request - only once
  //   if (!hasRequestedOnMount) {
  //     handleLocationRequest();
  //     setHasRequestedOnMount(true);
  //   }

  //   // Subscribe to app state changes
  //   const subscription = AppState.addEventListener('change', async (nextAppState) => {
  //     // Transition from background/inactive to active
  //     if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
  //       console.log('App returned to foreground. Re-checking location permissions...');
  //       // Always re-check when returning from background
  //       // This handles cases where user changed permissions in settings
  //       await handleLocationRequest();
  //     }
  //     appState.current = nextAppState;
  //   });

  //   return () => subscription.remove();
  // }, [handleLocationRequest, hasRequestedOnMount]);

  console.log('userCoords==========>', userCoords);
  console.log('location status=====>', location?.status);

  // Show loader while getting initial location
  if (loading && !location) {
    return (
      <View style={[styles.activityView, { backgroundColor: theme.colors.background }]}>
        <Loader />
        <TextBody style={{ marginTop: 16 }}>Getting your location...</TextBody>
      </View>
    );
  }

  // Show error state if needed (but not for denied - that falls back to NYC)
  if (error && location?.status !== 'denied' && location?.status !== 'settings') {
    return (
      <View style={[styles.activityView, { backgroundColor: theme.colors.background }]}>
        <TextBody>Unable to get location</TextBody>
        <TextBody style={{ marginTop: 8, opacity: 0.7 }}>{error}</TextBody>
        <Button 
          title="Try Again" 
          onPress={handleLocationRequest}
          color={theme.colors.primary}
        />
      </View>
    );
  }

  // Don't render map/list until we have a location (either real or default)
  if (!userCoords) {
    return (
      <View style={[styles.activityView, { backgroundColor: theme.colors.background }]}>
        <Loader />
        <TextBody style={{ marginTop: 16 }}>Loading...</TextBody>
      </View>
    );
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
        <EventList />
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  activityView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});