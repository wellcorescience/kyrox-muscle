'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare, X, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { getApprovedReviews, submitReview } from '@/app/actions/review';
import { Review } from '@/types/review';

interface ProductReviewsProps {
  productId: string;
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    city: '',
    rating: 5,
    review: ''
  });

  useEffect(() => {
    async function loadReviews() {
      setLoading(true);
      const res = await getApprovedReviews(productId);
      if (res.success && res.reviews) {
        setReviews(res.reviews);
      }
      setLoading(false);
    }
    loadReviews();
  }, [productId]);

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.review.trim()) {
      setError('Name and review text are required.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const res = await submitReview({
      product_id: productId,
      customer_name: formData.name,
      city: formData.city || undefined,
      rating: formData.rating,
      review_text: formData.review
    });

    setIsSubmitting(false);

    if (res.success) {
      setSubmitSuccess(true);
      setFormData({ name: '', city: '', rating: 5, review: '' });
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
      }, 3000);
    } else {
      setError(res.error || 'Failed to submit review');
    }
  };

  return (
    <section className="border-b border-white/10 bg-[#0A0A0A] py-16 md:py-24">
      <div className="container max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-sm font-bold uppercase text-electric-300">Customer Reviews</p>
            <h2 className="mt-3 text-balance text-4xl leading-none text-white md:text-5xl">
              Real Athlete Feedback
            </h2>
          </div>

          {reviews.length > 0 ? (
            <div className="flex flex-col md:items-end">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex text-yellow-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={20} 
                      fill={star <= Number(averageRating) ? 'currentColor' : 'transparent'} 
                      className={star <= Number(averageRating) ? 'text-yellow-500' : 'text-zinc-700'} 
                    />
                  ))}
                </div>
                <span className="text-2xl font-bold text-white ml-2">{averageRating}</span>
              </div>
              <p className="text-sm text-zinc-400">Based on {reviews.length} verified review{reviews.length === 1 ? '' : 's'}</p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="mt-4 text-xs font-bold uppercase tracking-wider text-electric-300 hover:text-white transition-colors"
              >
                Write a Review
              </button>
            </div>
          ) : null}
        </div>

        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="animate-spin text-zinc-500" size={32} />
          </div>
        ) : reviews.length === 0 ? (
          <div className="py-16 text-center border border-white/10 bg-white/[0.02]">
            <MessageSquare className="mx-auto text-zinc-600 mb-4" size={48} />
            <h3 className="text-xl font-bold text-white mb-2">No reviews yet</h3>
            <p className="text-zinc-400 mb-6">Be the first to review this product and share your experience.</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-metal-200 bg-metal-200 px-6 py-2 text-sm font-bold uppercase tracking-[0.16em] text-black shadow-glow hover:bg-white transition-colors"
            >
              Write a Review
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {reviews.map((review) => (
              <motion.div 
                key={review.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 border border-white/10 bg-white/[0.035] shadow-2xl"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex text-yellow-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        size={14} 
                        fill={star <= review.rating ? 'currentColor' : 'transparent'} 
                        className={star <= review.rating ? 'text-yellow-500' : 'text-zinc-700'} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-zinc-500">{new Date(review.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-6">&quot;{review.review_text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-white shrink-0">
                    {review.customer_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{review.customer_name}</p>
                    {review.city && <p className="text-xs text-zinc-500">{review.city}</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Review Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => !isSubmitting && !submitSuccess && setIsModalOpen(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-lg bg-[#0A0A0A] border border-white/10 p-6 md:p-8 shadow-2xl z-10"
              >
                {!submitSuccess && (
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    disabled={isSubmitting}
                    className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white transition-colors disabled:opacity-50"
                  >
                    <X size={20} />
                  </button>
                )}

                {submitSuccess ? (
                  <div className="text-center py-8">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                      className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle2 size={32} />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">Review Submitted Successfully</h3>
                    <p className="text-zinc-400 text-sm">Thank you for your feedback! It will appear on the site after admin approval.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold uppercase tracking-wider text-white mb-6">Write a Review</h3>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Rating</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                              className="focus:outline-none"
                            >
                              <Star 
                                size={28} 
                                fill={star <= formData.rating ? 'currentColor' : 'transparent'} 
                                className={`${star <= formData.rating ? 'text-yellow-500' : 'text-zinc-700 hover:text-zinc-500'} transition-colors`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Name *</label>
                          <input 
                            type="text" 
                            required
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full bg-black border border-white/20 focus:border-electric-300 text-white px-4 py-3 outline-none transition-colors" 
                            placeholder="Your name" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">City (Optional)</label>
                          <input 
                            type="text" 
                            value={formData.city}
                            onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                            className="w-full bg-black border border-white/20 focus:border-electric-300 text-white px-4 py-3 outline-none transition-colors" 
                            placeholder="Your city" 
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Review *</label>
                        <textarea 
                          required
                          value={formData.review}
                          onChange={(e) => setFormData(prev => ({ ...prev, review: e.target.value }))}
                          rows={4}
                          className="w-full bg-black border border-white/20 focus:border-electric-300 text-white px-4 py-3 outline-none transition-colors resize-none" 
                          placeholder="Tell us what you think..." 
                        />
                      </div>

                      {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2">
                          <AlertCircle size={16} /> {error}
                        </div>
                      )}

                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full inline-flex min-h-12 items-center justify-center gap-2 border border-metal-200 bg-metal-200 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-black shadow-glow hover:bg-white transition-colors disabled:opacity-50"
                      >
                        {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : 'SUBMIT REVIEW'}
                      </button>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
