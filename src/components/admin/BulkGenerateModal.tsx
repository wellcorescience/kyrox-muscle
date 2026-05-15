'use client';

import { useState } from 'react';
import { X, Loader2, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthCodeRecord } from '@/types/auth';

interface BulkGenerateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerated: (codes: AuthCodeRecord[]) => void;
}

const products = [
  { id: 'prod_1', name: 'Mass Gainer', prefix: 'MG' },
  { id: 'prod_4', name: 'Anabolic Mass Gainer', prefix: 'AMG' },
  { id: 'prod_5', name: 'Nitra Whey Protein', prefix: 'NWP' },
];

export function BulkGenerateModal({ isOpen, onClose, onGenerated }: BulkGenerateModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    productId: products[0].id,
    quantity: 10,
    batchNumber: '',
  });

  const generateRandomCode = (prefix: string) => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Avoid ambiguous chars
    let result = `KYX-${prefix}-`;
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API/DB delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const selectedProduct = products.find(p => p.id === formData.productId)!;
    const newCodes: AuthCodeRecord[] = [];

    for (let i = 0; i < formData.quantity; i++) {
      newCodes.push({
        id: Math.random().toString(36).substr(2, 9),
        product_id: formData.productId,
        code: generateRandomCode(selectedProduct.prefix),
        batch_number: formData.batchNumber || null,
        scan_count: 0,
        first_scanned_at: null,
        created_at: new Date().toISOString(),
        is_active: true,
      });
    }

    onGenerated(newCodes);
    setLoading(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
          >
            {/* Metallic glow effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2" />
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Bulk Generation</h2>
                <p className="text-zinc-500 text-sm">Generate up to 1000 unique product codes.</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-white/5 text-zinc-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">Product</label>
                  <select
                    value={formData.productId}
                    onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-all appearance-none"
                  >
                    {products.map(p => (
                      <option key={p.id} value={p.id} className="bg-zinc-900">{p.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">Quantity</label>
                    <input
                      type="number"
                      min="1"
                      max="1000"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                      className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">Batch Number</label>
                    <input
                      type="text"
                      placeholder="OPTIONAL"
                      value={formData.batchNumber}
                      onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value.toUpperCase() })}
                      className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-4 shadow-lg shadow-white/5"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <Zap size={20} fill="currentColor" />
                    <span>GENERATE {formData.quantity} CODES</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
