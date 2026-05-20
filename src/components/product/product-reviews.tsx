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
    <section className="border-b border-ivory-200 bg-ivory-50 py-10 md:py-14">
      <div className="container max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-sm font-bold uppercase text-gold-500">Customer Reviews</p>
            <h2 className="mt-3 text-balance text-3xl leading-[1.1] text-foreground md:text-4xl lg:text-5xl font-black tracking-normal uppercase">
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
                      className={star <= Number(averageRating) ? 'text-yellow-500' : 'text-ivory-300'} 
                    />
                  ))}
                </div>
                <span className="text-2xl font-bold text-foreground ml-2">{averageRating}</span>
              </div>
              <p className="text-sm text-muted">Based on {reviews.length} verified review{reviews.length === 1 ? '' : 's'}</p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="mt-4 text-xs font-bold uppercase tracking-wider text-gold-500 hover:text-gold-600 transition-colors"
              >
                Write a Review
              </button>
            </div>
          ) : null}
        </div>

        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="animate-spin text-muted" size={32} />
          </div>
        ) : reviews.length === 0 ? (
          <div className="py-16 text-center border border-ivory-200 bg-white rounded-2xl shadow-sm">
            <MessageSquare className="mx-auto text-ivory-400 mb-4" size={48} />
            <h3 className="text-xl font-bold text-foreground mb-2">No reviews yet</h3>
            <p className="text-muted mb-6">Be the first to review this product and share your experience.</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-gold-300 bg-gold-50 px-6 py-2 text-sm font-bold uppercase tracking-[0.16em] text-gold-500 shadow-sm hover:bg-gold-400 hover:border-gold-400 hover:text-white transition-colors btn-primary"
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
                className="p-6 border border-ivory-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex text-yellow-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        size={14} 
                        fill={star <= review.rating ? 'currentColor' : 'transparent'} 
                        className={star <= review.rating ? 'text-yellow-500' : 'text-ivory-300'} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted">{new Date(review.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed mb-6">&quot;{review.review_text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-ivory-200 flex items-center justify-center text-xs font-bold text-foreground shrink-0 border border-ivory-300">
                    {review.customer_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{review.customer_name}</p>
                    {review.city && <p className="text-xs text-muted">{review.city}</p>}
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
                className="relative w-full max-w-lg bg-white border border-ivory-200 p-6 md:p-8 shadow-2xl z-10 rounded-2xl"
              >
                {!submitSuccess && (
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    disabled={isSubmitting}
                    className="absolute top-4 right-4 p-2 text-muted hover:text-foreground transition-colors disabled:opacity-50"
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
                    <h3 className="text-2xl font-bold text-foreground mb-2">Review Submitted Successfully</h3>
                    <p className="text-muted text-sm">Thank you for your feedback! It will appear on the site after admin approval.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold uppercase tracking-wider text-foreground mb-6">Write a Review</h3>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold uppercase text-muted mb-2">Rating</label>
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
                                className={`${star <= formData.rating ? 'text-yellow-500' : 'text-ivory-300 hover:text-ivory-400'} transition-colors`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase text-muted mb-2">Name *</label>
                          <input 
                            type="text" 
                            required
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full bg-ivory-50 border border-ivory-200 focus:border-gold-300 focus:bg-white text-foreground px-4 py-3 outline-none transition-colors" 
                            placeholder="Your name" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase text-muted mb-2">City (Optional)</label>
                          <input 
                            type="text" 
                            value={formData.city}
                            onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                            className="w-full bg-ivory-50 border border-ivory-200 focus:border-gold-300 focus:bg-white text-foreground px-4 py-3 outline-none transition-colors" 
                            placeholder="Your city" 
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-muted mb-2">Review *</label>
                        <textarea 
                          required
                          value={formData.review}
                          onChange={(e) => setFormData(prev => ({ ...prev, review: e.target.value }))}
                          rows={4}
                          className="w-full bg-ivory-50 border border-ivory-200 focus:border-gold-300 focus:bg-white text-foreground px-4 py-3 outline-none transition-colors resize-none" 
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
                        className="w-full inline-flex min-h-12 items-center justify-center gap-2 border border-gold-400 bg-gold-400 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-glow hover:bg-gold-500 hover:border-gold-500 transition-colors disabled:opacity-50 btn-primary"
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
