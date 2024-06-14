import '@/styles/global.css';
import 'react-native-reanimated';
import 'react-native-gesture-handler';

import { Slot, Stack } from 'expo-router';

import { Loading } from '@/components/loading';

import {
  useFonts,
  Roboto_700Bold,
  Roboto_500Medium,
  Roboto_400Regular,
} from '@expo-google-fonts/roboto';
import { CartButton } from '@/components/cartButton';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_500Medium,
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#EF4444',
        },
        headerTintColor: '#fff',
        headerRight: () => <CartButton />,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: true, headerTitle: 'Ecom' }} />
      <Stack.Screen name="(detail)" options={{ headerTitle: '' }} />
      <Stack.Screen name="cart" options={{ headerShown: false, presentation: 'modal' }} />
    </Stack>
  );
}
