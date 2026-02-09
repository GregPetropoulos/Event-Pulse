import { IconSymbol } from '@/components/common/Icon/IconSymbol';
import { AppleMaps, GoogleMaps } from 'expo-maps';
import { useRef, useState } from 'react';
import { Button, Platform, Pressable, StyleSheet, View } from 'react-native';
import TextBody from '../../../../components/common/Typography/TextBody/TextBody';
import Loader from '@/components/common/Loader/Loader';

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
//! Will need to configure this for android https://docs.expo.dev/versions/latest/sdk/maps/

const EventMap = () => {
  const { theme } = useAppTheme();
  const appleMapRef = useRef<AppleMapsViewType>(null);
  const googleMapRef = useRef<GoogleMapsViewType>(null);
  const { userCoords, locationPermissionGranted } = useAppStore((state) => state);

  console.log('USERCORDS IN EVENTMAP MUST BE SET BY STATE WHEN HOME SCREEN CHECKS FOR PERMISSIONS', userCoords);
  const { data, isLoading, error } = useEvents({
    lat: userCoords.latitude,
    lng: userCoords.longitude,
    radius: 30,
  });

  const [locationIndex, setLocationIndex] = useState(0);
  const route = useRouter();
  const pathname = usePathname();
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

  const handleLocationPermissionModal = () => {
    route.navigate('/modals/LocationPermission');
  };
  const renderMapControls = () => {
    return (
      <View>
        {/* <View
          style={{ flex: 1, borderColor:'green', borderWidth:2 }}
          pointerEvents='none'
          /> */}
        <View
          style={{ ...styles.controlsContainer, backgroundColor: theme.colors.surface }}
          pointerEvents='auto'>
          {/* <Button
            accessibilityLabel='Previous Button'
            title='Prev'
            color={theme.colors.textPrimary}
            onPress={() => handleChangeWithRef('prev')}
          />
          <Button
            accessibilityLabel='Next Button'
            title='Next'
            color={theme.colors.textPrimary}
            onPress={() => handleChangeWithRef('next')}
          /> */}
          <Button
            accessibilityLabel='Me Button'
            title='Me'
            color={theme.colors.textPrimary}
            onPress={() => handleChangeWithRef('me')}
          />
          <Pressable
            accessibilityLabel='Location on and off'
            accessibilityRole='button'
            onPress={handleLocationPermissionModal}>
            {userCoords.latitude !== NYC_DEFAULT.latitude && userCoords.longitude !== NYC_DEFAULT.longitude ? (
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
            onPress={handleNavToMapScreen}>
            <IconSymbol
              name='map.fill'
              color={theme.colors.textPrimary}
            />
          </Pressable>
        </View>
      </View>
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
    // if(userCoords.latitude &&userCoords.longitude && data && data?.events?.length>0){

    data?.events.forEach((event: IEvent, idx: number) => {
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

  // Only enable "My Location" if we have permission
  // const hasLocationPermission = location?.status === 'granted';
  const hasLocationPermission = locationPermissionGranted;

  if (Platform.OS === 'ios') {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <AppleMaps.View
            ref={appleMapRef}
            style={StyleSheet.absoluteFill}
            uiSettings={{ compassEnabled: hasLocationPermission, myLocationButtonEnabled: hasLocationPermission }}
            properties={{ isMyLocationEnabled: hasLocationPermission }}
            cameraPosition={initialCameraPosition}
            markers={appleMarkers}
            // onMarkerClick={(props)=>console.log("PROPS",props)}
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
            uiSettings={{ compassEnabled: hasLocationPermission, myLocationButtonEnabled: hasLocationPermission }}
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
    paddingVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
