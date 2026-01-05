import { useAppTheme } from '@/providers/ThemeProvider';
import React from 'react';
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native';

// Use omit to remove fontFamily, fontSize, and lineHeight from the non fixed styles
type TextDisplayStyle = Omit<TextStyle, 'fontFamily' | 'fontSize' | 'lineHeight'>;
// Define the component props , use the restricted style type
interface TextDisplayProps extends Omit<TextProps, 'style'> {
  children: React.ReactNode;
  style?: StyleProp<TextDisplayStyle>;
}
const TextDisplay = ({ children, style, ...props }: TextDisplayProps) => {
  const { theme } = useAppTheme();
  // Enforced base style
  const fixedTypographyStyles: TextStyle = {
    ...theme.typography.display,
  };
  const defaultColorStyle: TextStyle = { color: theme.colors.textPrimary };
  return (
    <Text
      accessibilityLabel='TextDisplay'
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

export default TextDisplay;
const styles = StyleSheet.create({
  defaultStyles: {},
});
