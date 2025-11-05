import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PrimaryButton } from '../PrimaryButton';
import { ThemeProvider } from '@/providers/ThemeProvider';

describe('Primary Button', () => {
  it('calls the onPress function when pressed', () => {
    const mockOnPress = jest.fn();

    const { getByTestId } = render(
      <ThemeProvider>
        <PrimaryButton
          title='My Button'
          onPress={mockOnPress}
        />
      </ThemeProvider>,
    );

    const button = getByTestId('primary-button-id');
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('Button displays the correct title', () => {
    const { getByText } = render(
      <ThemeProvider>
        <PrimaryButton
          title={'My Button'}
          onPress={() => {}}
        />
      </ThemeProvider>,
    );
    expect(getByText('My Button')).toBeVisible();
  });
});
