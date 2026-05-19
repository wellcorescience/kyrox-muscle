'use client';

import { motion, Variants } from 'framer-motion';
import { ShieldCheck, AlertTriangle, XCircle, MessageCircle, Flag } from 'lucide-react';
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
        
        <div className="p-8 bg-red-500/[0.06]">
          <div className="flex flex-col items-center text-center relative z-10">
            <div className="w-20 h-20 bg-red-500/20 flex items-center justify-center mb-6">
              <XCircle className="text-red-500" size={40} />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-500 mb-2">Warning</p>
            <h2 className="text-3xl font-black text-white tracking-tight mb-3 uppercase">Code Invalid or Suspicious</h2>
            <p className="text-zinc-400 max-w-md text-sm leading-relaxed">
              This authentication code could not be found in our database. This product may be counterfeit. Please do not consume and contact Kyrox Muscle support immediately.
            </p>
          </div>
        </div>

        <div className="p-6 bg-black/40 grid grid-cols-2 gap-4">
          <a
            href="https://wa.me/917015553297?text=Hi,%20my%20Kyrox%20product%20verification%20failed.%20Please%20help."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#25D366] bg-[#25D366]/10 text-sm font-bold uppercase tracking-wider text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
          >
            <MessageCircle className="h-4 w-4" /> Contact Support
          </a>
          <a
            href="https://wa.me/917015553297?text=Hi,%20I%20want%20to%20report%20a%20fake%20Kyrox%20product."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 border border-red-500/30 bg-red-500/10 text-sm font-bold uppercase tracking-wider text-red-400 hover:bg-red-500/20 transition-colors"
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
      className="mt-8 border border-white/10 relative overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-48 h-48 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2 ${isDuplicate ? 'bg-amber-500/10' : 'bg-emerald-500/10'}`} />
      
      <div className={`p-8 ${isDuplicate ? 'bg-amber-500/[0.04]' : 'bg-emerald-500/[0.04]'}`}>
        <div className="flex flex-col items-center text-center relative z-10">
          <div className={`w-20 h-20 flex items-center justify-center mb-6 ${isDuplicate ? 'bg-amber-500/20' : 'bg-emerald-500/20'}`}>
            {isDuplicate ? (
              <AlertTriangle className="text-amber-500" size={40} />
            ) : (
              <ShieldCheck className="text-emerald-500" size={40} />
            )}
          </div>

          {isDuplicate ? (
            <>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-500 mb-2">Caution</p>
              <h2 className="text-2xl font-black text-white tracking-tight mb-3 uppercase">Multiple Verifications Detected</h2>
              <p className="text-zinc-400 max-w-md text-sm leading-relaxed">
                This code has been verified multiple times. If you did not perform previous scans, please contact support to confirm product authenticity.
              </p>
            </>
          ) : (
            <>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-500 mb-2">Verified</p>
              <h2 className="text-3xl font-black text-white tracking-tight mb-3 uppercase">Product Is Genuine</h2>
              <p className="text-zinc-400 max-w-md text-sm leading-relaxed">
                Thank you for choosing Kyrox Muscle. Your product has been verified as authentic and safe to consume.
              </p>
            </>
          )}
        </div>
      </div>

      <div className="p-8 bg-black/30">
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-zinc-500 mb-1 uppercase tracking-wider text-xs font-bold">Product Name</p>
            <p className="text-white font-bold">{productName || 'Kyrox Supplement'}</p>
          </div>
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
            <p className="text-zinc-500 mb-1 uppercase tracking-wider text-xs font-bold">Verification Date</p>
            <p className="text-white font-mono">{new Date().toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-zinc-500 mb-1 uppercase tracking-wider text-xs font-bold">Total Scans</p>
            <p className="text-white font-mono">{record?.scan_count || 1}</p>
          </div>
        </div>
      </div>

      {isDuplicate && (
        <div className="p-4 bg-black/40 border-t border-white/5">
          <a
            href="https://wa.me/917015553297?text=Hi,%20my%20Kyrox%20product%20code%20has%20been%20scanned%20multiple%20times.%20Please%20help."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex min-h-12 items-center justify-center gap-2 border border-[#25D366] bg-[#25D366]/10 text-sm font-bold uppercase tracking-wider text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
          >
            <MessageCircle className="h-4 w-4" /> Contact Support
          </a>
        </div>
      )}
    </motion.div>
  );
}
