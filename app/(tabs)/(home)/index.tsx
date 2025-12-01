import { FlatList, Keyboard, Pressable, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import MapView from '@/components/MapView/MapView';
import SearchBar from '@/components/SearchBar/SearchBar';
import SecondaryButton from '@/components/common/SecondaryButton/SecondaryButton';

// Hooks
import { useAppStore } from '@/store/useAppStore';
import { useAppTheme } from '@/providers/ThemeProvider';
import { useNavigation } from '@react-navigation/native';

// Utils & Types
import { cardData } from '@/__mocks__/mockCardData';

export default function HomeScreen() {
  const navigation = useNavigation();
  const route = useRouter();
  const searchRef = useRef<TextInput>(null);
  const { theme } = useAppTheme();
  const userCoords = useAppStore((state) => state.userCoords);
  // =====================
  // Focus and Blus side effects
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
  // =====================
  // =====================
  const handleLocationPermissionModal = () => {
    route.navigate('/locationPermissionsModal');
  };
  const renderItem = ({ item }: { item: { id: number; title: string } }) => {
    return (
      <Pressable onPress={() => console.log('card press')}>
        <View>
          <Text style={{ ...theme.typography.body, color: theme.colors.primary }}>{item.title}</Text>
        </View>
      </Pressable>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        <SearchBar ref={searchRef} />
        <SecondaryButton
          title={`Loc ${userCoords ? 'On' : 'Off'}`}
          size={'sm'}
          onPress={handleLocationPermissionModal}
        />
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
            <MapView locations={[]} />
            <FlatList
              data={cardData}
              renderItem={renderItem}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
