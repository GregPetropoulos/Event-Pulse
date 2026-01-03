import React from 'react';
import SettingsScreen from '../SettingsScreen';
import { renderScreen } from '../../../../test/helpers/renderScreen';

describe('SettingsScreen', () => {
  it('renders without crashing', () => {
    const { toJSON } = renderScreen(<SettingsScreen />);
    expect(toJSON()).toBeTruthy();
  });
});
