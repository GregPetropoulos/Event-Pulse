import React from 'react';
import HomeScreen from '../HomeScreen';
import { renderScreen } from '../../../../test/helpers/renderScreen';
describe('HomeScreen', () => {
  it('renders without crashing', () => {
    const { toJSON } = renderScreen(<HomeScreen />);
    expect(toJSON()).toBeTruthy();
  });
});
