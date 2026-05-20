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
        className="bg-white border border-ivory-200 rounded-3xl p-8 md:p-12 shadow-premium backdrop-blur-xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-ivory-50/50 to-transparent pointer-events-none" />
        
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleVerify(code);
          }}
          className="space-y-6 relative z-10"
        >
          <div className="space-y-2">
            <label className="text-xs font-bold tracking-[0.2em] text-muted uppercase ml-1">
              Authentication Code
            </label>
            <div className="relative group">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="ENTER AUTHENTICATION CODE"
                className="w-full bg-ivory-50 border border-[#e8e5de] rounded-xl h-[56px] px-6 text-xl md:text-2xl font-mono text-[#1a1a1a] tracking-[0.1em] placeholder:text-muted focus:outline-none focus:border-[#A89340] focus:bg-white transition-all text-center shadow-inner"
              />
              <div className="absolute inset-0 rounded-2xl bg-gold-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !code.trim()}
            className="w-full h-[56px] bg-[#A89340] hover:bg-gold-500 text-white font-bold text-sm uppercase tracking-[0.2em] rounded-xl transition-all duration-200 flex items-center justify-center gap-3 relative overflow-hidden group active:scale-[0.97] btn-primary"
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
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full"
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
      
      <p className="text-center text-muted text-sm mt-8 px-4 leading-relaxed">
        Your safety is our priority. Always verify your Kyrox Muscle products to ensure you are consuming genuine, lab-tested supplements.
      </p>
    </div>
  );
}
