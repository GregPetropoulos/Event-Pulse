import { IconSymbol } from '@/components/common/Icon/IconSymbol';
import { AppleMaps, GoogleMaps } from 'expo-maps';
import { useRef, useState } from 'react';
import { Button, Platform, Pressable, StyleSheet, View } from 'react-native';
import TextBody from '../common/Typography/TextBody/TextBody';

// Hooks
import { useAppTheme } from '@/providers/ThemeProvider';
import { useAppStore } from '@/store/useAppStore';
import { usePathname, useRouter } from 'expo-router';
import { useEvents } from '@/features/events/hooks';

// Types and Utils
import { locationList } from '@/test/mocks/mockLocationList';
import { NYC_DEFAULT } from '@/constants/mapDefaults';
import { AppleMapsViewType } from 'expo-maps/build/apple/AppleMaps.types';
import { GoogleMapsViewType } from 'expo-maps/build/google/GoogleMaps.types';

//! Will need to configure this for android https://docs.expo.dev/versions/latest/sdk/maps/

const Map = () => {
  const { theme } = useAppTheme();
  const appleMapRef = useRef<AppleMapsViewType>(null);
  const googleMapRef = useRef<GoogleMapsViewType>(null);
  const { userCoords } = useAppStore((state) => state);
  const { data, isLoading, error } = useEvents({
    lat: userCoords?.latitude ?? 0,
    lng: userCoords?.longitude ?? 0,
    radius: 10,
  }); 
  console.log('useEvents Hook --> Data', data);
  const [locationIndex, setLocationIndex] = useState(0);
  const route = useRouter();
  const pathname = usePathname();
  const initialCameraPosition = {
    coordinates: userCoords ?? NYC_DEFAULT,
    zoom: 14,
  };
  const handleChangeWithRef = (direction: 'next' | 'prev' | 'me') => {
    const newIndex = locationIndex + (direction === 'next' ? 1 : -1);
    const nextLocation = locationList[newIndex];
    if (direction === 'me') {
      appleMapRef.current?.setCameraPosition(initialCameraPosition);
      googleMapRef.current?.setCameraPosition(initialCameraPosition);
    } else {
      appleMapRef.current?.setCameraPosition({
        coordinates: {
          latitude: nextLocation.stores[0].point[0],
          longitude: nextLocation.stores[0].point[1],
        },
        zoom: 14,
      });
      googleMapRef.current?.setCameraPosition({
        coordinates: {
          latitude: nextLocation.stores[0].point[0],
          longitude: nextLocation.stores[0].point[1],
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
          <Button
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
          />
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
            {userCoords ? (
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

  if (Platform.OS === 'ios') {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <AppleMaps.View
            ref={appleMapRef}
            style={StyleSheet.absoluteFill}
            uiSettings={{ compassEnabled: true, myLocationButtonEnabled: false }}
            properties={{ isMyLocationEnabled: true }}
            cameraPosition={initialCameraPosition}
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
            uiSettings={{ compassEnabled: true }}
            properties={{ isMyLocationEnabled: true }}
            cameraPosition={initialCameraPosition}
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

export default Map;
const styles = StyleSheet.create({
  controlsContainer: {
    paddingVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
