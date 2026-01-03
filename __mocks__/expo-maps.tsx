import React from "react";
import { View as RNView } from "react-native";

const MockMapView = ({ children }: any) => (
  <RNView testID="map-view">{children}</RNView>
);

export const AppleMaps = {
  View: MockMapView,
};

export const GoogleMaps = {
  View: MockMapView,
};

export default {
  AppleMaps,
  GoogleMaps,
};
