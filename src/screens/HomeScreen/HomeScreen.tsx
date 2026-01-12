import TextBody from '@/components/common/Typography/TextBody/TextBody';
import { useEffect, useRef } from 'react';
import { AppState, FlatList, Pressable, View } from 'react-native';
import Map from '../../components/Map/Map';

// Hooks
import { useAppTheme } from '@/providers/ThemeProvider';
import { useAppStore } from '@/store/useAppStore';

// Service
import { getUserLocation } from '@/features/location/locationService';

// Utils & Types
import { cardData } from '@/test/mocks/mockCardData';
import { NYC_DEFAULT } from '@/constants/mapDefaults';

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
      updateUserLocation(NYC_DEFAULT); // NYC fallback
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
        <Map />
      </View>
      <FlatList
        data={cardData}
        renderItem={renderItem}
      />
    </View>
  );
}
