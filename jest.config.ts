// node
import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-expo',
  testEnvironment: 'node',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@expo|expo(nent)?|@unimodules|unimodules|sentry-expo|react-native-svg|@react-native-mmkv)',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
     '^react-native-mmkv$': '<rootDir>/__mocks__/react-native-mmkv.js',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

export default config;





// module.exports = {
//   preset: 'jest-expo',
//    testEnvironment: 'node',
//   setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
//    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
//   transformIgnorePatterns: ['node_modules/(?!(jest-)?react-native|@react-native|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*)'],
//   testPathIgnorePatterns: ['/node_modules/', '/e2e/'],
//   moduleNameMapper: {
//     // handle static assets
//     '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
//     // optional alias support if you use @/ in imports
//     '^@/(.*)$': '<rootDir>/src/$1',
//   },
// };
