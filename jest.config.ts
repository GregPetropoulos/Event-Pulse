// node
import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-expo',
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
     automock: false,
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)',
  ],
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{ts,tsx,js,jsx}', '!**/coverage/**', '!**/node_modules/**', '!**/babel.config.js', '!**/expo-env.d.ts', '!**/.expo/**'],
 moduleNameMapper: {
  "^@/(.*)$": "<rootDir>/$1",
},

};

export default config;
