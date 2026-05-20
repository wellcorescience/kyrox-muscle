'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const name = searchParams.get('name');
  const total = searchParams.get('total');

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-white border border-ivory-200 shadow-sm rounded-2xl p-8 md:p-12 text-center"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
          className="w-20 h-20 bg-emerald-50 text-emerald-600 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm"
        >
          <CheckCircle2 size={40} />
        </motion.div>
        
        <h1 className="text-3xl font-black uppercase text-foreground tracking-tight mb-2">Order Placed Successfully</h1>
        <p className="text-muted mb-8">Thank you for your order, {name}. We will process it shortly.</p>
        
        <div className="bg-ivory-50 border border-ivory-200 p-6 text-left mb-8 rounded-xl">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-ivory-200">
            <span className="text-muted text-xs font-bold uppercase tracking-wider">Order ID</span>
            <span className="text-foreground font-mono">{orderId}</span>
          </div>
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-ivory-200">
            <span className="text-muted text-xs font-bold uppercase tracking-wider">Payment Method</span>
            <span className="text-foreground font-bold">Cash on Delivery</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted text-xs font-bold uppercase tracking-wider">Total Amount</span>
            <span className="text-foreground text-xl font-black">₹{total}</span>
          </div>
        </div>

        <div className="space-y-4 flex flex-col items-center">
          <Link 
            href="/contact"
            className="w-full inline-flex min-h-14 items-center justify-center gap-2 border border-gold-400 bg-gold-400 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white hover:bg-gold-500 hover:border-gold-500 transition-colors shadow-sm rounded-xl btn-primary"
          >
            Contact Support
          </Link>
          
          <Link 
            href="/"
            className="w-full inline-flex min-h-14 items-center justify-center gap-2 border border-ivory-300 bg-ivory-50 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-foreground hover:bg-white hover:border-gold-300 transition-colors shadow-sm rounded-xl"
          >
            Continue Shopping <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-foreground bg-ivory-50">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
