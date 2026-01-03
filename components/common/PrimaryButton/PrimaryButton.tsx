import { Pressable, Text } from 'react-native';
import { useAppTheme } from '@/providers/ThemeProvider';
import { LinearGradient } from 'expo-linear-gradient';
import useDeviceInfo from '@/hooks/useDeviceInfo';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  buttonWidth?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}
const PrimaryButton = ({ title, onPress, buttonWidth, size }: PrimaryButtonProps) => {
  const {
    theme: { colors, gradient, radius, spacing, components },
  } = useAppTheme();
  const { width, isLandscape } = useDeviceInfo();
  return (
    <Pressable
      accessibilityLabel='primary button'
      accessibilityRole='button'
      testID='primary-button-id'
      onPress={onPress}
      style={{
         width: buttonWidth
          ? buttonWidth
          : size === 'xs'
            ? width / 4
            : size === 'sm'
              ? width / 3
              : size === 'md'
                ? width / 2.5
                : size === 'lg'
                  ? width / 1.2
                  : width / 2.5, // default width
        height: 'auto',
        marginVertical: spacing.xs,
        marginHorizontal: 2,
      }}>
      <LinearGradient
        testID='primary-button-linear-gradient'
        colors={[gradient.primary[0], gradient.primary[1]]}
        style={{
          backgroundColor: colors.primary,
          borderRadius: radius.sm,
          padding: spacing.sm,
        }}>
        <Text
          style={{ ...components.primaryButton[size ?? 'md'], color: colors.textPrimary }}
          numberOfLines={1}
          ellipsizeMode='tail'>
          {title}
        </Text>
      </LinearGradient>
    </Pressable>
  );
};
export default PrimaryButton;
