import { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { router } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';

import useCartStore from '@/context/cart';

export function CartButton() {
  const { products } = useCartStore((state) => ({
    products: state.products,
  }));
  const [count, setCount] = useState(0);

  useEffect(() => {
    const count = products.reduce((prev, products) => prev + products.quantity, 0);
    setCount(count);
  }, [products]);

  return (
    <TouchableOpacity onPress={() => router.push('/cart')}>
      <View className="absolute z-10 -bottom-1 -right-3 w-5 h-5 rounded-xl bg-white justify-center items-center">
        <Text className="text-xs font-bold">{count}</Text>
      </View>
      <Ionicons name="cart" size={28} color={'#000'} />
    </TouchableOpacity>
  );
}
