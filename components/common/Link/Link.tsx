import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link as ExpoLink, LinkProps } from 'expo-router';

const Link = (props: LinkProps) => {
  return (
    <ExpoLink
      testID={props.testID ?? 'common-link-id'}
      target={props.target}
      href={props.href}>
      {props.children}
    </ExpoLink>
  );
};

export default Link;

const styles = StyleSheet.create({});
