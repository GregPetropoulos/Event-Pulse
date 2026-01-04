import React from 'react';
import { Pressable, Text } from 'react-native';

export const Link = ({ children, testID, onPress }: any) => (
  <Pressable testID={testID} onPress={onPress}>
    <Text>{children}</Text>
  </Pressable>
);

export const Stack = ({ children }: any) => children;
export const Tabs = ({ children }: any) => children;

export const useRouter = () => ({
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  setParams:jest.fn()
});

export const useNavigation = () => ({
  navigate: jest.fn(),
  goBack: jest.fn(),
  setOptions: jest.fn(),
});

export const useSegments = () => [];
export const usePathname = () => '/';
export const useLocalSearchParams = () => ({});
