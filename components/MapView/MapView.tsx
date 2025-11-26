import { StyleSheet, Text, View, Button, Platform, Alert, AppState} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
// import { Link } from 'expo-router';
import Link from '../common/Link/Link';
import { AppleMaps, GoogleMaps } from 'expo-maps';
import useDeviceInfo from '@/hooks/useDeviceInfo';
import { locationList } from '@/__mocks__/LocationList';
import { useAppTheme } from '@/providers/ThemeProvider';
import { GoogleMapsViewType } from 'expo-maps/build/google/GoogleMaps.types';
import { AppleMapsViewType } from 'expo-maps/build/apple/AppleMaps.types';
import { requestUserLocation, openAppSettings, UserLocation } from '@/utils/location';
import { ZOOM, NYC_DEFAULT } from '@/constants/locations';
import { useIsFocused } from '@react-navigation/native';
//! Will need to configure thie for android https://docs.expo.dev/versions/latest/sdk/maps/

interface MapViewProps {
  locations: [];
}

interface MapProps {
  googleRef: any;
  appleRef: any;
  fullScreen: boolean;
  cameraPosition: any;
}
const Map = ({ googleRef, appleRef, fullScreen, cameraPosition }: MapProps) => {
  const { width } = useDeviceInfo();

  if (Platform.OS === 'ios') {
    return (
      <>
        <AppleMaps.View
          ref={appleRef}
          style={fullScreen ? StyleSheet.absoluteFill : { width, height: width / 1.4 }}
          cameraPosition={cameraPosition}
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
          cameraPosition={cameraPosition}
        />
        {/* <View style={{ flex: 1 }}>{renderMapControls()}</View> */}
      </>
    );
  } else {
    return <Text>Maps are only available on Android and iOS</Text>;
  }
};

const MapView = ({ locations }: MapViewProps) => {
  const { theme } = useAppTheme();
  const [fullScreen, setFullScreen] = useState(false);
  const [locationIndex, setLocationIndex] = useState(0);
  const appleMapRef = useRef<AppleMapsViewType>(null);
  const googleMapRef = useRef<GoogleMapsViewType>(null);
   const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [cameraPosition, setCameraPosition] = useState<{ coordinates: UserLocation; zoom: number }>({ coordinates: NYC_DEFAULT, zoom: ZOOM });
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const focused = useIsFocused();
  console.log('IS_FOCUSED', focused);
 //STOPPED HERE NEED TO WORK OUT THE AP STATE AND REREDMER NEW MAP CORRDINATES
  useEffect(() => {
    const getLocation = async () => {
      const loc = await requestUserLocation();
      if (!loc) {
        setPermissionDenied(true);
        return;
      }
      setPermissionDenied(false);
      setCameraPosition((prev) => ({ ...prev, coordinates: loc }));
    };
    getLocation();
     const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, [appStateVisible]);
console.log('appStateVisible=====>',appStateVisible)
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

  // if (permissionDenied) {
  //   Alert.alert('Location Permissions', ' Location permission is required to show nearby events. You can still browse manually.', [
  //     {
  //       text: 'Open Device Settings',
  //       onPress: () => openAppSettings(),
  //     },
  //     {
  //       text: 'Dismiss',
  //       style: 'cancel',
  //     },
  //   ]);
  // }
  console.log(cameraPosition, permissionDenied);
  const handleEnableSettingsLinking = () => {
    // openAppSettings();
    
    // setRefresh((prev) => !prev);
  };
  return (
    <>
      <Map
        googleRef={googleMapRef}
        appleRef={appleMapRef}
        cameraPosition={cameraPosition}
        fullScreen={fullScreen}
      />
      {/* !stopped here NEED THIS PERMISSION TO REFRESH SCREEN AFTER BE SET ON DEVICE SETTINFGS */}
      {/* {permissionDenied && (
        <Button
          title='Enable settings location'
          onPress={handleEnableSettingsLinking}
        />
       
      )} */}
        <Link href="/locationPermissionsModal">
        Enable Location
      </Link>
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
    margin:10,
    fontSize: 20,
  }
});
