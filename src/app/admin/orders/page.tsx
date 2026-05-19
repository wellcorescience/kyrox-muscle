'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart, Search, Filter, MessageCircle, ChevronDown, CheckCircle, Package, Truck, XCircle, Clock } from 'lucide-react';
import { getOrders, updateOrderStatus } from '@/app/actions/order';
import { Order, OrderStatus } from '@/types/order';

const STATUS_OPTIONS: OrderStatus[] = ['Pending', 'Confirmed', 'Packed', 'Shipped', 'Delivered', 'Cancelled'];

function getStatusColor(status: OrderStatus) {
  switch (status) {
    case 'Pending': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    case 'Confirmed': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
    case 'Packed': return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
    case 'Shipped': return 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20';
    case 'Delivered': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
    case 'Cancelled': return 'text-red-500 bg-red-500/10 border-red-500/20';
    default: return 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20';
  }
}

function getStatusIcon(status: OrderStatus) {
  switch (status) {
    case 'Pending': return <Clock size={14} className="mr-1.5" />;
    case 'Confirmed': return <CheckCircle size={14} className="mr-1.5" />;
    case 'Packed': return <Package size={14} className="mr-1.5" />;
    case 'Shipped': return <Truck size={14} className="mr-1.5" />;
    case 'Delivered': return <CheckCircle size={14} className="mr-1.5" />;
    case 'Cancelled': return <XCircle size={14} className="mr-1.5" />;
    default: return null;
  }
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const result = await getOrders();
    if (result.success && result.orders) {
      setOrders(result.orders);
    }
    setLoading(false);
  };

  const handleStatusChange = async (id: string, newStatus: OrderStatus) => {
    const result = await updateOrderStatus(id, newStatus);
    if (result.success) {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    } else {
      alert('Failed to update status');
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.customer_name.toLowerCase().includes(search.toLowerCase()) || 
                          o.order_id.toLowerCase().includes(search.toLowerCase()) ||
                          o.phone.includes(search);
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Orders</h1>
          <p className="text-zinc-400">Manage COD orders, update statuses, and contact customers.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            type="text" 
            placeholder="Search by customer, order ID, or phone..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-10 pr-8 py-2 bg-zinc-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 appearance-none min-w-[160px]"
          >
            <option value="All">All Statuses</option>
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={16} />
        </div>
      </div>

      <div className="bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="p-4 text-xs font-medium text-zinc-400 uppercase tracking-wider">Order ID & Date</th>
                <th className="p-4 text-xs font-medium text-zinc-400 uppercase tracking-wider">Customer</th>
                <th className="p-4 text-xs font-medium text-zinc-400 uppercase tracking-wider">Product</th>
                <th className="p-4 text-xs font-medium text-zinc-400 uppercase tracking-wider">Amount</th>
                <th className="p-4 text-xs font-medium text-zinc-400 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-medium text-zinc-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-zinc-500">Loading orders...</td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-zinc-500">No orders found.</td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4">
                      <div className="font-mono text-sm text-white font-medium">{order.order_id}</div>
                      <div className="text-xs text-zinc-500 mt-1">{new Date(order.created_at).toLocaleDateString()}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-medium text-white">{order.customer_name}</div>
                      <div className="text-xs text-zinc-500 mt-1">{order.phone}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-white">{order.product_name}</div>
                      <div className="text-xs text-zinc-500 mt-1">{order.flavor} x {order.quantity}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-bold text-white">₹{order.amount}</div>
                      <div className="text-[10px] uppercase text-zinc-500 mt-1">COD</div>
                    </td>
                    <td className="p-4">
                      <div className="relative inline-block">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                          className={`appearance-none pl-3 pr-8 py-1.5 rounded-full text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-white/20 cursor-pointer ${getStatusColor(order.status)}`}
                        >
                          {STATUS_OPTIONS.map(s => <option key={s} value={s} className="bg-zinc-900 text-white">{s}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none" size={14} />
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <a 
                        href={`https://wa.me/91${order.phone}?text=${encodeURIComponent(`Hi ${order.customer_name}, regarding your order ${order.order_id}...`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center p-2 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
                        title="WhatsApp Customer"
                      >
                        <MessageCircle size={18} />
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
