import TextBody from '@/components/common/Typography/TextBody/TextBody';
import { useAppTheme } from '@/providers/ThemeProvider';
import { StyleSheet, View } from 'react-native';
// A list of saved events
const FavoritesScreen = () => {
  const { theme } = useAppTheme();
  return (
    <View style={{ backgroundColor: 'green' }}>
      <TextBody style={{ color: 'red' }}>My Favorites</TextBody>
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({});
