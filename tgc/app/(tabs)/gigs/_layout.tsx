import { Stack } from 'expo-router';

export default function GigsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="host" />
      <Stack.Screen name="[id]" />
    </Stack>
  );
}