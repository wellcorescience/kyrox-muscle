"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Trash2, ChevronRight, Package, ArrowLeft, ShieldCheck, Truck, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/constants/products";

interface CartItem {
  slug: string;
  name: string;
  flavor: string;
  quantity: number;
  price: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = () => {
      try {
        const stored = JSON.parse(localStorage.getItem("kyrox_cart") || "[]");
        setCart(stored);
      } catch (e) {
        setCart([]);
      }
      setLoading(false);
    };
    loadCart();
  }, []);

  const updateQuantity = (slug: string, flavor: string, newQty: number) => {
    const updated = cart.map((item) => {
      if (item.slug === slug && item.flavor === flavor) {
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCart(updated);
    localStorage.setItem("kyrox_cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("kyrox_cart_updated"));
  };

  const removeItem = (slug: string, flavor: string) => {
    const updated = cart.filter((item) => !(item.slug === slug && item.flavor === flavor));
    setCart(updated);
    localStorage.setItem("kyrox_cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("kyrox_cart_updated"));
  };

  const getProductImage = (slug: string) => {
    const found = products.find((p) => p.slug === slug);
    // Return relative placeholder image paths or a generic supplement model image
    return found ? `/images/bg/trust_bg.png` : `/images/bg/trust_bg.png`;
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0; // Free Shipping
  const total = subtotal + shipping;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-gold-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-20">
      <div className="container max-w-6xl mx-auto px-4">
        
        {/* Header Breadcrumbs */}
        <div className="mb-8">
          <Link href="/shop" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-gold-500 transition-colors">
            <ArrowLeft className="h-4.5 w-4.5" /> Back to Shop
          </Link>
          <div className="flex items-baseline justify-between mt-4">
            <h1 className="text-4xl md:text-5xl font-black uppercase text-[#1a1a1a] tracking-tight">Shopping Cart</h1>
            <p className="text-sm font-medium text-neutral-500 uppercase tracking-widest">{cart.length} {cart.length === 1 ? "Item" : "Items"}</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {cart.length === 0 ? (
            <motion.div
              key="empty-cart"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white border border-[#e8e5de] rounded-3xl p-12 md:p-20 text-center flex flex-col items-center justify-center max-w-2xl mx-auto shadow-sm"
            >
              <div className="w-20 h-20 bg-gold-50 text-gold-500 border border-gold-300/30 rounded-full grid place-items-center mb-6">
                <ShoppingCart className="h-10 w-10" />
              </div>
              <h2 className="text-2xl font-bold uppercase text-[#1a1a1a] tracking-tight mb-3">Your Cart is Empty</h2>
              <p className="text-sm text-neutral-500 leading-relaxed font-medium mb-8 max-w-md">
                Looks like you haven&apos;t added any premium supplements to your cart yet. Visit our store to find your performance fuel.
              </p>
              <Link href="/shop" className="inline-flex min-h-12 items-center justify-center gap-2 border border-gold-400 bg-gold-400 px-8 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-glow hover:bg-gold-500 hover:border-gold-500 transition-colors rounded-xl btn-primary">
                Shop Supplements <ChevronRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="cart-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-8 lg:grid-cols-[1fr_380px] items-start"
            >
              {/* Cart Items List */}
              <div className="space-y-4">
                {cart.map((item) => (
                  <motion.div
                    key={`${item.slug}-${item.flavor}`}
                    layout
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white border border-[#e8e5de] p-6 rounded-2xl flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between shadow-sm relative overflow-hidden"
                  >
                    <div className="flex gap-5 items-center">
                      <div className="w-20 h-24 bg-ivory-50 border border-ivory-200 flex items-center justify-center rounded-xl shrink-0 relative overflow-hidden">
                        <Image src="/images/bg/trust_bg.png" alt="" fill className="object-cover opacity-5 pointer-events-none" />
                        <Package className="text-gold-500 relative z-10" size={32} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#1a1a1a] leading-snug tracking-tight">{item.name}</h3>
                        <p className="text-xs font-bold text-gold-600 uppercase tracking-widest mt-1.5">{item.flavor}</p>
                        <p className="text-sm font-semibold text-neutral-800 mt-2 font-mono">₹{item.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t border-ivory-200 sm:border-0 pt-4 sm:pt-0">
                      <div className="flex items-center gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Qty</label>
                        <select
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.slug, item.flavor, Number(e.target.value))}
                          className="bg-ivory-50 border border-ivory-200 text-[#1a1a1a] text-xs font-bold px-3 py-2 outline-none rounded-xl focus:border-gold-300 focus:bg-white transition-colors"
                        >
                          {[1, 2, 3, 4, 5].map((n) => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                      </div>

                      <div className="text-right flex items-center gap-4">
                        <div className="hidden sm:block">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-0.5">Total</p>
                          <p className="text-base font-bold text-[#1a1a1a] font-mono">₹{item.price * item.quantity}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.slug, item.flavor)}
                          className="h-10 w-10 grid place-items-center border border-red-100 bg-red-50/50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors rounded-xl shadow-sm"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Summary Sidebar */}
              <div className="bg-white border border-[#e8e5de] p-8 rounded-3xl sticky top-28 shadow-sm">
                <h2 className="text-xl font-bold uppercase tracking-wider text-[#1a1a1a] mb-6 border-b border-ivory-200 pb-4">Order Summary</h2>
                
                <div className="space-y-4 text-sm mb-6 pb-6 border-b border-ivory-200">
                  <div className="flex justify-between text-neutral-500 font-medium">
                    <span>Subtotal</span>
                    <span className="text-[#1a1a1a] font-mono">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-neutral-500 font-medium">
                    <span>Shipping</span>
                    <span className="text-gold-600 uppercase text-xs font-bold tracking-wider">Free</span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-8">
                  <span className="text-neutral-500 font-bold uppercase tracking-wider">Total</span>
                  <span className="text-3xl font-black text-[#1a1a1a] font-mono">₹{total}</span>
                </div>

                {/* Checkout links */}
                <div className="space-y-3">
                  {cart.map((item, idx) => (
                    <Link
                      key={`checkout-${item.slug}-${item.flavor}`}
                      href={`/checkout?product=${item.slug}&flavor=${item.flavor}&quantity=${item.quantity}`}
                      className="w-full inline-flex min-h-12 items-center justify-center gap-2 border border-gold-400 bg-gold-400 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-glow hover:bg-gold-500 hover:border-gold-500 transition-all duration-300 rounded-xl"
                    >
                      Check Out Item {cart.length > 1 ? `#${idx + 1}` : ""} <ChevronRight className="h-4.5 w-4.5" />
                    </Link>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-4 border-t border-ivory-200 pt-6">
                  <div className="flex items-center gap-3 text-xs font-bold text-neutral-500 uppercase">
                    <ShieldCheck className="h-4.5 w-4.5 text-gold-500 shrink-0" /> Secure checkout process
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-neutral-500 uppercase">
                    <Truck className="h-4.5 w-4.5 text-gold-500 shrink-0" /> Free cash on delivery delivery
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
