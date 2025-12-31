import { AppleMaps, GoogleMaps } from 'expo-maps';
import { useRef, useState } from 'react';
import { Button, Platform, StyleSheet, View } from 'react-native';
import TextBody from '../../../common/TextBody/TextBody';
// Hooks
import useDeviceInfo from '@/hooks/useDeviceInfo';
import { useAppTheme } from '@/providers/ThemeProvider';
import { useAppStore } from '@/store/useAppStore';
import { useRouter } from 'expo-router';

// Types and Utils
import { locationList } from '@/__mocks__/mockLocationList';
import { AppleMapsViewType } from 'expo-maps/build/apple/AppleMaps.types';
import { GoogleMapsViewType } from 'expo-maps/build/google/GoogleMaps.types';

type MapViewProps = {
  style: any;
};

//! Will need to configure thie for android https://docs.expo.dev/versions/latest/sdk/maps/

const MapView = ({ style }: MapViewProps) => {
  const { theme } = useAppTheme();
  const route = useRouter();
  const appleMapRef = useRef<AppleMapsViewType>(null);
  const googleMapRef = useRef<GoogleMapsViewType>(null);
  const { width } = useDeviceInfo();
  // const {coordinates,zoom} = initialCameraPosition
  const {userCoords,updateUserLocation} = useAppStore((state) => state);
  const [locationIndex, setLocationIndex] = useState(0);

  const handleChangeWithRef = (direction: 'next' | 'prev') => {
    const newIndex = locationIndex + (direction === 'next' ? 1 : -1);
    const nextLocation = locationList[newIndex];
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
    // update after animation is triggered
    setLocationIndex(newIndex);
  };
  const renderMapControls = () => {
    return (
      <>
        <View
          // style={{ flex: 8 }}
          pointerEvents='none'
        />
        <View
          style={{ ...styles.controlsContainer, backgroundColor: theme.colors.surface }}
          pointerEvents='auto'>
          <Button
            title='Prev'
            onPress={() => handleChangeWithRef('prev')}
          />
          <Button
            title='Next'
            onPress={() => handleChangeWithRef('next')}
          />
          <Button
            title='Home'
            onPress={() => route.navigate('/')}
          />
        </View>
      </>
    );
  };
  const initialCameraPosition = {
    coordinates: userCoords ?? { latitude: undefined, longitude: undefined },
    zoom: 14,
  };
   
  if (Platform.OS === 'ios') {
    return (
      <>
        <AppleMaps.View
          ref={appleMapRef}
          style={StyleSheet.absoluteFill}
          // style={{ flex: 1 }}
          cameraPosition={initialCameraPosition}
        />
        {/* <View style={{ flex: 1 }}>{renderMapControls()}</View> */}
      </>
    );
  } else if (Platform.OS === 'android') {
    return (
      <>
        <GoogleMaps.View
          ref={googleMapRef}
          style={StyleSheet.absoluteFill}
          cameraPosition={initialCameraPosition}
        />
        {/* <View style={{ flex: 1 }}>{renderMapControls()}</View> */}
      </>
    );
  } else {
    return <TextBody>Maps are only available on Android and iOS</TextBody>;
  }
};

export default MapView;
const styles = StyleSheet.create({
  controlsContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
});