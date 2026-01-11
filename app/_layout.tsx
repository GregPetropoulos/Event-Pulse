import 'react-native-reanimated';
import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeProvider, useAppTheme } from '@/providers/ThemeProvider';
import { QueryProvider } from '@/providers/QueryProvider';
import { ThemeProvider as NavigationNativeThemeProvider } from '@react-navigation/native';

SplashScreen.setOptions({
  duration: 4000,
  fade: true,
});

export const unstable_settings = {
  anchor: '(tabs)',
};

const RootNavigationWrapper = () => {
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
    <NavigationNativeThemeProvider value={theme}>
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
            name='modals/LocationPermission'
            options={{ presentation: 'modal', title: 'Location Permissions' }}
          />
          <Stack.Screen
            name='map'
            options={{
              headerBackVisible: false,
              headerTransparent: true,
              headerShown: true,
              // TODO FINE TUNE THE HEADERFOCUS/BLUR
              headerSearchBarOptions: {
                placeholder: 'search for events',
                placement: 'stacked',
                onChangeText: (e) => console.log('text from map search', e.nativeEvent.text),
              },
              title: '',
              animation: 'fade',
              animationDuration: 1600,
            }}
          />
        </Stack>
        <StatusBar style={theme.dark ? 'light' : 'dark'} />
      </SafeAreaView>
    </NavigationNativeThemeProvider>
  );
};

export default function RootLayout() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <SafeAreaProvider>
          <RootNavigationWrapper />
        </SafeAreaProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
