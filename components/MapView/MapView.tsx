import { StyleSheet, View, Button, Platform, AppState } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { AppleMaps, GoogleMaps } from 'expo-maps';
import TextBody from '../common/TextBody/TextBody';
//! Will need to configure thie for android https://docs.expo.dev/versions/latest/sdk/maps/

// Hooks
import { useAppTheme } from '@/providers/ThemeProvider';
import useDeviceInfo from '@/hooks/useDeviceInfo';
import { useAppStore } from '@/store/useAppStore';

// Types and Utils
import { requestUserLocation, UserLocation } from '@/utils/location';
import { GoogleMapsViewType } from 'expo-maps/build/google/GoogleMaps.types';
import { AppleMapsViewType } from 'expo-maps/build/apple/AppleMaps.types';
import { ZOOM, NYC_DEFAULT } from '@/constants/mapDefaults';
import { locationList } from '@/__mocks__/mockLocationList';

interface MapViewProps {
  locations: [];
}
interface MapProps {
  googleRef: any;
  appleRef: any;
  fullScreen: boolean;
  // cameraPosition: any;
}
const Map = ({ googleRef, appleRef, fullScreen }: MapProps) => {
  const { width } = useDeviceInfo();
  const userCoords = useAppStore((state) => state.userCoords);
  if (Platform.OS === 'ios') {
    return (
      <>
        <AppleMaps.View
          ref={appleRef}
          style={fullScreen ? StyleSheet.absoluteFill : { width, height: width / 1.4 }}
          cameraPosition={{ coordinates: userCoords ?? NYC_DEFAULT, zoom: ZOOM }}
        />
        {/* <View style={{ flex: 1 }}>{renderMapControls()}</View> */}
      </>
    );
  } else if (Platform.OS === 'android') {
    return (
      <>
        <GoogleMaps.View
          ref={googleRef}
          style={fullScreen ? StyleSheet.absoluteFill : { width, height: width / 1.4 }}
          cameraPosition={{ coordinates: userCoords ?? NYC_DEFAULT, zoom: ZOOM }}
        />
        {/* <View style={{ flex: 1 }}>{renderMapControls()}</View> */}
      </>
    );
  } else {
    return <TextBody>Maps are only available on Android and iOS</TextBody>;
  }
};

const MapView = ({ locations }: MapViewProps) => {
  const { theme } = useAppTheme();
  const updateUserLocation = useAppStore((state) => state.updateUserLocation);
  const [fullScreen, setFullScreen] = useState(false); // TODO not implemented yet
  const [locationIndex, setLocationIndex] = useState(0);
  const appleMapRef = useRef<AppleMapsViewType>(null);
  const googleMapRef = useRef<GoogleMapsViewType>(null);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [permissionDenied, setPermissionDenied] = useState(false);

  // Permission / App Foreground handling in useEffect/side effects
  useEffect(() => {
    const getLocation = async () => {
      const loc = await requestUserLocation();
      if (!loc) {
        setPermissionDenied(true);
        updateUserLocation(null);
        return;
      }
      setPermissionDenied(false);
      updateUserLocation(loc);
    };
    getLocation();
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      // if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      //   console.log('App has come to the foreground!');
      // }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, [appStateVisible]);

  // TODO ADVANCED MAP CONTROLS
  const renderMapControls = () => {
    return (
      <>
        <View
          // style={{ flex: 8 }}
          pointerEvents='none'
        />
        <View
          style={{ ...styles.controlsContainer, backgroundColor: theme.colors.secondary }}
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
            title='Enlarge Map'
            onPress={() => setFullScreen(!fullScreen)}
          />
        </View>
      </>
    );
  };
  const handleChangeWithRef = (direction: 'next' | 'prev') => {
    const newIndex = locationIndex + (direction === 'next' ? 1 : -1);
    const nextLocation = locationList[newIndex];
    appleMapRef.current?.setCameraPosition({
      coordinates: {
        latitude: nextLocation.stores[0].point[0],
        longitude: nextLocation.stores[0].point[1],
      },
      zoom: 10,
    });
    googleMapRef.current?.setCameraPosition({
      coordinates: {
        latitude: nextLocation.stores[0].point[0],
        longitude: nextLocation.stores[0].point[1],
      },
      zoom: 10,
    });
    // update after animation is triggered
    setLocationIndex(newIndex);
  };
  return (
    <>
      <Map
        googleRef={googleMapRef}
        appleRef={appleMapRef}
        fullScreen={fullScreen}
      />
    </>
  );
};
export default MapView;

const styles = StyleSheet.create({
  controlsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,

    // backgroundColor: 'red',
  },
  link: {
    paddingVertical: 6,
    margin: 10,
    fontSize: 20,
  },
});
