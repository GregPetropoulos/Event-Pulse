import React from 'react';
import AboutScreen from '../AboutScreen';
import { renderScreen } from '../../../../test/helpers/renderScreen';
describe('AboutScreen', () => {
  it('renders without crashing', () => {
    const { toJSON } = renderScreen(<AboutScreen />);
    expect(toJSON()).toBeTruthy();
  });
});
