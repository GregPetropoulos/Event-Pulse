
import { useEffect, useRef } from 'react';
import {  Pressable, View, FlatList, AppState } from 'react-native';
import TextBody from '@/components/common/TextBody/TextBody';
import MapView from '../MapScreen/MapView/MapView';

// Hooks
import { useAppTheme } from '@/providers/ThemeProvider';
import { useAppStore } from '@/store/useAppStore';
import { getUserLocation } from '@/utils/location';

// Utils & Types
import { cardData } from '@/__mocks__/mockCardData';

export default function HomeScreen() {
  const appState = useRef(AppState.currentState);
  const { theme } = useAppTheme();
  const { updateUserLocation } = useAppStore((state) => state);

  useEffect(() => {
    // Subscribe to app state changes for detecting when app is is in background or foreground
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
          {/* <Text style={{ ...theme.typography.body, color: theme.colors.primary }}>{item.title}</Text> */}
          <TextBody>{item.title}</TextBody>
        </View>
      </Pressable>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ flex: 3 }}>
        <MapView />
      </View>
      <FlatList
        data={cardData}
        renderItem={renderItem}
      />
    </View>
  );
}
