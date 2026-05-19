'use client';

import { useEffect, useState } from 'react';
import { Search, Filter, ChevronDown, CheckCircle2, XCircle, Trash2, Clock, Star } from 'lucide-react';
import { getAllReviews, updateReviewStatus, deleteReview } from '@/app/actions/review';
import { Review, ReviewStatus } from '@/types/review';

const STATUS_OPTIONS: ReviewStatus[] = ['Pending', 'Approved', 'Rejected'];

function getStatusColor(status: ReviewStatus) {
  switch (status) {
    case 'Pending': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    case 'Approved': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
    case 'Rejected': return 'text-red-500 bg-red-500/10 border-red-500/20';
    default: return 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20';
  }
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    const result = await getAllReviews();
    if (result.success && result.reviews) {
      setReviews(result.reviews);
    }
    setLoading(false);
  };

  const handleStatusChange = async (id: string, newStatus: ReviewStatus) => {
    const result = await updateReviewStatus(id, newStatus);
    if (result.success) {
      setReviews(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    } else {
      alert('Failed to update review status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    
    const result = await deleteReview(id);
    if (result.success) {
      setReviews(prev => prev.filter(r => r.id !== id));
    } else {
      alert('Failed to delete review');
    }
  };

  const filteredReviews = reviews.filter(r => {
    const matchesSearch = r.customer_name.toLowerCase().includes(search.toLowerCase()) || 
                          r.review_text.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Reviews</h1>
          <p className="text-zinc-400">Moderate customer reviews before they appear on product pages.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            type="text" 
            placeholder="Search by customer name or review content..." 
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
                <th className="p-4 text-xs font-medium text-zinc-400 uppercase tracking-wider">Customer</th>
                <th className="p-4 text-xs font-medium text-zinc-400 uppercase tracking-wider">Rating & Product</th>
                <th className="p-4 text-xs font-medium text-zinc-400 uppercase tracking-wider">Review</th>
                <th className="p-4 text-xs font-medium text-zinc-400 uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-medium text-zinc-400 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-medium text-zinc-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-zinc-500">Loading reviews...</td>
                </tr>
              ) : filteredReviews.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-zinc-500">No reviews found.</td>
                </tr>
              ) : (
                filteredReviews.map((review) => (
                  <tr key={review.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-4">
                      <div className="text-sm font-medium text-white">{review.customer_name}</div>
                      <div className="text-xs text-zinc-500 mt-1">{review.city || 'No city'}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center text-yellow-500 mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            size={12} 
                            fill={star <= review.rating ? 'currentColor' : 'transparent'} 
                            className={star <= review.rating ? 'text-yellow-500' : 'text-zinc-700'} 
                          />
                        ))}
                      </div>
                      <div className="text-xs text-zinc-400">{review.product_id}</div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-zinc-300 max-w-sm truncate" title={review.review_text}>
                        {review.review_text}
                      </p>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-zinc-400">{new Date(review.created_at).toLocaleDateString()}</div>
                    </td>
                    <td className="p-4">
                      <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(review.status)}`}>
                        {review.status}
                      </div>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      {review.status !== 'Approved' && (
                        <button 
                          onClick={() => handleStatusChange(review.id, 'Approved')}
                          className="inline-flex items-center justify-center p-2 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 transition-colors"
                          title="Approve Review"
                        >
                          <CheckCircle2 size={16} />
                        </button>
                      )}
                      {review.status !== 'Rejected' && (
                        <button 
                          onClick={() => handleStatusChange(review.id, 'Rejected')}
                          className="inline-flex items-center justify-center p-2 rounded-lg bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 transition-colors"
                          title="Reject Review"
                        >
                          <XCircle size={16} />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(review.id)}
                        className="inline-flex items-center justify-center p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                        title="Delete Review"
                      >
                        <Trash2 size={16} />
                      </button>
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
