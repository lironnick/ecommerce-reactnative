import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { fetchProductDetails } from '@/api/api';

import useCartStore from '@/context/cart';

export default function Detail() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<any | null>(null);
  const [count, setCount] = useState(0);
  const { products, addProduct, reduceProduct } = useCartStore((state) => ({
    products: state.products,
    addProduct: state.addProduct,
    reduceProduct: state.reduceProduct,
  }));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await fetchProductDetails(Number(id));
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    const updateProductQuantity = () => {
      const result = products.filter((product: any) => product.id === Number(id));

      if (result.length > 0) {
        setCount(result[0].quantity);
      } else {
        setCount(0);
      }
    };

    updateProductQuantity();
  }, [products]);

  return (
    <View className="flex-1 p-5">
      {product && (
        <>
          <Image
            className="w-full h-72 object-contain rounded-sm"
            source={{ uri: product.product_image }}
          />
          <Text className="">{product.product_name}</Text>
          <Text className="mt-5 text-base font-bold">{product.product_category}</Text>
          <Text className="mt-2 text-base">{product.product_description}</Text>
          <Text className="mt-2 text-xl font-bold">Preço: R${product.product_price}</Text>
          <View className="mt-5 flex-row justify-between items-center gap-5">
            <TouchableOpacity
              className="px-3 rounded-lg bg-white items-center flex-1 border-2 border-[#EF4444]"
              onPress={() => reduceProduct(product)}
            >
              <Ionicons name="remove" size={24} color={'#EF4444'} />
            </TouchableOpacity>
            <Text className="text-xl w-12 font-bold text-center">{count}</Text>
            <TouchableOpacity
              className="px-3 rounded-lg bg-white items-center flex-1 border-2 border-[#EF4444]"
              onPress={() => addProduct(product)}
            >
              <Ionicons name="add" size={24} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
