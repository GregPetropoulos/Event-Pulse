import { fireEvent, render, screen } from '@testing-library/react-native';
import { mockTheme } from '../../../../../test/mocks/mockTheme';
import PrimaryButton from '../PrimaryButton';

// 1. Mock the useAppTheme hook

jest.mock('@/providers/ThemeProvider', () => ({
  useAppTheme: () => ({ theme: mockTheme }),
}));

// 2. Mock the useDeviceInfo hook
jest.mock('@/hooks/useDeviceInfo', () => ({
  __esModule: true,
  default: () => ({
    width: 390, // Mock a default width based on iPhone16e iOS 26.0 simulator
    isLandscape: false,
  }),
}));

// 3. Mock expo-linear-gradient:
// Mock expo-linear-gradient
const LinearGradient = (props: any) => {
  const { View } = require('react-native');
  return (
    <View
      testID='mocked-linear-gradient'
      {...props}
    />
  );
};
jest.mock('expo-linear-gradient', () => {
  // You can return a simple View or a text component for testing purposes
  // This avoids native module errors and allows you to test your component's logic
  // without needing the actual gradient rendering.
  return { LinearGradient };
});
// --- Test Suite ---

const mockOnPress = jest.fn();
describe('PrimaryButton', () => {
  const buttonTitle = 'Press Me';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the button title correctly', () => {
    render(
      <PrimaryButton
        title={buttonTitle}
        onPress={mockOnPress}
      />,
    );

    // Use screen.getByText to find the Text component with the specified title
    const buttonText = screen.getByText(buttonTitle);
    expect(buttonText).toBeOnTheScreen();
  });

  it('calls the onPress handler when the button is pressed', () => {
    render(
      <PrimaryButton
        title={buttonTitle}
        onPress={mockOnPress}
      />,
    );

    // Find the Pressable component using its testID
    const button = screen.getByTestId('primary-button-id');

    // Simulate a press event
    fireEvent.press(button);

    // Verify that the mock function was called exactly once
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  // Test to verify props passed to the *non-mocked* LinearGradient component
  it('verifies that LinearGradient received the correct colors prop', () => {
    render(
      <PrimaryButton
        title={buttonTitle}
        onPress={mockOnPress}
      />,
    );

    const buttonLinearGradient = screen.getByTestId('primary-button-linear-gradient');
    expect(buttonLinearGradient).toHaveProp('colors', [mockTheme.gradient.primary[0], mockTheme.gradient.primary[1]]);
    expect(buttonLinearGradient).toBeOnTheScreen();
  });
  it('renders a xs size when provided', () => {
    render(
      <PrimaryButton
        onPress={mockOnPress}
        title={buttonTitle}
        size='xs'
      />,
    );

    const primaryButton = screen.getByTestId('primary-button-id');
    expect(primaryButton).toBeTruthy();
    expect(primaryButton.props.style.width).toBe(97.5);
  });
  it('renders a lg size when provided', () => {
    render(
      <PrimaryButton
        onPress={mockOnPress}
        title={buttonTitle}
        size='lg'
      />,
    );

    const primaryButton = screen.getByTestId('primary-button-id');
    expect(primaryButton).toBeTruthy();
    expect(primaryButton.props.style.width).toBe(325);
  });
  it('renders a width based on buttonWidth prop when provided', () => {
    render(
      <PrimaryButton
        onPress={mockOnPress}
        title={buttonTitle}
        buttonWidth={100}
      />,
    );

    const primaryButton = screen.getByTestId('primary-button-id');
    expect(primaryButton).toBeTruthy();
    expect(primaryButton.props.style.width).toBe(100);
  });
  it('renders a buttonWidth when a size prop and buttonWidth prop are provided', () => {
    render(
      <PrimaryButton
        onPress={mockOnPress}
        title={buttonTitle}
        buttonWidth={100}
        size='xs'
      />,
    );

    const primaryButton = screen.getByTestId('primary-button-id');
    expect(primaryButton).toBeTruthy();
    expect(primaryButton.props.style.width).toBe(100);
  });
  it('Primary Button is accessible by role', () => {
    const mockOnPress = jest.fn();
    render(
      <PrimaryButton
        onPress={mockOnPress}
        title={buttonTitle}
      />,
    );
    const getByRole = screen.getByRole('button');
    expect(getByRole).toBeTruthy();
  });
});
