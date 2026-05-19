'use server';

import { createClient } from '@supabase/supabase-js';
import { CreateOrderData, OrderStatus } from '@/types/order';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function generateOrderId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `KYX-ORD-${result}`;
}

export async function createOrder(data: CreateOrderData) {
  try {
    const orderId = generateOrderId();
    
    const { data: newOrder, error } = await supabase
      .from('orders')
      .insert([
        {
          order_id: orderId,
          customer_name: data.customer_name,
          phone: data.phone,
          alternate_phone: data.alternate_phone,
          address: data.address,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
          product_name: data.product_name,
          flavor: data.flavor,
          quantity: data.quantity,
          amount: data.amount,
          payment_method: 'COD',
          status: 'Pending',
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error creating order:', error);
      throw new Error(error.message);
    }

    return { success: true, order: newOrder };
  } catch (err: any) {
    console.error('Error in createOrder action:', err);
    return { success: false, error: err.message || 'Failed to place order' };
  }
}

export async function getOrders() {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error fetching orders:', error);
      throw new Error(error.message);
    }

    return { success: true, orders: data };
  } catch (err: any) {
    console.error('Error in getOrders action:', err);
    return { success: false, error: err.message || 'Failed to fetch orders' };
  }
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error updating order:', error);
      throw new Error(error.message);
    }

    return { success: true, order: data };
  } catch (err: any) {
    console.error('Error in updateOrderStatus action:', err);
    return { success: false, error: err.message || 'Failed to update order' };
  }
}
