import React, { useRef, useEffect } from 'react';
import { View, TouchableWithoutFeedback, TextInput, Keyboard } from 'react-native';
import { Slot } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '@/components/SearchBar';

export default function HomeLayout() {
  const navigation = useNavigation();
  const searchRef = useRef<TextInput>(null);

  // Handle blur on navigation away (triggers onBlur if focused)
  useEffect(() => {
    const blurListener = navigation.addListener('blur', () => {
      if (searchRef.current?.isFocused()) {
        searchRef.current.blur();
      }
    });
    return blurListener;
  }, [navigation]);

  // Prevent auto-focus on return to home tab
  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      // Intentionally empty: ensures no auto-focus when navigating back
    });
    return focusListener;
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <SearchBar ref={searchRef} />
      <TouchableWithoutFeedback
        onPress={() => {
          if (searchRef.current?.isFocused()) {
            searchRef.current.blur();
          }
          Keyboard.dismiss(); // Ensures keyboard hides on tap outside of searchbar
        }}
        accessible={false}>
        <View style={{ flex: 1 }}>
          <Slot />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
