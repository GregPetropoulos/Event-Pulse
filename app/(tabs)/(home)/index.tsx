// import { Image } from 'expo-image';

// import { HelloWave } from '@/components/hello-wave';i
import { Text } from 'react-native';
// import ParallaxScrollView from '@/components/parallax-scroll-view';
// import { Link } from 'expo-router';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/providers/ThemeProvider';
export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const {theme}= useTheme()
  return (
    // <SafeAreaView style={{flex:1,padding:insets.left+100}}>
    <SafeAreaView style={{paddingVertical:insets.top}}>
      <Text style={{color:theme.colors.primary}}>HOME</Text>
      <Text>HOME</Text>
      <PrimaryButton
        title='TEST'
        onPress={() => console.log('YOUOUOUUOU')}
      />
    </SafeAreaView>
  );
}
// export default HomeScreen;
// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });
