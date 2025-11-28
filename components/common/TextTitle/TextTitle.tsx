import React from 'react';
import { StyleSheet, Text, TextProps, TextStyle, StyleProp } from 'react-native';
import { useAppTheme } from '@/providers/ThemeProvider';

// Use omit to remove fontFamily, fontSize, and lineHeight from the non fixed styles
type TextTitleStyle = Omit<TextStyle, 'fontFamily' | 'fontSize' | 'lineHeight'>;
// Define the component props , use the restricted style type
interface TextTitleProps extends Omit<TextProps, 'style'> {
  children: React.ReactNode;
  style?: StyleProp<TextTitleStyle>;
}
const TextTitle = ({ children, style, ...props }: TextTitleProps) => {
  const { theme } = useAppTheme();
  // Enforced base style
  const fixedTypographyStyles: TextStyle = {
    ...theme.typography.title,
  };
  //!STOPPED SHORE UP TESTS
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

export default TextTitle;
const styles = StyleSheet.create({
  defaultStyles: {},
});
