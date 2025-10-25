// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    // ignores: ['dist/*','node_modules','ios','android','.expo','package-lock.json'],
    ignores: [
      'dist/*',
      'node_modules/',
      'node_modules/**',
      '/.expo',
      '.expo',
      'package.json',
      'package-json.lock',
      'yarn.lock',
      'ios/**',
      'android/**',
      'assets/**',
      '.vscode',
      '.expo-shared',
      '.prettierrc',
      '.eslintrc.js',
    ],

    rules: {
      'prettier/prettier': 'warn',
      'react-hooks/rules-of-hooks': 'off',
    },
  },
]);
