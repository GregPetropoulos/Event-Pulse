import '@testing-library/jest-native/extend-expect';

// Side note: mmkv gets mocked at the jest.config.ts level

// ✅ Reanimated (modern replacement)
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

// ✅  Expo Router
jest.mock('expo-router', () => require('@/test/mocks/expo-router'));

// ✅  React Navigation
jest.mock('@react-navigation/native', () => require('@/test/mocks/react-navigation'));

// ✅ Expo Maps
jest.mock('expo-maps', () => require('@/test/mocks/expo-maps'));

// ✅ Expo Location (prevents native crash)
jest.mock('expo-location', () => require('@/test/mocks/expo-location'));

//TODO  THESE TEMP HERE WILL REMOVE LATER
// ✅  Theme Provider
// jest.mock('@/providers/ThemeProvider', () => ({
//   useAppTheme: () => ({
//     theme: require('@/test/mocks/mockTheme').mockTheme,
//   }),
// }));
// jest.mock('@react-navigation/native', () => {
//   const DarkTheme = {
//     dark: true,
//     colors: {
//       primary: '#1e90ff',
//       background: '#000000',
//       card: '#121212',
//       text: '#ffffff',
//       border: '#222222',
//       notification: '#ff453a',
//     },
//   };
//   const DefaultTheme = {
//     dark: false,
//     colors: {
//       primary: '#1e90ff',
//       background: '#ffffff',
//       card: '#f5f5f5',
//       text: '#000000',
//       border: '#cccccc',
//       notification: '#ff453a',
//     },
//   };
//   return {
//     __esModule: true,
//     //Themes
//     DarkTheme,
//     DefaultTheme,
//     //Hooks (NO-OP safe mocks)
//     useNavigation: () => ({
//       navigate: jest.fn(),
//       goBack: jest.fn(),
//       push: jest.fn(),
//       replace: jest.fn(),
//       setOptions: jest.fn(),
//       addListener: jest.fn(),
//       removeListener: jest.fn(),
//     }),
//     useRoute: () => ({
//       key: 'mock-route',
//       name: 'MockScreen',
//       params: {},
//     }),

//     NavigationContainer: ({ children }: any) => children,
//   };
// });

// jest.mock('@react-navigation/native', () =>
//   require('@/test/mocks/react-navigation')
// );

// jest.mock('expo-router', () => require('@/test/mocks/expo-router'));

// jest.mock('expo-router', () => ({
//   __esModule: true,
//   ...require('@/test/mocks/expo-router'),
// }));

// jest.mock('@/providers/ThemeProvider', () => ({
//   useAppTheme: () => ({
//     theme: require('@/test/mocks/mockTheme').mockTheme,
//   }),
// }));
