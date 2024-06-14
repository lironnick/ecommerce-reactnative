export type ResponseOrderProps = {
  id: number;
  customer_email: string;
  total: number;
};

export type Order = {
  id: number;
  customer_email: string;
  total: number;
};

export type OrderItem = {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  total: number;
};
