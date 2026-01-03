import { AppleMaps, GoogleMaps } from 'expo-maps';
import { useRef, useState } from 'react';
import { Button, Platform, StyleSheet, View, Pressable } from 'react-native';
import TextBody from '../../../common/TextBody/TextBody';
import { IconSymbol } from '@/components/common/IconSymbol';

// Hooks
import { useAppTheme } from '@/providers/ThemeProvider';
import { useAppStore } from '@/store/useAppStore';
import { useRouter } from 'expo-router';

// Types and Utils
import { locationList } from '@/__mocks__/mockLocationList';
import { AppleMapsViewType } from 'expo-maps/build/apple/AppleMaps.types';
import { GoogleMapsViewType } from 'expo-maps/build/google/GoogleMaps.types';
import { NYC_DEFAULT } from '@/constants/mapDefaults';

type MapViewProps = {
  style?: any;
};

//! Will need to configure thie for android https://docs.expo.dev/versions/latest/sdk/maps/

const MapView = ({ style }: MapViewProps) => {
  const { theme } = useAppTheme();
  const appleMapRef = useRef<AppleMapsViewType>(null);
  const googleMapRef = useRef<GoogleMapsViewType>(null);
  const { userCoords } = useAppStore((state) => state);
  const [locationIndex, setLocationIndex] = useState(0);
  const route = useRouter();
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
    route.navigate('../map');
  };
  const handleLocationPermissionModal = () => {
    route.navigate('/modals/LocationPermission');
  };
  const renderMapControls = () => {
    return (
      <>
        <View
          style={{ flex: 1 }}
          pointerEvents='none'
        />
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
      </>
    );
  };

  if (Platform.OS === 'ios') {
    return (
      <>
        <AppleMaps.View
          ref={appleMapRef}
          style={StyleSheet.absoluteFill}
          uiSettings={{ compassEnabled: true, myLocationButtonEnabled: false }}
          properties={{ isMyLocationEnabled: true }}
          // style={{ flex: 1 }}
          cameraPosition={initialCameraPosition}
        />
        <View
          style={{
            flex: 1,
          }}>
          {renderMapControls()}
        </View>
      </>
    );
  } else if (Platform.OS === 'android') {
    return (
      <>
        <GoogleMaps.View
          ref={googleMapRef}
          style={StyleSheet.absoluteFill}
          uiSettings={{ compassEnabled: true }}
          properties={{ isMyLocationEnabled: true }}
          cameraPosition={initialCameraPosition}
        />
        {/* <View style={{ flex: 1 }}>{renderMapControls()}</View> */}
      </>
    );
  } else {
    return (
      <TextBody
        accessibilityLabel='Text Body'
        accessibilityRole='text'>
        Maps are only available on Android and iOS
      </TextBody>
    );
  }
};

export default MapView;
const styles = StyleSheet.create({
  controlsContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 8,
  },
});
