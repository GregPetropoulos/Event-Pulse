import { Slot } from 'expo-router';
import { ThemedView } from '@/components/common/ThemedView';
export default function Layout() {
  return (
    <ThemedView>
      <Slot />
    </ThemedView>
  );
}
