import React from 'react';
import { renderScreen } from '../../../test/helpers/renderScreen';
import AboutScreen from '../AboutScreen/AboutScreen';
import AIInsightScreen from '../AIInsightScreen/AIInsightScreen';
import FavoritesScreen from '../FavoritesScreen/FavoritesScreen';
import HomeScreen from '../HomeScreen/HomeScreen';
import MapScreen from '../MapScreen/MapScreen';
import SettingsScreen from '../SettingsScreen/SettingsScreen';

describe('Each screen component renders per route', () => {
  it('HomeScreen renders without crashing', () => {
    const { toJSON } = renderScreen(<HomeScreen />);
    expect(toJSON()).toBeTruthy();
  });
  it('AIInsightScreen renders without crashing', () => {
    const { toJSON } = renderScreen(<AIInsightScreen />);
    expect(toJSON()).toBeTruthy();
  });
  it('FavoritesScreen renders without crashing', () => {
    const { toJSON } = renderScreen(<FavoritesScreen />);
    expect(toJSON()).toBeTruthy();
  });
  it('AboutScreen renders without crashing', () => {
    const { toJSON } = renderScreen(<AboutScreen />);
    expect(toJSON()).toBeTruthy();
  });
  it('SettingsScreen renders without crashing', () => {
    const { toJSON } = renderScreen(<SettingsScreen />);
    expect(toJSON()).toBeTruthy();
  });
  it('MapScreen renders without crashing', () => {
    const { toJSON } = renderScreen(<MapScreen />);
    expect(toJSON()).toBeTruthy();
  });
});
