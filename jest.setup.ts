import '@testing-library/jest-native/extend-expect';

// ✅ Reanimated (modern replacement)
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

// ✅ MMKV
jest.mock('react-native-mmkv', () => {
  const mockStorage = {
    getString: jest.fn(),
    getNumber: jest.fn(),
    getBoolean: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
    clearAll: jest.fn(),
  };

  return {
    createMMKV: jest.fn(() => mockStorage),
  };
});
// ✅ Expo Maps (AppleMaps.View fix)
jest.mock('expo-maps', () => ({
  AppleMaps: {
    View: ({ children }: any) => children ?? null,
  },
}));

// ✅ Expo Location (prevents native crash)
jest.mock('expo-location', () => ({
  getForegroundPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }),
  requestForegroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn().mockResolvedValue({
    coords: { latitude: 0, longitude: 0 },
  }),
}));

jest.mock('@react-navigation/native', () => {
  const DarkTheme = {
    dark: true,
    colors: {
      primary: '#1e90ff',
      background: '#000000',
      card: '#121212',
      text: '#ffffff',
      border: '#222222',
      notification: '#ff453a',
    },
  };
  const DefaultTheme = {
    dark: false,
    colors: {
      primary: '#1e90ff',
      background: '#ffffff',
      card: '#f5f5f5',
      text: '#000000',
      border: '#cccccc',
      notification: '#ff453a',
    },
  };
  return {
    __esModule: true,
    //Themes
    DarkTheme,
    DefaultTheme,
    //Hooks (NO-OP safe mocks)
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      push: jest.fn(),
      replace: jest.fn(),
      setOptions: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }),
    useRoute: () => ({
      key: 'mock-route',
      name: 'MockScreen',
      params: {},
    }),

    NavigationContainer: ({ children }: any) => children,
  };
});
