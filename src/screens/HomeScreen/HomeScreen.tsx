import TextBody from '@/components/common/Typography/TextBody/TextBody';
import { Image } from 'expo-image';
import * as Linking from 'expo-linking';
import { useCallback, useEffect, useRef } from 'react';
import { ActivityIndicator, AppState, FlatList, Pressable, StyleSheet, View } from 'react-native';
import EventMap from '../../components/EventMap/EventMap';

// Hooks
import { useEvents } from '@/features/events/hooks';
import { useAppTheme } from '@/providers/ThemeProvider';
import { useAppStore } from '@/store/useAppStore';

// Service
import { getUserLocation } from '@/features/location/locationService';

// Utils & Types
// import { cardData } from '@/test/mocks/mockCardData';
import TextSmall from '@/components/common/Typography/TextSmall/TextSmall';
import { NYC_DEFAULT } from '@/constants/mapDefaults';
import { IEvent } from '@/features/events/types';
import { formatIsoToWeekDayMMDDYYYY } from '@/utils/dateUtils';
const BLURHASH =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

// Approximate row height — adjust to match your actual layout
const ITEM_HEIGHT = 93; // 75px image + md paddingVertical + separator

export default function HomeScreen() {
  const appState = useRef(AppState.currentState);
  const { theme } = useAppTheme();
  const { userCoords, updateUserLocation } = useAppStore((state) => state);

  const { data, isLoading, error } = useEvents({
    lat: userCoords.latitude,
    lng: userCoords.longitude,
    radius: 30,
    size: 100,
  });

  const updateAppStateLocation = async () => {
    const result = await getUserLocation();
    if (result.status === 'granted' && result.location) {
      updateUserLocation(result.location);
    } else {
      // Handle "no permission" mode – maybe default to a fallback location
      updateUserLocation(NYC_DEFAULT); // NYC fallback
    }
  };

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

  // Pre-compute dynamic styles that depend on theme but not on individual items
  const evenBgColor = theme.colors.transparent;
  const oddBgColor = theme.colors.surface;

  const renderItem = useCallback(
    ({ item, index }: { item: IEvent; index: number }) => {
      // console.log('<---------------------item', item);
      const dateTime = formatIsoToWeekDayMMDDYYYY(item.date) ?? '';
      const handleCardPress = async () => {
        await Linking.openURL(item.url);
      };
      return (
        <>
          <Pressable
            accessibilityLabel='Event Card Item'
            accessibilityRole='button'
            onPress={handleCardPress}
            style={[
              styles.card,
              {
                backgroundColor: index % 2 === 0 ? evenBgColor : oddBgColor,
                paddingVertical: theme.spacing.md,
                paddingLeft: theme.spacing.xs,
              },
            ]}>
            <View style={[styles.imageView, { borderColor: theme.colors.textPrimary, borderWidth: 0.75 }]}>
              <Image
                style={styles.image}
                source={item.image}
                placeholder={{ blurhash: BLURHASH }}
                transition={1000}
              />
            </View>
            <View style={[styles.textContainer, { marginLeft: theme.spacing.sm }]}>
              <TextBody style={{ fontWeight: 900 }}>{item.title}</TextBody>
              <TextSmall>{`${item.city}, ${item.venue}`}</TextSmall>
              <TextSmall>{dateTime}</TextSmall>
            </View>
          </Pressable>
          <View style={[styles.separator, { borderBottomColor: theme.gradient.secondary[0] }]} />
        </>
      );
    },
    [theme, oddBgColor, evenBgColor],
  );
  const keyExtractor = useCallback((item: IEvent) => item.id, []);
  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );
  if (isLoading) {
    return (
      <View style={styles.activityView}>
        <ActivityIndicator
          size='large'
          color={theme.colors.primary}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}>
      <View style={{ flex: 1 }}>
        <EventMap />
      </View>
      <View style={{ flex: 1 }}>
        {error && <TextBody>{error.message}</TextBody>}
        {data?.events.length === 0 && !isLoading ? (
          <TextBody>No Data available</TextBody>
        ) : (
          <FlatList
            data={data?.events}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            getItemLayout={getItemLayout}
            windowSize={11}
            initialNumToRender={8}
            maxToRenderPerBatch={6}
          />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: 75,
    overflow: 'hidden',
    borderRadius: 50,
  },
  image: {
    flex: 1,
    width: '100%',
  },
  card: {
    flex: 1,
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
  },
  separator: {
    borderBottomWidth: 2,
    marginVertical: 1,
  },
  activityView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
