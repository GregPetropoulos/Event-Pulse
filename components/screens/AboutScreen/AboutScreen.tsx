import { useAppTheme } from '@/providers/ThemeProvider';
import { StyleSheet, Text, View } from 'react-native';

const AboutScreen = () => {
  const {
    theme: {
      colors,
      typography: { aiQuote },
    },
  } = useAppTheme();
  return (
    <View>
      <Text style={{ ...aiQuote, color: colors.textSecondary }}>about</Text>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({});
