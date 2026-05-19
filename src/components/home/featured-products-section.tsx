"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, MessageCircle, ShoppingCart, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getDbProducts } from "@/app/actions/product";
import { Product } from "@/types/product";
import { ProductVisual } from "@/components/home/product-visual";
import { SectionReveal } from "@/components/home/section-reveal";

const toneBySlug: Record<string, "gold" | "silver" | "blue"> = {
  "kyrox-muscle-mass-gainer": "gold",
  "anabolic-mass-gainer": "silver",
  "nitra-whey-protein": "blue",
};

const buttonToneStyles = {
  gold: "border-metal-200 bg-metal-200 text-black hover:bg-white hover:border-white",
  silver: "border-silver-200 bg-silver-200 text-black hover:bg-white hover:border-white",
  blue: "border-electric-400 bg-electric-500 text-black hover:bg-white hover:border-white",
};

export function FeaturedProductsSection() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await getDbProducts();
      if (res.success && res.products) {
        setFeaturedProducts(res.products.filter(p => p.isFeatured));
      }
      setLoading(false);
    }
    load();
  }, []);

  return (
    <section id="featured" className="relative overflow-hidden py-16 md:py-24 border-b border-white/10">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/bg/featured_bg.png"
          alt=""
          fill
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      <div className="container">
        <SectionReveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-electric-300">
              Featured Products
            </p>
            <h2 className="mt-3 text-balance text-5xl leading-none text-white md:text-6xl font-black">
              Premium Supplements
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-zinc-400">
            High-output formulas shaped for training blocks, muscle gain, and
            recovery-focused performance.
          </p>
        </SectionReveal>

        {loading ? (
          <div className="mt-12 h-64 flex items-center justify-center border border-white/5 bg-zinc-900/10 backdrop-blur-sm rounded-2xl">
            <Loader2 className="animate-spin text-electric-300 h-8 w-8" />
          </div>
        ) : (
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featuredProducts.map((product, index) => {
              const tone = toneBySlug[product.slug] || "gold";
              const waText = `Hi, I want to order ${product.name}.\nFlavor: \nQuantity: \n\nPlease help me with COD order.`;
              const waLink = `https://wa.me/917015553297?text=${encodeURIComponent(waText)}`;
              const btnStyle = buttonToneStyles[tone];

              return (
                <SectionReveal key={product.id} delay={index * 0.08}>
                  <motion.article
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="group relative overflow-hidden border border-white/10 bg-white/[0.035] backdrop-blur-sm shadow-2xl h-full flex flex-col justify-between"
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric-300/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    
                    {/* Verify Badge */}
                    <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 border border-emerald-500/30 bg-black/60 backdrop-blur-sm px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      <ShieldCheck className="h-3 w-3" /> Verified
                    </div>

                    <div>
                      <div className="grid min-h-[18rem] place-items-center bg-gradient-to-b from-white/[0.05] to-black/20 p-5">
                        <ProductVisual
                          name={product.name}
                          tone={tone}
                          size="sm"
                          imageUrl={product.image}
                        />
                      </div>
                      
                      <div className="p-5 pt-4">
                        <h3 className="text-2xl leading-tight text-white font-bold">
                          {product.name}
                        </h3>
                        <div className="mt-3 flex items-center gap-3">
                          <span className="text-2xl font-black text-white">₹{product.mrp}</span>
                          <span className="text-xs font-bold uppercase text-zinc-500">MRP</span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {product.availableFlavors?.map(f => (
                            <span key={f} className="text-[10px] font-bold uppercase tracking-wider border border-white/10 bg-white/5 px-2.5 py-1 text-zinc-400">{f}</span>
                          ))}
                        </div>

                        <ul className="mt-4 grid gap-2">
                          {product.highlights.map((highlight) => (
                            <li
                              key={highlight}
                              className="flex items-center justify-between border-b border-white/10 py-2 text-sm text-zinc-300"
                            >
                              <span>{highlight}</span>
                              <span className="h-1.5 w-1.5 bg-electric-300" />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Buttons at the bottom */}
                    <div className="p-5 pt-0">
                      <div className="grid gap-2.5">
                        {/* VIEW PRODUCT = Full width primary */}
                        <Link
                          href={`/product/${product.slug}`}
                          className={`inline-flex min-h-12 w-full items-center justify-center gap-2 border text-sm font-bold uppercase tracking-[0.16em] transition-all duration-300 ${btnStyle}`}
                        >
                          View Product <ArrowRight className="h-4 w-4" />
                        </Link>
                        
                        {/* ORDER NOW (COD) & WHATSAPP = Side-by-side */}
                        <div className="grid grid-cols-2 gap-2.5">
                          <Link
                            href={`/checkout?product=${product.slug}`}
                            className="inline-flex min-h-11 items-center justify-center gap-2 border border-white/15 bg-white/[0.04] text-xs font-bold uppercase tracking-wider text-white hover:border-electric-300/60 transition-colors"
                          >
                            <ShoppingCart className="h-3.5 w-3.5" /> Order COD
                          </Link>
                          
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 items-center justify-center gap-2 border border-[#25D366] bg-[#25D366]/10 text-xs font-bold uppercase tracking-wider text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
                          >
                            <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                          </a>
                        </div>

                        {/* Small Trust Strip */}
                        <div className="mt-2 flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500 border-t border-white/5 pt-3">
                          <span className="flex items-center gap-1">
                            <ShieldCheck className="h-3 w-3 text-emerald-400" /> Authentic Product
                          </span>
                          <span className="h-1 w-1 rounded-full bg-zinc-700" />
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3 text-electric-400" /> COD Available
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </SectionReveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
