'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const name = searchParams.get('name');
  const total = searchParams.get('total');

  const whatsappMessage = `Hi, I placed order ${orderId}. Please help.`;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-white/[0.03] border border-white/10 p-8 md:p-12 text-center"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
          className="w-20 h-20 bg-electric-500/20 text-electric-300 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 size={40} />
        </motion.div>
        
        <h1 className="text-3xl font-black uppercase text-white tracking-tight mb-2">Order Placed Successfully</h1>
        <p className="text-zinc-400 mb-8">Thank you for your order, {name}. We will process it shortly.</p>
        
        <div className="bg-black border border-white/10 p-6 text-left mb-8">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Order ID</span>
            <span className="text-white font-mono">{orderId}</span>
          </div>
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Payment Method</span>
            <span className="text-white font-bold">Cash on Delivery</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Total Amount</span>
            <span className="text-white text-xl font-black">₹{total}</span>
          </div>
        </div>

        <div className="space-y-4 flex flex-col items-center">
          <a 
            href={`https://wa.me/917015553297?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex min-h-14 items-center justify-center gap-2 border border-[#25D366] bg-[#25D366]/10 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
          >
            <MessageCircle className="h-5 w-5" /> Track via WhatsApp
          </a>
          
          <Link 
            href="/"
            className="w-full inline-flex min-h-14 items-center justify-center gap-2 border border-white/10 bg-transparent px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white hover:bg-white/5 transition-colors"
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
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
