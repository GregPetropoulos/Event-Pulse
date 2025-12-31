import { ActivityIndicator } from 'react-native';
// import MapView, { Marker } from "expo-maps";
import MapView from './MapView/MapView';
import { useAppStore } from '@/store/useAppStore';

export default function MapScreen() {
  const { userCoords } = useAppStore((state) => state);

  if (!userCoords) return <ActivityIndicator style={{ flex: 1 }} />;

  return <MapView style={{ flex: 1 }}>{/* <Marker coordinate={coords} /> */}</MapView>;
}
