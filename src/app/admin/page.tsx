'use client';

import { useEffect, useState } from 'react';
import { 
  Package, 
  ShieldCheck, 
  ShoppingCart, 
  Loader2, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  Star, 
  TrendingUp, 
  Plus, 
  AlertTriangle,
  ArrowRight,
  User,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { StatCard } from '@/components/admin/StatCard';
import { getOrders } from '@/app/actions/order';
import { getAllReviews } from '@/app/actions/review';
import { products } from '@/constants/products';
import { mockProducts } from '@/lib/mock-data';

const icons = [
  ShoppingCart, // Total Orders
  Clock, // Pending Orders
  CheckCircle2, // Delivered Orders
  DollarSign, // Revenue
  Package, // Total Products
  Star // Pending Reviews
];

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState([
    { label: 'Total Orders', value: '0', trend: 'Loading...', isPositive: true },
    { label: 'Pending Orders', value: '0', trend: 'Needs processing', isPositive: false },
    { label: 'Delivered', value: '0', trend: 'Successfully delivered', isPositive: true },
    { label: 'Est. Revenue', value: '₹0', trend: 'Total COD value', isPositive: true },
    { label: 'Total Products', value: '0', trend: 'Active in catalog', isPositive: true },
    { label: 'Pending Reviews', value: '0', trend: 'Awaiting moderation', isPositive: false },
  ]);

  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [recentReviews, setRecentReviews] = useState<any[]>([]);
  const [stats, setStats] = useState({
    todayOrders: 0,
    weekOrders: 0,
    pendingShipments: 0,
    approvedReviews: 0,
    averageRating: 0
  });

  useEffect(() => {
    async function loadData() {
      try {
        const orderRes = await getOrders();
        const reviewRes = await getAllReviews();

        let totalOrders = 0;
        let pendingOrders = 0;
        let deliveredOrders = 0;
        let revenue = 0;
        let todayOrdersCount = 0;
        let weekOrdersCount = 0;

        if (orderRes.success && orderRes.orders) {
          const list = orderRes.orders;
          totalOrders = list.length;
          pendingOrders = list.filter(o => o.status === 'Pending').length;
          deliveredOrders = list.filter(o => o.status === 'Delivered').length;
          revenue = list.reduce((sum, o) => sum + Number(o.amount || 0), 0);
          setRecentOrders(list.slice(0, 5));

          // Calculate today and week orders
          const today = new Date();
          today.setHours(0,0,0,0);
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

          list.forEach(o => {
            const date = new Date(o.created_at);
            if (date >= today) todayOrdersCount++;
            if (date >= oneWeekAgo) weekOrdersCount++;
          });
        }

        let pendingReviewsCount = 0;
        let approvedReviewsCount = 0;
        let avgRating = 0;

        if (reviewRes.success && reviewRes.reviews) {
          const list = reviewRes.reviews;
          pendingReviewsCount = list.filter(r => r.status === 'Pending').length;
          approvedReviewsCount = list.filter(r => r.status === 'Approved').length;
          
          const approved = list.filter(r => r.status === 'Approved');
          if (approved.length > 0) {
            avgRating = approved.reduce((sum, r) => sum + Number(r.rating || 0), 0) / approved.length;
          }
          setRecentReviews(list.slice(0, 5));
        }

        setMetrics([
          { label: 'Total Orders', value: totalOrders.toString(), trend: 'All time', isPositive: true },
          { label: 'Pending Orders', value: pendingOrders.toString(), trend: `${pendingOrders} processing`, isPositive: false },
          { label: 'Delivered', value: deliveredOrders.toString(), trend: `${deliveredOrders} delivered`, isPositive: true },
          { label: 'Est. Revenue', value: `₹${revenue.toLocaleString()}`, trend: 'Total value', isPositive: true },
          { label: 'Total Products', value: products.length.toString(), trend: 'Active in catalog', isPositive: true },
          { label: 'Pending Reviews', value: pendingReviewsCount.toString(), trend: `${pendingReviewsCount} action needed`, isPositive: false },
        ]);

        setStats({
          todayOrders: todayOrdersCount,
          weekOrders: weekOrdersCount,
          pendingShipments: pendingOrders,
          approvedReviews: approvedReviewsCount,
          averageRating: Number(avgRating.toFixed(1))
        });

      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2 uppercase">Admin Dashboard</h1>
          <p className="text-zinc-400">Overview of your supplement platform performance, authenticity tracking, and user feedback.</p>
        </div>
        
        {/* QUICK ACTIONS */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 bg-electric-500 hover:bg-white text-black text-xs font-bold uppercase tracking-wider py-3 px-5 transition-colors border border-electric-400"
          >
            <Plus size={14} /> Add Product
          </Link>
          <Link
            href="/admin/authentication"
            className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider py-3 px-5 transition-colors border border-white/10"
          >
            <ShieldCheck size={14} /> Generate Codes
          </Link>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider py-3 px-5 transition-colors border border-white/10"
          >
            <ShoppingCart size={14} /> View Orders
          </Link>
          <Link
            href="/admin/reviews"
            className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider py-3 px-5 transition-colors border border-white/10"
          >
            <Star size={14} /> Manage Reviews
          </Link>
        </div>
      </div>

      {/* STAT CARDS (6 grid items) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {loading ? (
          <div className="col-span-full h-32 flex items-center justify-center border border-white/5 bg-zinc-900/40 rounded-2xl">
            <Loader2 className="animate-spin text-zinc-500" />
          </div>
        ) : (
          metrics.map((metric, index) => (
            <StatCard 
              key={metric.label} 
              metric={metric} 
              icon={icons[index]} 
              delay={index * 0.05} 
            />
          ))
        )}
      </div>

      {/* INSIGHTS WIDGETS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Insights */}
        <div className="bg-zinc-950/80 border border-white/10 p-6 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-electric-500/5 blur-3xl" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-electric-300" /> Order Insights
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="border border-white/5 bg-white/[0.02] p-4 text-center">
              <p className="text-2xl font-black text-white">{stats.todayOrders}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mt-1">Today Orders</p>
            </div>
            <div className="border border-white/5 bg-white/[0.02] p-4 text-center">
              <p className="text-2xl font-black text-white">{stats.weekOrders}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mt-1">This Week</p>
            </div>
            <div className="border border-white/5 bg-white/[0.02] p-4 text-center">
              <p className="text-2xl font-black text-amber-400">{stats.pendingShipments}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mt-1">Pending Shipments</p>
            </div>
          </div>
        </div>

        {/* Review Insights */}
        <div className="bg-zinc-950/80 border border-white/10 p-6 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-metal-200/5 blur-3xl" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
            <Star size={16} className="text-yellow-400" /> Review Insights
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="border border-white/5 bg-white/[0.02] p-4 text-center">
              <p className="text-2xl font-black text-white">{stats.approvedReviews}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mt-1">Approved Reviews</p>
            </div>
            <div className="border border-white/5 bg-white/[0.02] p-4 text-center">
              <p className="text-2xl font-black text-yellow-400 flex items-center justify-center gap-1">
                {stats.averageRating} <Star size={16} fill="currentColor" className="text-yellow-400" />
              </p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mt-1">Avg Rating</p>
            </div>
            <div className="border border-white/5 bg-white/[0.02] p-4 text-center">
              <p className="text-2xl font-black text-electric-300">100%</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mt-1">Verified Buyers</p>
            </div>
          </div>
        </div>
      </div>

      {/* LOW STOCK ALERTS */}
      <div className="bg-zinc-950/80 border border-white/10 p-6 rounded-xl">
        <h3 className="text-sm font-bold uppercase tracking-wider text-red-400 mb-4 flex items-center gap-2">
          <AlertTriangle size={16} /> Inventory / Low Stock Alert
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockProducts.filter(p => p.stockQuantity <= 20).map(p => (
            <div key={p.id} className="border border-red-500/20 bg-red-500/[0.02] p-4 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white text-sm">{p.name}</h4>
                <p className="text-[10px] font-bold text-zinc-500 uppercase mt-1">{p.categoryLabel} &bull; {p.weight}</p>
              </div>
              <div className="text-right">
                <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase bg-red-500/20 text-red-400">
                  {p.stockQuantity === 0 ? "Out of Stock" : `${p.stockQuantity} Left`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Orders Overview Chart (Pure CSS/SVG) */}
        <div className="lg:col-span-2 bg-zinc-950/80 border border-white/10 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[22rem]">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Orders Overview</h3>
            <p className="text-xs text-zinc-500 mt-1">Weekly volume and success rates.</p>
          </div>
          
          <div className="my-6 h-40 flex items-end justify-between gap-3 px-4">
            {[45, 80, 55, 95, 70, 110, 140].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-full bg-white/5 rounded-t relative h-32 flex items-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.8, delay: i * 0.05 }}
                    className="w-full bg-electric-500 group-hover:bg-white rounded-t transition-colors relative"
                  >
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-zinc-800 text-[10px] font-bold text-white px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      {Math.round(h * 1.5)}
                    </span>
                  </motion.div>
                </div>
                <span className="text-[10px] font-bold uppercase text-zinc-500">Wk {i+1}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-4 text-xs font-medium text-zinc-400">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-electric-500 rounded-full" /> Total Sales Volume</span>
            <span className="text-zinc-500">Updated hourly</span>
          </div>
        </div>

        {/* Reviews Summary Breakdown */}
        <div className="bg-zinc-950/80 border border-white/10 rounded-xl p-6 flex flex-col justify-between min-h-[22rem]">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Reviews Summary</h3>
            <p className="text-xs text-zinc-500 mt-1">Verified user rating distribution.</p>
          </div>

          <div className="space-y-3.5 my-6">
            {[
              { stars: 5, pct: 85 },
              { stars: 4, pct: 10 },
              { stars: 3, pct: 3 },
              { stars: 2, pct: 1 },
              { stars: 1, pct: 1 }
            ].map((r) => (
              <div key={r.stars} className="flex items-center gap-3">
                <span className="text-xs font-bold text-zinc-400 w-4">{r.stars}★</span>
                <div className="flex-1 bg-white/5 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-yellow-400 h-full" style={{ width: `${r.pct}%` }} />
                </div>
                <span className="text-[10px] font-bold text-zinc-500 w-8 text-right">{r.pct}%</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-4 text-xs font-medium text-zinc-400">
            <span className="flex items-center gap-1"><Star size={14} className="text-yellow-400 fill-yellow-400" /> Breakdown by rating</span>
            <span className="text-zinc-500">Direct integration</span>
          </div>
        </div>
      </div>

      {/* FEEDS & ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-zinc-950/80 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Recent Orders</h3>
              <p className="text-xs text-zinc-500 mt-1">Latest Cash on Delivery purchases.</p>
            </div>
            <Link href="/admin/orders" className="text-xs font-bold text-electric-300 hover:text-white uppercase tracking-wider flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="divide-y divide-white/5">
            {recentOrders.length === 0 ? (
              <p className="text-sm text-zinc-500 py-4">No recent orders found.</p>
            ) : (
              recentOrders.map((order) => (
                <div key={order.id} className="py-3.5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-white">{order.customer_name}</p>
                    <p className="text-[10px] font-bold uppercase text-zinc-500 mt-1">
                      {order.product_name} &bull; {order.flavor}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">₹{order.amount}</p>
                    <span className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 mt-1 ${
                      order.status === 'Pending' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Reviews Feed */}
        <div className="bg-zinc-950/80 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Recent Reviews Feed</h3>
              <p className="text-xs text-zinc-500 mt-1">Latest reviews left by supplement buyers.</p>
            </div>
            <Link href="/admin/reviews" className="text-xs font-bold text-electric-300 hover:text-white uppercase tracking-wider flex items-center gap-1">
              Manage <ArrowRight size={14} />
            </Link>
          </div>

          <div className="divide-y divide-white/5">
            {recentReviews.length === 0 ? (
              <p className="text-sm text-zinc-500 py-4">No recent reviews found.</p>
            ) : (
              recentReviews.map((review) => (
                <div key={review.id} className="py-3.5 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{review.customer_name}</span>
                      <span className="text-[10px] font-bold text-zinc-500 uppercase">({review.city})</span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1.5 italic">&ldquo;{review.review_text}&rdquo;</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-center justify-end text-yellow-400 text-xs font-bold gap-0.5">
                      {review.rating} <Star size={12} fill="currentColor" />
                    </div>
                    <span className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 mt-1.5 ${
                      review.status === 'Pending' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {review.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
