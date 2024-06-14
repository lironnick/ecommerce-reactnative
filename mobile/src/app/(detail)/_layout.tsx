import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
