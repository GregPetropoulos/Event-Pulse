import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import CancelButton from '../CancelButton';
import { mockTheme } from '../../../../__mocks__/mockTheme';

jest.mock('@/providers/ThemeProvider', () => ({
  useAppTheme: () => ({ theme: mockTheme }),
}));
jest.mock('@/hooks/useDeviceInfo', () => ({
  __esModule: true,
  default: () => ({
    width: 390, // Mock a default width based on iPhone16e iOS 26.0 simulator
    isLandscape: false,
  }),
}));
describe('CancelButton', () => {
  it('renders the default title "Cancel"', () => {
    // Mock the onPress function
    const mockOnPress = jest.fn();

    render(<CancelButton onPress={mockOnPress} />);
    const cancelButton = screen.getByText('Cancel');
    expect(cancelButton).toBeTruthy();
  });
  it(`renders background error color, text is theme's textPrimary color `, () => {
    const mockOnPress = jest.fn();

    render(<CancelButton onPress={mockOnPress} />);

    const cancelButton = screen.getByTestId('cancel-button-id');
    const cancelButtonText = screen.getByText('Cancel'); // Pressable child <Text/>
    expect(cancelButton).toBeTruthy();
    // Check if the style includes the mocked error color
    expect(cancelButtonText.props.style.color).toBe(mockTheme.colors.textPrimary);
    expect(cancelButton.props.style.backgroundColor).toBe(mockTheme.colors.error);
  });
  it('renders a custom title when provided', () => {
    const mockOnPress = jest.fn();
    const customTitle = 'Go Back';

    render(
      <CancelButton
        onPress={mockOnPress}
        title={customTitle}
      />,
    );

    const customButton = screen.getByText(customTitle);
    expect(customButton).toBeTruthy();
    expect(screen.queryByText('Cancel')).toBeNull(); // Ensure the default title is not present on the screen
  });
  it('renders a xs size when provided', () => {
    const mockOnPress = jest.fn();
    render(
      <CancelButton
        onPress={mockOnPress}
        title='Cancel Item'
        size='xs'
      />,
    );

    const cancelButton = screen.getByTestId('cancel-button-id');
    expect(cancelButton).toBeTruthy();
    expect(cancelButton.props.style.width).toBe(97.5);
  });
  it('renders a lg size when provided', () => {
    const mockOnPress = jest.fn();
    render(
      <CancelButton
        onPress={mockOnPress}
        title='Cancel Item'
        size='lg'
      />,
    );

    const cancelButton = screen.getByTestId('cancel-button-id');
    expect(cancelButton).toBeTruthy();
    expect(cancelButton.props.style.width).toBe(325);
  });
  it('renders a width based on buttonWidth prop when provided', () => {
    const mockOnPress = jest.fn();
    render(
      <CancelButton
        onPress={mockOnPress}
        title='Cancel Item'
        buttonWidth={100}
      />,
    );

    const cancelButton = screen.getByTestId('cancel-button-id');
    expect(cancelButton).toBeTruthy();
    expect(cancelButton.props.style.width).toBe(100);
  });
  it('renders a buttonWidth when a size prop and buttonWidth prop are provided', () => {
    const mockOnPress = jest.fn();
    render(
      <CancelButton
        onPress={mockOnPress}
        title='Cancel Item'
        size='lg'
        buttonWidth={170}
      />,
    );

    const cancelButton = screen.getByTestId('cancel-button-id');
    expect(cancelButton).toBeTruthy();
    expect(cancelButton.props.style.width).toBe(170);
  });
  it('calls the onPress function when pressed', () => {
    const mockOnPress = jest.fn();

    render(<CancelButton onPress={mockOnPress} />);

    // Find the button (using the default title text) and simulate a press event
    const cancelButton = screen.getByText('Cancel');
    fireEvent.press(cancelButton); // Use fireEvent.press for Pressable components

    // Check if the mock function was called exactly once
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
