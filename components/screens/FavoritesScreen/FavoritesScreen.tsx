import { StyleSheet, View } from 'react-native';
import TextBody from '@/components/common/TextBody/TextBody';
import { useAppTheme } from '@/providers/ThemeProvider';
// A list of saved events
const FavoritesScreen = () => {
  const { theme } = useAppTheme();
  return (
    <View style={{ backgroundColor: 'green' }}>
      <TextBody style={{ color: 'red'}}>My Favorites</TextBody>
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({});
