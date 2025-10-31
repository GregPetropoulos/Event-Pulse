import { useWindowDimensions } from 'react-native';

const useDeviceInfo = () => {
  const { width, height, scale, fontScale } = useWindowDimensions();

  // Determine orientation
  const isPortrait = height > width;
  const isLandscape = width > height;

  return {
    width,
    height,
    scale,
    fontScale,
    isPortrait,
    isLandscape,
    // You can add more derived values here as needed
  };
};

export default useDeviceInfo;
