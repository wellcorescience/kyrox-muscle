'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, XCircle } from 'lucide-react';
import { AuthCodeRecord } from '@/types/auth';

interface VerificationResultProps {
  status: 'valid' | 'invalid' | 'duplicate' | null;
  record?: AuthCodeRecord | null;
  productName?: string;
}

export function VerificationResult({ status, record, productName }: VerificationResultProps) {
  if (!status) return null;

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  if (status === 'invalid') {
    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-8 p-8 rounded-2xl bg-red-500/10 border border-red-500/20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2" />
        
        <div className="flex flex-col items-center text-center relative z-10">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-6">
            <XCircle className="text-red-500" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight mb-2 uppercase">Invalid Product Warning</h2>
          <p className="text-red-400 font-medium tracking-wide">THIS PRODUCT CODE IS INVALID OR FAKE</p>
          <p className="text-zinc-400 mt-4 max-w-sm text-sm">
            Please contact Kyrox Muscle support immediately. Do not consume this product.
          </p>
        </div>
      </motion.div>
    );
  }

  // Handle Valid and Duplicate (both show the product is authentic but duplicate shows a warning)
  const isDuplicate = status === 'duplicate';

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-8 rounded-2xl bg-zinc-900/40 border border-white/10 relative overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-48 h-48 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2 ${isDuplicate ? 'bg-amber-500/10' : 'bg-emerald-500/10'}`} />
      
      <div className="p-8 border-b border-white/5">
        <div className="flex flex-col items-center text-center relative z-10">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${isDuplicate ? 'bg-amber-500/20' : 'bg-emerald-500/20'}`}>
            {isDuplicate ? (
              <AlertTriangle className="text-amber-500" size={32} />
            ) : (
              <ShieldCheck className="text-emerald-500" size={32} />
            )}
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight mb-2 uppercase">
            {productName || 'Kyrox Supplement'}
          </h2>
          <div className={`px-4 py-1.5 rounded-full border text-sm font-bold tracking-wide uppercase ${isDuplicate ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'}`}>
            {isDuplicate ? 'THIS CODE HAS BEEN VERIFIED MULTIPLE TIMES' : 'THIS PRODUCT IS AUTHENTIC'}
          </div>
        </div>
      </div>

      <div className="p-8 bg-black/20">
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-zinc-500 mb-1 uppercase tracking-wider text-xs font-bold">Authentication Code</p>
            <p className="text-white font-mono">{record?.code}</p>
          </div>
          {record?.batch_number && (
            <div>
              <p className="text-zinc-500 mb-1 uppercase tracking-wider text-xs font-bold">Batch Number</p>
              <p className="text-white font-mono">{record.batch_number}</p>
            </div>
          )}
          <div>
            <p className="text-zinc-500 mb-1 uppercase tracking-wider text-xs font-bold">First Scan Date</p>
            <p className="text-white font-mono">{record?.first_scanned_at ? new Date(record.first_scanned_at).toLocaleDateString() : 'Today'}</p>
          </div>
          <div>
            <p className="text-zinc-500 mb-1 uppercase tracking-wider text-xs font-bold">Total Scans</p>
            <p className="text-white font-mono">{record?.scan_count || 1}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
