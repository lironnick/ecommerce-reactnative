import { FastifyInstance } from 'fastify';

import { getProducts, getProductById } from '@/models/products';
import { addOrder, updateOrder } from '@/models/orders';
import { addOrderItem } from '@/models/orderItem';

import { OrderItem } from '@/types/orders';

export default async function orderRoute(app: FastifyInstance) {
  app.get('/:id', async (request, reply) => {
    const { id } = <any>request.params;

    const product = await getProductById(id);

    return reply.status(200).send(product);
  });

  app.post('/', async (request, reply) => {
    console.log(request.body);
    const { email, products } = <
      { email: string; products: { product_id: number; quantity: number }[] }
    >request.body;

    const order = await addOrder(email);

    const productPrices = await Promise.all(
      products.map(async ({ product_id, quantity }) => {
        const product = await getProductById(product_id);
        return product.product_price;
      })
    );

    const orderProducts = await Promise.all(
      products.map(async ({ product_id, quantity }, index: number) => {
        const total = (+productPrices[index] * +quantity).toFixed(2);
        const orderItem = await addOrderItem(order, product_id, quantity, total);
        return orderItem;
      })
    );

    const total = orderProducts.reduce((acc: number, curr: OrderItem) => {
      return acc + curr.total;
    }, 0);

    await updateOrder(order, total);

    return reply.status(200).send({ id: order, message: 'pedido finalizado com sucesso' });
  });
}
