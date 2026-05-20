'use client';

import { motion, Variants } from 'framer-motion';
import { ShieldCheck, AlertTriangle, XCircle, Flag, Headset } from 'lucide-react';
import Link from 'next/link';
import { AuthCodeRecord } from '@/types/auth';

interface VerificationResultProps {
  status: 'valid' | 'invalid' | 'duplicate' | null;
  record?: AuthCodeRecord | null;
  productName?: string;
}

export function VerificationResult({ status, record, productName }: VerificationResultProps) {
  if (!status) return null;

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: 'easeOut' } 
    }
  };

  if (status === 'invalid') {
    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-8 border border-red-500/20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2" />
        
        <div className="p-8 bg-red-50/50">
          <div className="flex flex-col items-center text-center relative z-10">
            <div className="w-20 h-20 bg-red-100 flex items-center justify-center mb-6 rounded-full shadow-sm">
              <XCircle className="text-red-500" size={40} />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-600 mb-2">Warning</p>
            <h2 className="text-2xl md:text-3xl font-black text-foreground tracking-normal leading-[1.1] mb-3 uppercase">Code Invalid or Suspicious</h2>
            <p className="text-muted max-w-md text-sm leading-relaxed">
              This authentication code could not be found in our database. This product may be counterfeit. Please do not consume and contact Kyrox Muscle support immediately.
            </p>
          </div>
        </div>

        <div className="p-6 bg-white grid grid-cols-2 gap-4 border-t border-red-100">
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center justify-center gap-2 border border-neutral-200 bg-white text-sm font-bold uppercase tracking-wider text-neutral-800 hover:border-gold-400 hover:bg-neutral-50 hover:text-gold-600 transition-colors shadow-sm"
          >
            <Headset className="h-4 w-4" /> Contact Support
          </Link>
          <a
            href="mailto:support@kyroxmuscle.com?subject=Reporting Counterfeit Product"
            className="inline-flex min-h-12 items-center justify-center gap-2 border border-red-500/30 bg-red-50 text-sm font-bold uppercase tracking-wider text-red-600 hover:bg-red-100 transition-colors shadow-sm"
          >
            <Flag className="h-4 w-4" /> Report Product
          </a>
        </div>
      </motion.div>
    );
  }

  const isDuplicate = status === 'duplicate';

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-8 border border-ivory-200 bg-white relative overflow-hidden shadow-sm"
    >
      <div className={`absolute top-0 right-0 w-48 h-48 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2 ${isDuplicate ? 'bg-amber-100' : 'bg-emerald-100'}`} />
      
      <div className={`p-8 ${isDuplicate ? 'bg-amber-50/50' : 'bg-emerald-50/50'}`}>
        <div className="flex flex-col items-center text-center relative z-10">
          <div className={`w-20 h-20 flex items-center justify-center mb-6 rounded-full shadow-sm ${isDuplicate ? 'bg-amber-100' : 'bg-emerald-100'}`}>
            {isDuplicate ? (
              <AlertTriangle className="text-amber-600" size={40} />
            ) : (
              <ShieldCheck className="text-emerald-600" size={40} />
            )}
          </div>

          {isDuplicate ? (
            <>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600 mb-2">Caution</p>
              <h2 className="text-xl md:text-2xl font-black text-foreground tracking-normal leading-[1.1] mb-3 uppercase">Multiple Verifications Detected</h2>
              <p className="text-muted max-w-md text-sm leading-relaxed">
                This code has been verified multiple times. If you did not perform previous scans, please contact support to confirm product authenticity.
              </p>
            </>
          ) : (
            <>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-600 mb-2">Verified</p>
              <h2 className="text-2xl md:text-3xl font-black text-foreground tracking-normal leading-[1.1] mb-3 uppercase">Product Is Genuine</h2>
              <p className="text-muted max-w-md text-sm leading-relaxed">
                Thank you for choosing Kyrox Muscle. Your product has been verified as authentic and safe to consume.
              </p>
            </>
          )}
        </div>
      </div>

      <div className="p-8 bg-ivory-50 border-t border-ivory-200">
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-muted mb-1 uppercase tracking-wider text-xs font-bold">Product Name</p>
            <p className="text-foreground font-bold">{productName || 'Kyrox Supplement'}</p>
          </div>
          <div>
            <p className="text-muted mb-1 uppercase tracking-wider text-xs font-bold">Authentication Code</p>
            <p className="text-foreground font-mono">{record?.code}</p>
          </div>
          {record?.batch_number && (
            <div>
              <p className="text-muted mb-1 uppercase tracking-wider text-xs font-bold">Batch Number</p>
              <p className="text-foreground font-mono">{record.batch_number}</p>
            </div>
          )}
          <div>
            <p className="text-muted mb-1 uppercase tracking-wider text-xs font-bold">Verification Date</p>
            <p className="text-foreground font-mono">{new Date().toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-muted mb-1 uppercase tracking-wider text-xs font-bold">Total Scans</p>
            <p className="text-foreground font-mono">{record?.scan_count || 1}</p>
          </div>
        </div>
      </div>

      {isDuplicate && (
        <div className="p-4 bg-white border-t border-ivory-200">
          <Link
            href="/contact"
            className="w-full inline-flex min-h-12 items-center justify-center gap-2 border border-neutral-200 bg-white text-sm font-bold uppercase tracking-wider text-neutral-800 hover:border-gold-400 hover:bg-neutral-50 hover:text-gold-600 transition-colors shadow-sm"
          >
            <Headset className="h-4 w-4" /> Contact Support
          </Link>
        </div>
      )}
    </motion.div>
  );
}
