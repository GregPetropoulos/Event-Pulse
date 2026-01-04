import { ActivityIndicator } from 'react-native';
// import MapView, { Marker } from "expo-maps";
import MapView from './MapView/MapView';

export default function MapScreen() {
  return <MapView style={{ flex: 1 }}>{/* <Marker coordinate={coords} /> */}</MapView>;
}
