import { Text, Pressable } from 'react-native';
import React from 'react';
import { useAppTheme } from '@/providers/ThemeProvider';
import useDeviceInfo from '@/hooks/useDeviceInfo';
type CancelButtonProps = {
  onPress: () => void;
  title?: string;
  buttonWidth?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
};

const CancelButton = ({ title, onPress, size, buttonWidth }: CancelButtonProps) => {
  const {
    theme: { components, spacing, colors, radius },
  } = useAppTheme();
  const { width } = useDeviceInfo();
  return (
    <Pressable
      testID='cancel-button-id'
       accessibilityLabel='cancel button'
       accessibilityRole='button'
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
        backgroundColor: colors.error,
        borderRadius: radius.sm,
        padding: spacing.sm,
      }}
      onPress={onPress}>
      <Text
        style={{ ...components.cancelButton[size ?? 'md'], color: colors.textPrimary }}
        numberOfLines={1}
        ellipsizeMode='tail'>{`${title ?? 'Cancel'}`}</Text>
    </Pressable>
  );
};

export default CancelButton;
