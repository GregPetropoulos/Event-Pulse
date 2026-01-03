import { useRouter } from 'expo-router';
import { useEffect, useState, useRef } from 'react';
import { Keyboard, Pressable, Text, TextInput, TouchableWithoutFeedback, View, FlatList, AppState } from 'react-native';

import MapView from '../MapScreen/MapView/MapView';
import SearchBar from '@/components/SearchBar/SearchBar';

// Hooks
import useDeviceInfo from '@/hooks/useDeviceInfo';
import { useAppTheme } from '@/providers/ThemeProvider';
import { useAppStore } from '@/store/useAppStore';
import { useNavigation } from '@react-navigation/native';
import { getUserLocation } from '@/utils/location';

// Utils & Types
import { cardData } from '@/__mocks__/mockCardData';

export default function HomeScreen() {
  const navigation = useNavigation();
  const route = useRouter();
  const appState = useRef(AppState.currentState);
  const { width } = useDeviceInfo();
  const searchRef = useRef<TextInput>(null);
  const { theme } = useAppTheme();
  const { updateUserLocation } = useAppStore((state) => state);
 
  // =====================
  // Side effects for Focus, Blur, and active/inactive app in background when permissions set on device settings
  // =====================

  // Handle search blur on navigation away (triggers onBlur if focused)
  useEffect(() => {
    const blurListener = navigation.addListener('blur', () => {
      if (searchRef.current?.isFocused()) {
        searchRef.current.blur();
      }
    });
    return blurListener;
  }, [navigation]);

  // Prevent auto-focus on search  return to home tab
  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      // Intentionally empty: ensures no auto-focus when navigating back
    });
    return focusListener;
  }, [navigation]);

  useEffect(() => {
    // Subscribe to app state changes
    const subscription = AppState.addEventListener('change', async (nextAppState) => {
      // Transition from background/inactive to active
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        // console.log('App returned to foreground. Re-checking settings...');
        updateAppStateLocation();
      }
      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, []);

  const updateAppStateLocation = async () => {
    const result = await getUserLocation();
    if (result.status === 'granted' && result.location) {
      updateUserLocation(result.location);
    } else {
      // Handle "no permission" mode – maybe default to a fallback location
      updateUserLocation(null); // NYC fallback
    }
  };

 
 
  const renderItem = ({ item }: { item: { id: number; title: string } }) => {
    return (
      <Pressable
      accessibilityLabel='Event Card Item'
      accessibilityRole='button'
      onPress={() => console.log('card press')}>
        <View>
          <Text style={{ ...theme.typography.body, color: theme.colors.primary }}>{item.title}</Text>
        </View>
      </Pressable>
    );
  };
  return (
    <View 
    style={{ flex: 1 }}
    >
      <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' ,margin:6}}>
      <SearchBar ref={searchRef} />
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          if (searchRef.current?.isFocused()) {
            searchRef.current.blur();
          }
          Keyboard.dismiss(); // Ensures keyboard hides on tap outside of searchbar
        }}
        accessible={false}>
        <View style={{ flex: 1, backgroundColor: 'red' }}>
          <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <View style={{ flex: 1 }}>
              <MapView
              />
            </View>
            <View style={{ flex: 1 }}>
              <FlatList
                data={cardData}
                renderItem={renderItem}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
