import db from '@/lib/mysql';
import { QueryTypes } from 'sequelize';

import { OrderItem } from '@/types/orders';

export async function getOrderItemById(id: number) {
  const result = await db.query(/*sql*/ `SELECT * FROM order_items where id = ?`, {
    type: QueryTypes.SELECT,
    replacements: [id],
  });

  return (result ? result[0] : null) as OrderItem;
}

export async function addOrderItem(
  order_id: number,
  product_id: number,
  quantity: number,
  total: any
) {
  const [results, metadata]: any = await db.query(
    /*sql*/ `INSERT INTO order_items (order_id, product_id, quantity, total) VALUES (?, ?, ?, ?);
  `,
    { replacements: [order_id, product_id, quantity, total] }
  );

  const orderItem = await getOrderItemById(results);

  return orderItem;

  //   return filial as ResponseOrderProps;
}
