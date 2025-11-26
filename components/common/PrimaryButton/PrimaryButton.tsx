import { Pressable, Text } from 'react-native';
import { useAppTheme } from '@/providers/ThemeProvider';
import { LinearGradient } from 'expo-linear-gradient';
import useDeviceInfo from '@/hooks/useDeviceInfo';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
}
export const PrimaryButton = ({ title, onPress }: PrimaryButtonProps) => {
  const {
    theme: { colors, gradient, radius, spacing, typography },
  } = useAppTheme();
  const { width, isLandscape } = useDeviceInfo();
  return (
    <Pressable
      testID='primary-button-id'
      onPress={onPress}
      style={{ width: width / 2.5, height: 'auto' }}>
      <LinearGradient
        colors={[gradient.primary[0], gradient.primary[1]]}
        style={{
          // [styles.button, { borderRadius: radius.md }]
          backgroundColor: colors.primary,
          borderRadius: radius.sm,
          padding: spacing.sm,
          marginTop: spacing.sm,
          alignItems: 'center',
        }}>
        <Text
          style={{
            ...typography.body,
            fontWeight: '600',
            alignItems: 'center',

            color: colors.textPrimary,
          }}>
          {title}
        </Text>
      </LinearGradient>
    </Pressable>
  );
};
