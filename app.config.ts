import 'dotenv/config';
import { ConfigContext, ExpoConfig } from 'expo/config';
import { version } from './package.json';
import fs from 'fs';
import path from 'path';

// const PROJECT_ID=''
const PROJECT_SLUG = 'eventpulse';

// ===========================
// PROD STATIC VARIABLES
// ===========================
const APP_NAME = 'Event Pulse';
const PRODUCT_NAME = 'Event Pulse';
const BUNDLE_IDENTIFIER = 'com.gregpetropoulosdev.EventPulse';
const PACKAGE_NAME = 'com.gregpetropoulosdev.EventPulse';
const ADAPTIVE_ICON = './assets/icons/android/adaptive-icon.png';
const ICON = './assets/icons/ios/ios-dark.png';
const SCHEME = 'eventpulse';
// ===========================
// PROD STATIC VARIABLES
// ===========================

export default ({ config }: ConfigContext): ExpoConfig => {
  console.log(`Building app for ${process.env.APP_ENV}`);
  const environement = (process.env.APP_ENV as 'development' | 'preview' | 'production') || 'development';
  const apiUrl = environement !== 'production' ? `https://api-${environement}` : 'https://api';
  const { name, bundleIdentIfier, packageName, icon, adaptiveIcon, scheme } = getDynamicAppConfig(environement);
  const buildData = {
    APIUrl: `${apiUrl}.gregpetropoulosdev.EventPulse.com`,
    Version: version,
    Environment: environement,
    Scheme: scheme,
    AndroidIcon: adaptiveIcon,
    iOSIcon: icon,
  };
  console.table(buildData);
  return {
    ...config,
    newArchEnabled: true,
    name: name,
    version, // from package.json dev will manually set
    slug: PROJECT_SLUG,
    orientation: 'portrait',
    userInterfaceStyle: 'automatic',
    icon: icon,
    scheme: scheme,

    extra: {
      env: environement,
      apiUrl: `${apiUrl}.gregpetropoulosdev.EventPulse.com`,
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: bundleIdentIfier,
      icon: {
        dark: icon,
        light: './assets/icons/ios/ios-light.png',
        tinted: './assets/icons/ios/ios-tinted.png',
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: adaptiveIcon,
        monochromeImage: adaptiveIcon,
        backgroundColor: '#000000',
      },
      package: packageName,
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
    },
    web: {
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
          dark: {
            image: './assets/images/splash-icon.png',
            backgroundColor: '#000000',
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
  };
};

// Dynamic configuration returned
const getDynamicAppConfig = (environement: 'development' | 'preview' | 'production') => {
  if (environement === 'production') {
    return {
      name: APP_NAME,
      bundleIdentIfier: BUNDLE_IDENTIFIER,
      packageName: PACKAGE_NAME,
      icon: ICON,
      adaptiveIcon: ADAPTIVE_ICON,
      scheme: SCHEME,
    };
  }
  if (environement === 'preview') {
    return {
      name: `${APP_NAME} Preview`,
      bundleIdentIfier: `${BUNDLE_IDENTIFIER}.preview`,
      packageName: `${PACKAGE_NAME}.preview`,
      icon: './assets/icons/ios/ios-dark-prev.png',
      adaptiveIcon: './assets/icons/android/adaptive-icon-prev.png',
      scheme: `${SCHEME}-preview`,
    };
  }
  return {
    name: `${APP_NAME} Development`,
    bundleIdentIfier: `${BUNDLE_IDENTIFIER}.dev`,
    packageName: `${PACKAGE_NAME}.dev`,
    icon: ICON,
    adaptiveIcon: ADAPTIVE_ICON,
    scheme: `${SCHEME}-dev`,
  };
};

// Starter boiler plate
// =========================
// =========================

// {
//   "expo": {
//     "name": "EventPulse",
//     "slug": "EventPulse",
//     "version": "1.0.0",
//     "orientation": "portrait",
//     "icon": "./assets/images/icon.png",
//     "scheme": "eventpulse",
//     "userInterfaceStyle": "automatic",
//     "newArchEnabled": true,
//     "ios": {
//       "supportsTablet": true,
//       "bundleIdentifier": "com.gregpetropoulosdev.EventPulse"
//     },
//     "android": {
//       "adaptiveIcon": {
//         "backgroundColor": "#E6F4FE",
//         "foregroundImage": "./assets/images/android-icon-foreground.png",
//         "backgroundImage": "./assets/images/android-icon-background.png",
//         "monochromeImage": "./assets/images/android-icon-monochrome.png"
//       },
//       "edgeToEdgeEnabled": true,
//       "predictiveBackGestureEnabled": false,
//       "package": "com.gregpetropoulosdev.EventPulse"
//     },
//     "web": {
//       "output": "static",
//       "favicon": "./assets/images/favicon.png"
//     },
//     "plugins": [
//       "expo-router",
//       [
//         "expo-splash-screen",
//         {
//           "image": "./assets/images/splash-icon.png",
//           "imageWidth": 200,
//           "resizeMode": "contain",
//           "backgroundColor": "#ffffff",
//           "dark": {
//             "backgroundColor": "#000000"
//           }
//         }
//       ]
//     ],
//     "experiments": {
//       "typedRoutes": true,
//       "reactCompiler": true
//     }
//   }
// }
