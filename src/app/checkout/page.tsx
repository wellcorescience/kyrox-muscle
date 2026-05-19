'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Package, ChevronRight, AlertCircle, Loader2 } from 'lucide-react';
import { products } from '@/constants/products';
import { createOrder } from '@/app/actions/order';

function CheckoutForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productSlug = searchParams.get('product');
  
  const product = products.find(p => p.slug === productSlug) || products[0];

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    alternatePhone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    flavor: product.availableFlavors ? product.availableFlavors[0] : '',
    quantity: 1
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const productPrice = product.mrp || 4000;
  const shipping = 0;
  const total = (productPrice * formData.quantity) + shipping;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = '10 digit phone required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = '6 digit pincode required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs[name];
        return newErrs;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    const result = await createOrder({
      customer_name: formData.fullName,
      phone: formData.phone,
      alternate_phone: formData.alternatePhone || undefined,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      product_name: product.name,
      flavor: formData.flavor,
      quantity: Number(formData.quantity),
      amount: total,
    });

    if (result.success && result.order) {
      router.push(`/checkout/success?order_id=${result.order.order_id}&name=${encodeURIComponent(formData.fullName)}&total=${total}`);
    } else {
      setErrors({ submit: result.error || 'Failed to place order' });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 md:py-24">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black uppercase text-white tracking-tight">SECURE CHECKOUT</h1>
          <p className="text-zinc-400 mt-2">Cash on Delivery Available</p>
        </div>
        <div className="hidden sm:flex gap-4">
          <div className="flex items-center gap-2 text-zinc-400"><ShieldCheck className="h-5 w-5 text-electric-300" /> 100% Secure</div>
          <div className="flex items-center gap-2 text-zinc-400"><Truck className="h-5 w-5 text-electric-300" /> Free Shipping</div>
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
            {/* Customer Info */}
            <div className="bg-white/[0.03] border border-white/10 p-6 md:p-8">
              <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-6 border-b border-white/10 pb-4">1. Customer Details</h2>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Full Name *</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={`w-full bg-black border ${errors.fullName ? 'border-red-500' : 'border-white/20 focus:border-electric-300'} text-white px-4 py-3 outline-none transition-colors`} placeholder="John Doe" />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={`w-full bg-black border ${errors.phone ? 'border-red-500' : 'border-white/20 focus:border-electric-300'} text-white px-4 py-3 outline-none transition-colors`} placeholder="10 digit number" />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Alternate Phone (Optional)</label>
                  <input type="tel" name="alternatePhone" value={formData.alternatePhone} onChange={handleChange} className="w-full bg-black border border-white/20 focus:border-electric-300 text-white px-4 py-3 outline-none transition-colors" placeholder="Optional" />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white/[0.03] border border-white/10 p-6 md:p-8">
              <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-6 border-b border-white/10 pb-4">2. Delivery Address</h2>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">House/Flat/Street *</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} className={`w-full bg-black border ${errors.address ? 'border-red-500' : 'border-white/20 focus:border-electric-300'} text-white px-4 py-3 outline-none transition-colors`} placeholder="House No, Building, Street" />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">City *</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} className={`w-full bg-black border ${errors.city ? 'border-red-500' : 'border-white/20 focus:border-electric-300'} text-white px-4 py-3 outline-none transition-colors`} placeholder="City" />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">State *</label>
                  <input type="text" name="state" value={formData.state} onChange={handleChange} className={`w-full bg-black border ${errors.state ? 'border-red-500' : 'border-white/20 focus:border-electric-300'} text-white px-4 py-3 outline-none transition-colors`} placeholder="State" />
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Pincode *</label>
                  <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} className={`w-full bg-black border ${errors.pincode ? 'border-red-500' : 'border-white/20 focus:border-electric-300'} text-white px-4 py-3 outline-none transition-colors`} placeholder="6 digit pincode" />
                  {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                </div>
              </div>
            </div>
            
            {errors.submit && (
              <div className="p-4 border border-red-500/50 bg-red-500/10 text-red-500 flex items-center gap-3">
                <AlertCircle className="shrink-0" />
                <p>{errors.submit}</p>
              </div>
            )}
          </form>
        </motion.div>

        {/* Order Summary */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="bg-white/[0.03] border border-white/10 p-6 md:p-8 sticky top-24">
            <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-6 border-b border-white/10 pb-4">Order Summary</h2>
            
            <div className="flex gap-4 mb-6 pb-6 border-b border-white/10">
              <div className="w-20 h-24 bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0">
                <Package className="text-zinc-600" size={32} />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold">{product.name}</h3>
                <p className="text-zinc-400 text-sm mt-1">₹{productPrice}</p>
                
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] uppercase text-zinc-500 block mb-1">Flavor</label>
                    <select name="flavor" value={formData.flavor} onChange={handleChange} className="w-full bg-black border border-white/20 text-white text-xs px-2 py-1.5 outline-none">
                      {product.availableFlavors?.map(f => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-zinc-500 block mb-1">Qty</label>
                    <select name="quantity" value={formData.quantity} onChange={handleChange} className="w-full bg-black border border-white/20 text-white text-xs px-2 py-1.5 outline-none">
                      {[1, 2, 3, 4, 5].map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-sm mb-6 pb-6 border-b border-white/10">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span className="text-white">₹{productPrice * formData.quantity}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Shipping</span>
                <span className="text-electric-300 uppercase text-xs font-bold tracking-wider">Free</span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-8">
              <span className="text-zinc-400 font-bold uppercase tracking-wider">Total</span>
              <span className="text-3xl font-black text-white">₹{total}</span>
            </div>

            <button 
              type="submit" 
              form="checkout-form"
              disabled={isSubmitting}
              className="w-full inline-flex min-h-14 items-center justify-center gap-2 border border-metal-200 bg-metal-200 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-black shadow-glow hover:bg-white disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : (
                <>PLACE COD ORDER <ChevronRight className="h-5 w-5" /></>
              )}
            </button>
            <p className="text-center text-xs text-zinc-500 mt-4 uppercase font-medium">Pay nothing now. Pay on delivery.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white"><Loader2 className="animate-spin" /></div>}>
      <CheckoutForm />
    </Suspense>
  );
}
