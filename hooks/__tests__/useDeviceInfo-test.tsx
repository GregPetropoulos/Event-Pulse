import { renderHook, act } from '@testing-library/react-native';
// We import Dimensions from react-native, not useWindowDimensions directly for this test approach
import { Dimensions } from 'react-native';
import useDeviceInfo from '../useDeviceInfo'; // Path to your custom hook

describe('useDeviceInfo', () => {
  // Define a standard portrait dimension set
  const portraitDimensions = {
    width: 390, //iphone 16e iOS26 emulator
    height: 800, //iphone 16e iOS26 emulator
    scale: 1,
    fontScale: 1,
  };

  // Define a standard landscape dimension set
  const landscapeDimensions = {
    width: 800,
    height: 390,
    scale: 1,
    fontScale: 1,
  };

  // Set the initial dimensions before each test runs
  beforeEach(() => {
    // Dimensions.set updates the internal state RN uses
    Dimensions.set({
      window: portraitDimensions,
      screen: portraitDimensions, // Often screen and window are the same in RN testing
    });
  });

  // Test case 1: Check initial portrait orientation
  it('should return correct dimensions and portrait orientation initially', () => {
    const { result } = renderHook(() => useDeviceInfo());

    expect(result.current.width).toBe(390);
    expect(result.current.height).toBe(800);
    expect(result.current.isPortrait).toBe(true);
    expect(result.current.isLandscape).toBe(false);
  });

  // Test case 2: Simulate screen rotation to landscape
  it('should update orientation when dimensions change to landscape', () => {
    const { result } = renderHook(() => useDeviceInfo());

    // Verify initial state
    expect(result.current.isPortrait).toBe(true);

    // Use 'act' to wrap the state update (simulated screen rotation)
    act(() => {
      // Calling Dimensions.set triggers the internal event listener that
      // useWindowDimensions listens to, causing the hook to re-render.
      Dimensions.set({
        window: landscapeDimensions,
        screen: landscapeDimensions,
      });
    });

    // Verify the hook's result has updated after the state change
    expect(result.current.width).toBe(800);
    expect(result.current.height).toBe(390);
    expect(result.current.isPortrait).toBe(false);
    expect(result.current.isLandscape).toBe(true);
  });
});
