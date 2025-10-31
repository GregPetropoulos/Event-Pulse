import { Slot } from 'expo-router';
import { View } from 'react-native';
import { ThemedView } from '@/components/common/ThemedView';
export default function Layout() {
  return (
    <ThemedView>
      <Slot />
    </ThemedView>
  );
}
