import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { ThemeProvider, useAppTheme } from '@/providers/ThemeProvider';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.setOptions({
  duration: 4000,
  fade: true,
});

export const unstable_settings = {
  anchor: '(tabs)',
};

export const RootNavigationWrapper = () => {
  const { theme } = useAppTheme();
  const { top, left, right, bottom } = useSafeAreaInsets();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function doAsyncStuff() {
      try {
        // do something async here
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    doAsyncStuff();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hide();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationThemeProvider value={theme}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
          // backgroundColor: theme.colors.error,
          borderColor: 'red',
          borderWidth: 1,
          // paddingTop: top,
          // paddingBottom: bottom,
          // paddingLeft: left + 15,
          // paddingRight: right + 15,
        }}>
        <Stack>
          <Stack.Screen
            name='(tabs)'
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='locationPermissionsModal'
            options={{ presentation: 'modal', title: 'Location Permissions' }}
          />
        </Stack>
        <StatusBar style={theme.dark ? 'light' : 'dark'} />
      </SafeAreaView>
    </NavigationThemeProvider>
  );
};

export default function RootLayout() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <RootNavigationWrapper />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
