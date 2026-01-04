import React from 'react';
import MapScreen from '../MapScreen';
import { renderScreen } from '../../../../test/helpers/renderScreen';

describe('MapScreen', () => {
  it('renders without crashing', () => {
    const { toJSON } = renderScreen(<MapScreen />);
    expect(toJSON()).toBeTruthy();
  });
});
