import { HapticTab } from '@/components/common/Haptics/HapticTab';
import { IconSymbol } from '@/components/common/Icon/IconSymbol';
import { useAppTheme } from '@/providers/ThemeProvider';
import { Tabs } from 'expo-router';
import { Easing } from 'react-native';

export default function TabLayout() {
  const { theme } = useAppTheme();
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.secondary,
        tabBarButton: HapticTab,
        headerShown: true,
        animation: 'shift',
        transitionSpec: {
          animation: 'timing',
          config: {
            duration: 500,
            easing: Easing.inOut(Easing.ease),
          },
        },
        headerStatusBarHeight: 10,
        headerTitleStyle: { color: theme.colors.textPrimary },
        headerStyle: { backgroundColor: theme.colors.primary },
      })}>
      <Tabs.Screen
        name='(home)/index'
        options={{
          headerShown: true,
          headerTintColor: theme.colors.textPrimary,
          headerStyle: { backgroundColor: theme.colors.surface },
          headerSearchBarOptions: {
            cancelButtonText: 'Cancel',
            placeholder: 'search for events',
            autoCapitalize: 'none',
            inputType: 'text',
            onChangeText: (e) => console.log('text from map search', e.nativeEvent.text),
          },
          title: 'Home',
          animation: 'fade',
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name='safari.fill'
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='aiInsights/index'
        options={{
          title: 'AI Insights',
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name='sun.max.fill'
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name='favorites/index'
        options={{
          title: 'Favs',
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name='heart.fill'
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='about/index'
        options={{
          title: 'About',
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name='info.circle'
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='settings/index'
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name='gearshape.fill'
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
