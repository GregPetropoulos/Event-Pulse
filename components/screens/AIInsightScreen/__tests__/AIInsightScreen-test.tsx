import React from 'react';
import AIInsightScreen from '../AIInsightScreen';
import { renderScreen } from '../../../../test/helpers/renderScreen';
describe('AIInsightScreen', () => {
  it('renders without crashing', () => {
    const { toJSON } = renderScreen(<AIInsightScreen />);
    expect(toJSON()).toBeTruthy();
  });
});
