import db from '@/lib/mysql';
import { QueryTypes } from 'sequelize';

import { ResponseOrderProps, Order } from '@/types/orders';

export async function getOrderById(id: number) {
  const result = await db.query(/*sql*/ `SELECT * FROM orders where id = ?`, {
    type: QueryTypes.SELECT,
    replacements: [id],
  });

  return (result ? result[0] : null) as Order;
}

export async function addOrder(email: string) {
  const [results, metadata]: any = await db.query(
    /*sql*/ `INSERT INTO orders (customer_email) VALUES (?);
  `,
    { replacements: [email] }
  );

  return results;
}

export async function updateOrder(id: number, total: number): Promise<any> {
  const result = await db.query(
    /*sql*/ `UPDATE orders SET total = ? WHERE id = ?;
`,
    { replacements: [total, id] }
  );

  return result;
}
