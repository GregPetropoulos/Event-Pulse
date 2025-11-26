import { StyleSheet, Text, TextStyle, View } from 'react-native';
import React from 'react';
import { Link as ExpoLink, LinkProps } from 'expo-router';
import { useAppTheme } from '@/providers/ThemeProvider';
interface CustomLinkProps {
  width?: number;
}

const Link = (props: LinkProps & CustomLinkProps & TextStyle) => {
  const { theme } = useAppTheme();
  return (
    <ExpoLink
      style={{
        ...styles.link,
        ...theme.typography.body,
        backgroundColor: theme.colors.background,
        borderColor: 'red',
        borderWidth: 1,
        color: props.color ?? theme.colors.textPrimary,
        paddingVertical: theme.spacing.xs,
        marginVertical: theme.spacing.xs,
        marginHorizontal: theme.spacing.sm,
        textAlign: props.textAlign ?? 'center',
        width: props.width ?? undefined,
        // fontSize: theme.typography.body.fontSize
      }}
      testID={props.testID ?? 'common-link-id'}
      target={props.target}
      href={props.href}>
      {/* <Text style={{ fontSize: theme.typography.body }}>{props.children}</Text> */}
      {props.children}
    </ExpoLink>
  );
};

export default Link;

const styles = StyleSheet.create({
  link: {},
});
