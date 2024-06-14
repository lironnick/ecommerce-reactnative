import db from '@/lib/mysql';
import { QueryTypes } from 'sequelize';

import { ResponseProductProps } from '@/types/products';
import { number } from 'zod';

type GetProdutcsProps = {
  page?: number;
  limit?: number;
};

export async function getProducts({ page = 1, limit = 10 }: GetProdutcsProps) {
  const offset = (page - 1) * limit;

  console.log({ offset, limit });

  const result = await db.query(/*sql*/ `SELECT * FROM products ORDER BY id ASC LIMIT ?, ? `, {
    type: QueryTypes.SELECT,
    replacements: [Number(offset), Number(limit)],
  });

  return result;
}

export async function getCountProducts() {
  const result = await db.query(/*sql*/ `SELECT count(*) as total FROM products`, {
    type: QueryTypes.SELECT,
    replacements: [],
  });

  return (result ? result[0] : null) as { total: number };
}

export async function getProductById(id: number) {
  const result = await db.query(/*sql*/ `SELECT * FROM products WHERE id = ? LIMIT 1`, {
    type: QueryTypes.SELECT,
    replacements: [id],
  });

  return (result ? result[0] : null) as ResponseProductProps;
}

export async function addProducts(email: string) {
  const [results, metadata]: any = await db.query(
    /*sql*/ `INSERT INTO products (customer_email) VALUES (?);
  `,
    { replacements: [email] }
  );

  return results;

  //   return filial as ResponseOrderProps;
}
