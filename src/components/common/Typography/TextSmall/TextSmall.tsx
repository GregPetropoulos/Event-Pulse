import { useAppTheme } from '@/providers/ThemeProvider';
import React from 'react';
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native';

// Use omit to remove fontFamily, fontSize, and lineHeight from the non fixed styles
type TextSmallStyle = Omit<TextStyle, 'fontFamily' | 'fontSize' | 'lineHeight'>;
// Define the component props , use the restricted style type
interface TextSmallProps extends Omit<TextProps, 'style'> {
  children: React.ReactNode;
  style?: StyleProp<TextSmallStyle>;
}
const TextSmall = ({ children, style, ...props }: TextSmallProps) => {
  const { theme } = useAppTheme();
  // Enforced base style
  const fixedTypographyStyles: TextStyle = {
    ...theme.typography.small,
  };

  const defaultColorStyle: TextStyle = { color: theme.colors.textPrimary };
  return (
    <Text
      accessibilityLabel='TextSmall'
      accessibilityRole='text'
      style={[
        styles.defaultStyles,
        defaultColorStyle,
        style,
        //These styles are applied last and will override any conflicting styles in the 'style' prop
        fixedTypographyStyles,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

export default TextSmall;
const styles = StyleSheet.create({
  defaultStyles: {},
});
