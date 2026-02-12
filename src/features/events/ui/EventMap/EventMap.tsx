import { IconSymbol } from '@/components/common/Icon/IconSymbol';
import { AppleMaps, GoogleMaps } from 'expo-maps';
import { useRef, useState, useEffect } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import TextBody from '../../../../components/common/Typography/TextBody/TextBody';

// Hooks
import { useEvents } from '@/features/events/hooks';
import { useAppTheme } from '@/providers/ThemeProvider';
import { useAppStore } from '@/store/useAppStore';
import { usePathname, useRouter } from 'expo-router';

// Types and Utils
import { NYC_DEFAULT } from '@/constants/mapDefaults';
import { formatIsoToWeekDayMMDDYYYY } from '@/utils/dateUtils';
import { AppleMapsMarker, AppleMapsViewType } from 'expo-maps/build/apple/AppleMaps.types';
import { GoogleMapsMarker, GoogleMapsViewType } from 'expo-maps/build/google/GoogleMaps.types';
import { IEvent } from '../../types';
import { checkLocationPermission } from '@/features/location/locationService';

const EventMap = () => {
  const { theme } = useAppTheme();
  const appleMapRef = useRef<AppleMapsViewType>(null);
  const googleMapRef = useRef<GoogleMapsViewType>(null);
  const { userCoords } = useAppStore((state) => state);
  const { data, isLoading, error } = useEvents({
    lat: userCoords.latitude,
    lng: userCoords.longitude,
    radius: 30,
  });

  const [locationIndex, setLocationIndex] = useState(0);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const route = useRouter();
  const pathname = usePathname();

  // Check permissions on mount only
  useEffect(() => {
    verifyLocationPermission();
  }, [userCoords]);

  const verifyLocationPermission = async () => {
    const status = await checkLocationPermission();
    setHasLocationPermission(status === 'granted');
  };

  const initialCameraPosition = {
    coordinates: userCoords,
    zoom: 9,
  };

  const handleChangeWithRef = (direction: 'next' | 'prev' | 'me') => {
    const newIndex = locationIndex + (direction === 'next' ? 1 : -1);
    const nextLocation = data?.events[newIndex];
    if (direction === 'me' || (data?.events && newIndex > data?.events?.length - 1)) {
      appleMapRef.current?.setCameraPosition(initialCameraPosition);
      googleMapRef.current?.setCameraPosition(initialCameraPosition);
    } else {
      appleMapRef.current?.setCameraPosition({
        coordinates: {
          latitude: nextLocation?.lat,
          longitude: nextLocation?.lng,
        },
        zoom: 14,
      });
      googleMapRef.current?.setCameraPosition({
        coordinates: {
          latitude: nextLocation?.lat,
          longitude: nextLocation?.lng,
        },
        zoom: 14,
      });
    }
    // update after animation is triggered
    setLocationIndex(newIndex);
  };

  const handleNavToMapScreen = () => {
    if (pathname === '/map') {
      route.back();
    } else {
      route.navigate('/map');
    }
  };

  const handleLocationPermissionModal = async () => {
    // Re-check permission status before opening modal
    // User might have granted it in settings
    const status = await checkLocationPermission();
    setHasLocationPermission(status === 'granted');

    // Always open modal - it will handle both requesting and settings
    route.navigate('/modals/LocationPermission');
  };

  const renderMapControls = () => {
    return (
      <>
        <View
          style={{
            ...styles.controlsContainer,
            backgroundColor: theme.colors.surface,
          }}
          pointerEvents='auto'>
          <Pressable
            accessibilityLabel='Me Button'
            hitSlop={20}
            onPress={() => handleChangeWithRef('me')}>
            <IconSymbol
              name='globe.americas'
              color={theme.colors.secondary}
            />
          </Pressable>
          <Pressable
            accessibilityLabel='Location on and off'
            accessibilityRole='button'
            hitSlop={20}
            onPress={handleLocationPermissionModal}>
            {hasLocationPermission ? (
              <IconSymbol
                name='mappin'
                color={theme.colors.success}
              />
            ) : (
              <IconSymbol
                name='mappin.slash'
                color={theme.colors.error}
              />
            )}
          </Pressable>
          <Pressable
            accessibilityLabel='Expand Map Button'
            accessibilityRole='button'
            hitSlop={20}
            onPress={handleNavToMapScreen}>
            <IconSymbol
              name='map.fill'
              color={theme.colors.secondary}
            />
          </Pressable>
        </View>
      </>
    );
  };

  interface IGroupByVenue {
    key: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    events: IEvent[];
    title: string;
    tintColor: string;
  }

  const groupByVenue = (): IGroupByVenue[] => {
    // Only show the venue marker
    // Each venue group has an array of events associated it
    const mapObj = new Map<string, IGroupByVenue>();
    data?.events.forEach((event, idx) => {
      const latitude = parseFloat(event.lat.toFixed(4));
      const longitude = parseFloat(event.lng.toFixed(4));
      const title = event.venue;
      const key = `${latitude},${longitude}`;
      const existing = mapObj.get(key);
      if (existing) {
        existing.events.push(event);
      } else {
        mapObj.set(key, { key, coordinates: { latitude, longitude }, events: [event], title, tintColor: theme.colors.textPrimary });
      }
    });
    return Array.from(mapObj.values());
  };

  const appleMarkers: AppleMapsMarker[] = groupByVenue().map((item) => ({
    coordinates: item.coordinates,
    title: item.events.length > 1 ? `${item.title} + ${item.events.length - 1} more` : item.title,
    tintColor: item.tintColor,
  }));

  const googleMarkers: GoogleMapsMarker[] = groupByVenue().map((item) => ({
    coordinates: item.coordinates,
    title: item.title,
    snippet: item.events.length > 1 ? 'Tap to see all events' : `${item.events[0].city} ${formatIsoToWeekDayMMDDYYYY(item.events[0].date)}`,
  }));

  if (Platform.OS === 'ios') {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <AppleMaps.View
            ref={appleMapRef}
            style={StyleSheet.absoluteFill}
            uiSettings={{
              compassEnabled: hasLocationPermission,
              myLocationButtonEnabled: hasLocationPermission,
            }}
            properties={{ isMyLocationEnabled: hasLocationPermission }}
            cameraPosition={initialCameraPosition}
            markers={appleMarkers}
          />
        </View>
        {renderMapControls()}
      </View>
    );
  } else if (Platform.OS === 'android') {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <GoogleMaps.View
            ref={googleMapRef}
            style={StyleSheet.absoluteFill}
            uiSettings={{
              compassEnabled: hasLocationPermission,
              myLocationButtonEnabled: hasLocationPermission,
            }}
            properties={{ isMyLocationEnabled: hasLocationPermission }}
            cameraPosition={initialCameraPosition}
            markers={googleMarkers}
          />
        </View>
        {renderMapControls()}
      </View>
    );
  } else {
    return (
      <TextBody
        style={{
          flex: 1,
          marginVertical: theme.spacing.lg,
          textAlign: 'center',
        }}
        accessibilityLabel='Text Body'
        accessibilityRole='text'>
        Maps are only available on Android and iOS ☹️
      </TextBody>
    );
  }
};

export default EventMap;

const styles = StyleSheet.create({
  controlsContainer: {
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
