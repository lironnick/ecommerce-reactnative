import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import { fetchProducts } from '@/api/api';
import { router } from 'expo-router';

type PaginationProps = {
  limit: number;
  page: number;
  totalPages: number;
  totalRecords: number;
};

export default function products() {
  const [products, setProducts] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function getProducts() {
    setLoading(true);
    const response: any = await fetchProducts(page);

    const data = response.data;
    const pagination: PaginationProps = response.pagination;

    // setProducts((prev: any) => [...prev, ...data]);
    setProducts(page === 1 ? data : products.concat(data));

    if (pagination.totalPages !== page) {
      setPage(page + 1);
    }

    setLoading(false);
  }

  useEffect(() => {
    getProducts();
  }, []);

  const renderProductItem = ({ item }: any) => (
    <TouchableOpacity
      className="flex-1 m-1 p-3 rounded-lg bg-white items-center"
      onPress={() => router.push(`/(detail)/${item.id}`)}
    >
      <Image className="w-24 h-24 object-contain" source={{ uri: item.product_image }} />
      <Text className="mt-2 text-sm font-bold">
        {item.id} - {item.product_name}
      </Text>
      <Text className="mt-1 text-sm text-gray-300">${item.product_price}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 p-3">
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => setPage(1)}
            tintColor={'#000'}
            colors={['#000']}
          />
        }
        ListFooterComponent={<ActivityIndicator size={'large'} className="my-5" />}
        onEndReached={getProducts}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}
