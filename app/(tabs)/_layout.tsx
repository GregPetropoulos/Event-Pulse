import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/common/HapticTab';
import { IconSymbol } from '@/components/common/IconSymbol';
import { useAppTheme } from '@/providers/ThemeProvider';

export default function TabLayout() {
  const { theme } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.secondary,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name='(home)'
        options={{
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
    </Tabs>
  );
}
