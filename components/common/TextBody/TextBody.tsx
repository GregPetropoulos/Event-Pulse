import React from 'react';
import { StyleSheet, Text, TextProps, TextStyle, StyleProp } from 'react-native';
import { useAppTheme } from '@/providers/ThemeProvider';

// Use omit to remove fontFamily, fontSize, and lineHeight from the non fixed styles
type TextBodyStyle = Omit<TextStyle, 'fontFamily' | 'fontSize' | 'lineHeight'>;
// Define the component props , use the restricted style type
interface TextBodyProps extends Omit<TextProps, 'style'> {
  children: React.ReactNode;
  style?: StyleProp<TextBodyStyle>;
}
const TextBody = ({ children, style, ...props }: TextBodyProps) => {
  const { theme } = useAppTheme();
  // Enforced base style
  const fixedTypographyStyles: TextStyle = {
    ...theme.typography.body,
  };

  const defaultColorStyle: TextStyle = { color: theme.colors.textPrimary };
  return (
    <Text
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

export default TextBody;
const styles = StyleSheet.create({
  defaultStyles: {},
});
