import { StyleSheet, Text, Pressable, TextStyle, PressableProps } from 'react-native';
import React from 'react';
import { Link as ExpoLink, LinkProps } from 'expo-router';
import { useAppTheme } from '@/providers/ThemeProvider';

interface CustomLinkProps {
  width?: number;
}

const Link = (props: LinkProps & CustomLinkProps & TextStyle&PressableProps) => {
  const { theme } = useAppTheme();

  return (
    <ExpoLink href={props.href} target={props.target} asChild>
      <Pressable
        testID={props.testID ?? 'common-link-id'}
        // style={{
        //   ...styles.link,
        //   // ...theme.typography.body,
        //   backgroundColor: theme.colors.background,
        //   // color: props.color ?? theme.colors.textPrimary,
        //   paddingVertical: theme.spacing.xs,
        //   marginVertical: theme.spacing.xs,
        //   marginHorizontal: theme.spacing.sm,
        //   // textAlign: props.textAlign ?? 'center',
        //   width: props.width,
        // }}
      >
        <Text style={{ color: props.color ?? theme.colors.textPrimary, textAlign:props.textAlign?? 'center'}}>
          {props.children}
        </Text>
      </Pressable>
    </ExpoLink>
  );
};

export default Link;

const styles = StyleSheet.create({
  link: {},
});
