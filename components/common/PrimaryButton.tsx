import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { LinearGradient } from 'expo-linear-gradient';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
}
export const PrimaryButton = ({ title, onPress }: PrimaryButtonProps) => {
  const {
    theme: { colors, gradient, radius },
  } = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={[gradient.primary[0], gradient.primary[1]]}
        style={[styles.button, { borderRadius: radius.md }]}>
        <Text style={[styles.text, { color: colors.textPrimary }]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    alignItems: 'center',
    marginVertical: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
