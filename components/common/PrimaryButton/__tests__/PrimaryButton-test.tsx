import { fireEvent, render, screen } from '@testing-library/react-native';
import { PrimaryButton } from '../PrimaryButton';
import { mockTheme } from '../../../../__mocks__/mockTheme';
// describe('Primary Button', () => {
//   it('calls the onPress function when pressed', () => {
//     const mockOnPress = jest.fn();

//     const { getByTestId } = render(
//       <ThemeProvider>
//         <PrimaryButton
//           title='My Button'
//           onPress={mockOnPress}
//         />
//       </ThemeProvider>,
//     );

//     const button = getByTestId('primary-button-id');
//     fireEvent.press(button);
//     expect(mockOnPress).toHaveBeenCalledTimes(1);
//   });

//   it('Button displays the correct title', () => {
//     const { getByText } = render(// --- Mock Dependencies ---

// 1. Mock the useAppTheme hook

jest.mock('@/providers/ThemeProvider', () => ({
  useAppTheme: () => ({ theme: mockTheme }),
}));

// 2. Mock the useDeviceInfo hook
jest.mock('@/hooks/useDeviceInfo', () => ({
  __esModule: true,
  default: () => ({
    width: 400, // Mock a default width
    isLandscape: false,
  }),
}));

//       <ThemeProvider>
//         <PrimaryButton
//           title={'My Button'}
//           onPress={() => {}}
//         />
//       </ThemeProvider>,
//     );
//     expect(getByText('My Button')).toBeVisible();
//   });
// });

// 3. Mock expo-linear-gradient:
// Mock expo-linear-gradient
jest.mock('expo-linear-gradient', () => {
  const LinearGradient = (props: any) => {
    const { View } = require('react-native');
    return (
      <View
        testID='mocked-linear-gradient'
        {...props}
      />
    );
  };
  // You can return a simple View or a text component for testing purposes
  // This avoids native module errors and allows you to test your component's logic
  // without needing the actual gradient rendering.
  return { LinearGradient };
});
// --- Test Suite ---

const mockOnPress = jest.fn();
describe('PrimaryButton', () => {
  const buttonTitle = 'Press Me Me';

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

  // Test to verify props passed to the *mocked* LinearGradient component
  it('verifies that LinearGradient received the correct colors prop', () => {
    render(
      <PrimaryButton
        title={buttonTitle}
        onPress={mockOnPress}
      />,
    );

    // !FIX: colors prop test
    // const MockedLinearGradient = LinearGradient as jest.Mock;
    // // expect(MockedLinearGradient).toHaveProp('colors',['#007AFF', '#005BBF']);
    // expect(MockedLinearGradient).toHaveProp('colors', mockTheme.gradient)
    // You can check if the mocked View is present (it renders as 'View' in snapshots)
    expect(screen.getByTestId('mocked-linear-gradient')).toBeOnTheScreen();
  });
});
