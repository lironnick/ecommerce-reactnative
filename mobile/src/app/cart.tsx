import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Image,
  FlatList,
  Platform,
  Keyboard,
} from 'react-native';

import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ConfettiCannon from 'react-native-confetti-cannon';

import useCartStore from '@/context/cart';

import { Order, createOrder } from '@/api/api';

export default function Cart() {
  const { products, total, reduceProduct, addProduct, clearCart } = useCartStore((state) => ({
    products: state.products,
    total: state.total,
    reduceProduct: state.reduceProduct,
    addProduct: state.addProduct,
    clearCart: state.clearCart,
  }));

  const [email, setEmail] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmitOrder = async () => {
    setSubmitting(true);
    Keyboard.dismiss();
    try {
      console.log(email, products);
      const response = await createOrder({
        email,
        products: products.map((product) => ({
          product_id: product.id,
          quantity: product.quantity,
        })),
      });
      setOrder(response);
      clearCart();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View className="flex-1 p-5 bg-white">
      {order && (
        <ConfettiCannon
          count={200}
          origin={{ x: -10, y: 0 }}
          fallSpeed={2500}
          fadeOut={false}
          autoStart={true}
        />
      )}

      {order && (
        <View className="mt-[50%] p-5 bg-black rounded-3xl mb-5 items-center">
          <Text className="text-white font-bold text-2xl">Pedido realizado com sucesso!</Text>
          <Text className="text-white text-base m-5">Pedido: {order.id}</Text>
          <TouchableOpacity onPress={() => router.back()} className="bg-red-1000 p-2 rounded-lg">
            <Text className="text-black font-bold text-base ">Continue no Shopping</Text>
          </TouchableOpacity>
        </View>
      )}
      {!order && (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={65}
        >
          <Text className="text-red-1000 text-xl mb-5  font-bold text-center">Seu carrinho</Text>
          {products.length === 0 && <Text className="  text-center">Seu carrinho esta vazio!</Text>}
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View className="mb-3 flex-row items-center gap-5">
                <Image
                  className="w-12 h-12 object-contain rounded-lg mb-3"
                  source={{ uri: item.product_image }}
                />
                <View className="flex-1">
                  <Text className="text-base font-bold">{item.product_name}</Text>
                  <Text>Price: ${item.product_price}</Text>
                </View>

                <View className="flex-row items-center">
                  <TouchableOpacity onPress={() => reduceProduct(item)} className="p-3">
                    <Ionicons name="remove" size={20} color={'#000'} />
                  </TouchableOpacity>

                  <Text className="font-bold text-base bg-red-1000 p-1 w-12 text-white text-center">
                    {item.quantity}
                  </Text>
                  <TouchableOpacity onPress={() => addProduct(item)} className="p-3">
                    <Ionicons name="add" size={20} color={'#000'} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <Text className="text-lg font-bold mt-3 p-3 bg-[#f2f2f2]">
            Total: R${total.toFixed(2)}
          </Text>

          <TextInput
            className="border-2 border-gray-200 rounded-md p-3 mt-3"
            placeholder="Enter your email"
            onChangeText={setEmail}
          />
          <TouchableOpacity
            className="bg-red-1000 p-3 rounded-md mt-5 items-center mb-8"
            onPress={onSubmitOrder}
            disabled={email === '' || submitting}
          >
            <Text className="text-white text-base font-bold">
              {submitting ? 'Criando pedido...' : 'Criar pedido'}
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )}
    </View>
  );
}
