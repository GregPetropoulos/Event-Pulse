import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/common/HapticTab';
import { IconSymbol } from '@/components/common/IconSymbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name='(home)/index'
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
        name='favorites/[id]'
        options={{
          title: 'Favorite',
          href: null, //hide tab from bottom tabs
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name='heart.circle'
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
              name='paperplane.fill'
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
