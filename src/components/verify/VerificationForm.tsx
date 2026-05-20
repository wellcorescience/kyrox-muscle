'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { VerificationResult } from './VerificationResult';
import { mockProducts } from '@/lib/mock-data';
import { AuthCodeRecord } from '@/types/auth';
import { verifyAuthCodeAction } from '@/app/actions/auth-code';

interface VerificationFormProps {
  initialCode?: string;
}

export function VerificationForm({ initialCode = '' }: VerificationFormProps) {
  const [code, setCode] = useState(initialCode.toUpperCase());
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    status: 'valid' | 'invalid' | 'duplicate' | null;
    record?: AuthCodeRecord | null;
    productName?: string;
  }>({ status: null });

  useEffect(() => {
    if (initialCode) {
      handleVerify(initialCode.toUpperCase());
    }
  }, [initialCode]);

  const handleVerify = async (codeToVerify: string) => {
    const cleanCode = codeToVerify.trim().toUpperCase();
    if (!cleanCode) return;

    setLoading(true);
    setResult({ status: null });

    try {
      const res = await verifyAuthCodeAction(cleanCode);

      if (res.success && res.status) {
        if (res.status === 'invalid') {
          setResult({ status: 'invalid', record: res.record });
        } else {
          const record = res.record;
          const product = mockProducts.find((p) => p.id === record?.product_id);
          setResult({
            status: res.status as 'valid' | 'duplicate',
            record,
            productName: product?.name || 'Kyrox Supplement'
          });
        }
      } else {
        setResult({ status: 'invalid' });
      }
    } catch (err: any) {
      console.error('Error verifying code:', err);
      setResult({ status: 'invalid' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900/40 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleVerify(code);
          }}
          className="space-y-6 relative z-10"
        >
          <div className="space-y-2">
            <label className="text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase ml-1">
              Authentication Code
            </label>
            <div className="relative group">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="ENTER AUTHENTICATION CODE"
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 px-6 text-xl md:text-2xl font-mono text-white tracking-[0.1em] placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-center"
              />
              <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !code.trim()}
            className="w-full py-5 bg-white text-black font-bold text-lg rounded-2xl hover:bg-zinc-200 disabled:opacity-50 disabled:hover:bg-white transition-all flex items-center justify-center gap-3 relative overflow-hidden group shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                <ShieldCheck size={24} />
                <span>VERIFY PRODUCT</span>
              </>
            )}
            
            {/* Glossy overlay animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
              animate={loading ? { x: ['100%', '-100%'] } : {}}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            />
          </button>
        </form>

        <AnimatePresence mode="wait">
          {result.status && (
            <VerificationResult 
              key={result.status}
              status={result.status} 
              record={result.record} 
              productName={result.productName} 
            />
          )}
        </AnimatePresence>
      </motion.div>
      
      <p className="text-center text-zinc-500 text-sm mt-8 px-4 leading-relaxed">
        Your safety is our priority. Always verify your Kyrox Muscle products to ensure you are consuming genuine, lab-tested supplements.
      </p>
    </div>
  );
}
