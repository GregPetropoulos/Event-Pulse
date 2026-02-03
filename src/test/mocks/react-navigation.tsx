import React from 'react';
const DefaultTheme = {
  dark: false,
  colors: {
    primary: '#6200ee',
    background: '#ffffff',
    card: '#ffffff',
    text: '#000000',
    border: '#cccccc',
    notification: '#ff80ab',
  },
};

const DarkTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: '#000000',
    text: '#ffffff',
    card: '#121212',
  },
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export const NavigationContainer = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export const useTheme = () => DefaultTheme;

export const useNavigation = () => ({
  navigate: jest.fn(),
  goBack: jest.fn(),
  push: jest.fn(),
  replace: jest.fn(),
  setOptions: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
});

export const useRoute = () => ({
  name: 'MockRoute',
  params: {},
});

export { DefaultTheme, DarkTheme };

export default {
  ThemeProvider,
  NavigationContainer,
  useTheme,
  useNavigation,
  useRoute,
  DefaultTheme,
  DarkTheme,
};

// const actualNav = jest.requireActual('@react-navigation/native');

// export const DarkTheme = {
//   ...actualNav.DarkTheme,
//   dark: true,
//   colors: {
//     ...actualNav.DarkTheme.colors,
//     primary: '#1e90ff',
//     background: '#000000',
//     card: '#121212',
//     text: '#ffffff',
//     border: '#222222',
//     notification: '#ff453a',
//   },
// };
// export const DefaultTheme = {
//   dark: false,
//   colors: {
//     primary: '#1e90ff',
//     background: '#ffffff',
//     card: '#f5f5f5',
//     text: '#000000',
//     border: '#cccccc',
//     notification: '#ff453a',
//   },
// };

// export const useNavigation = () => ({
//   navigate: jest.fn(),
//   goBack: jest.fn(),
//   push: jest.fn(),
//   replace: jest.fn(),
//   setOptions: jest.fn(),
//   addListener: jest.fn(),
//   removeListener: jest.fn(),
// });
// export const useRoute = () => ({
//   key: 'mock-route',
//   name: 'MockScreen',
//   params: {},
// });

// export const NavigationContainer = ({ children }: any) => children;
