export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Packed'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export interface Order {
  id: string; // uuid
  order_id: string; // KYX-ORD-XXXXXX
  customer_name: string;
  phone: string;
  alternate_phone?: string | null;
  address: string;
  city: string;
  state: string;
  pincode: string;
  product_name: string;
  flavor: string;
  quantity: number;
  amount: number;
  payment_method: string;
  status: OrderStatus;
  created_at: string;
}

export interface CreateOrderData {
  customer_name: string;
  phone: string;
  alternate_phone?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  product_name: string;
  flavor: string;
  quantity: number;
  amount: number;
}
