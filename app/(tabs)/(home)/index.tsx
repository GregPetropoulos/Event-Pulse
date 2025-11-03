import { Text, View, FlatList, Pressable } from 'react-native';
import { ThemedView } from '@/components/common/ThemedView';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { useAppTheme } from '@/providers/ThemeProvider';
import { cardData } from '@/mocks/cardData';

export default function HomeScreen() {
  const { theme } = useAppTheme();
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
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.primary }}>Map</Text>
      <Text style={{ color: theme.colors.primary }}>Tabs</Text>
      <Text style={{ color: theme.colors.primary }}>Cards</Text>
      <Text style={{ ...theme.typography.title, color: theme.colors.textPrimary }}>Event Pulse</Text>
      {/* <View> */}

      <PrimaryButton
        title='TEST'
        onPress={() => console.log('TESTTTT')}
      />
      <FlatList
        data={cardData}
        renderItem={renderItem}
      />
      {/* </View> */}
    </View>
  );
}
