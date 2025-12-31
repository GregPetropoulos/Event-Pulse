import { Tabs } from 'expo-router';
import { HapticTab } from '@/components/common/HapticTab';
import { IconSymbol } from '@/components/common/IconSymbol';
import { useAppTheme } from '@/providers/ThemeProvider';
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
        animation: 'fade',
        transitionSpec: {
          animation: 'timing',
          config: {
            duration: 800,
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
          headerShown: false,
          title: 'Home',
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
        name='aiInsights'
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
        name='favorites'
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
        name='about'
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
        name='settings'
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
