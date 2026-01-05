import useDeviceInfo from '@/hooks/useDeviceInfo';
import { useAppTheme } from '@/providers/ThemeProvider';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text } from 'react-native';

interface SecondaryButtonProps {
  title: string;
  onPress: () => void;
  buttonWidth?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}
const SecondaryButton = ({ title, onPress, buttonWidth, size }: SecondaryButtonProps) => {
  const {
    theme: { colors, gradient, radius, spacing, components },
  } = useAppTheme();
  const { width, isLandscape } = useDeviceInfo();
  return (
    <Pressable
      accessibilityLabel='secondary button'
      accessibilityRole='button'
      testID='secondary-button-id'
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
        testID='secondary-button-linear-gradient'
        colors={[gradient.secondary[0], gradient.secondary[1]]}
        style={{
          backgroundColor: colors.secondary,
          borderRadius: radius.sm,
          paddingVertical: spacing.xs,
        }}>
        <Text
          style={{ ...components.secondaryButton[size ?? 'md'], color: colors.textSecondary }}
          numberOfLines={1}
          ellipsizeMode='tail'>
          {title}
        </Text>
      </LinearGradient>
    </Pressable>
  );
};
export default SecondaryButton;
