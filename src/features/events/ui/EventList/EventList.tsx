import { StyleSheet, Pressable, View, FlatList } from 'react-native';
import React, { useCallback } from 'react';
import TextBody from '@/components/common/Typography/TextBody/TextBody';
import TextSmall from '@/components/common/Typography/TextSmall/TextSmall';
import { Image } from 'expo-image';
import * as Linking from 'expo-linking';
import Loader from '@/components/common/Loader/Loader';

// Hooks
import { useAppStore } from '@/store/useAppStore';
import { useAppTheme } from '@/providers/ThemeProvider';
import { useEvents } from '@/features/events/hooks';

// Types & Utils
import { IEvent } from '../../types';
import { formatIsoToWeekDayMMDDYYYY } from '@/utils/dateUtils';

const BLURHASH =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

// Approximate row height — adjust to match your actual layout
const ITEM_HEIGHT = 93; // 75px image + md paddingVertical + separator

const EventList = () => {
  const { theme } = useAppTheme();
  const { userCoords } = useAppStore((state) => state);
  const { data, isLoading, error } = useEvents({
    lat: userCoords.latitude,
    lng: userCoords.longitude,
    radius: 50,
    size: 100,
  });

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
    return <Loader />;
  }
  if (!isLoading && error) {
    return <TextBody>{error.message}</TextBody>;
  }

  return (
    <FlatList
      data={data?.events}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      getItemLayout={getItemLayout}
      windowSize={11}
      initialNumToRender={8}
      maxToRenderPerBatch={6}
      ListEmptyComponent={<TextBody>No List Data available</TextBody>}
    />
  );
};

export default EventList;

export const styles = StyleSheet.create({
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
});
