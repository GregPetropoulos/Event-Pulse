import React from 'react';
import FavoritesScreen from '../FavoritesScreen';
import { renderScreen } from '../../../../test/helpers/renderScreen';
describe('FavoritesScreen', () => {
  it('renders without crashing', () => {
    const { toJSON } = renderScreen(<FavoritesScreen />);
    expect(toJSON()).toBeTruthy();
  });
});
