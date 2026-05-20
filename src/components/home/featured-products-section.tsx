"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Truck, ShoppingCart, Loader2 } from "lucide-react";
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
  gold: "border-[#A89340]/40 bg-[#A89340]/5 text-[#A89340] hover:bg-[#A89340] hover:text-white rounded-xl",
  silver: "border-neutral-200 bg-neutral-50 text-neutral-800 hover:bg-neutral-800 hover:text-white rounded-xl",
  blue: "border-blue-200 bg-blue-50/50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl",
};

export function FeaturedProductsSection() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await getDbProducts();
      if (res.success && res.products) {
        const featured = res.products.filter(p => p.isFeatured);
        if (featured.length > 0) {
          setFeaturedProducts(featured);
        } else {
          setFeaturedProducts(res.products.slice(0, 3));
        }
      }
      setLoading(false);
    }
    load();
  }, []);

  return (
    <section id="featured" className="relative overflow-hidden py-20 md:py-32 border-b border-[#E8E5DE] bg-white">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/bg/featured_bg.png"
          alt=""
          fill
          className="object-cover object-center opacity-[0.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
      </div>

      <div className="container">
        <SectionReveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between animate-on-scroll">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A89340]">
              Featured Products
            </p>
            <h2 className="mt-4 text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-neutral-900 font-black tracking-normal uppercase">
              Premium Supplements
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-neutral-500">
            High-output formulas shaped for training blocks, muscle gain, and
            recovery-focused performance.
          </p>
        </SectionReveal>

        {loading ? (
          <div className="mt-12 h-64 flex items-center justify-center border border-neutral-200 bg-white/50 backdrop-blur-sm rounded-2xl">
            <Loader2 className="animate-spin text-[#A89340] h-8 w-8" />
          </div>
        ) : (
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featuredProducts.map((product, index) => {
              const tone = toneBySlug[product.slug] || "gold";
              const btnStyle = buttonToneStyles[tone];
              const delays = [0, 0.1, 0.2];
              const delay = delays[index] || 0;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay, ease: [0.215, 0.61, 0.355, 1] }}
                  className="h-full"
                >
                  <article className="group relative overflow-hidden product-card card-hover-lift bg-white border border-[#E8E5DE] rounded-2xl h-full flex flex-col justify-between">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#A89340]/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    
                    {/* Verify Badge */}
                    <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 border border-emerald-500/20 bg-emerald-50/50 backdrop-blur-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 rounded-full shadow-sm">
                      <ShieldCheck className="h-3.5 w-3.5" /> Verified
                    </div>

                    <div>
                      <div className="grid min-h-[18rem] place-items-center bg-gradient-to-b from-neutral-50 to-neutral-100/50 p-5">
                        <ProductVisual
                          name={product.name}
                          tone={tone}
                          size="sm"
                          imageUrl={product.image}
                        />
                      </div>
                      
                      <div className="p-5 pt-4 bg-white">
                        <h3 className="text-2xl leading-tight text-neutral-900 font-bold">
                          {product.name}
                        </h3>
                        <div className="mt-3 flex items-center gap-3">
                          <span className="text-2xl font-black text-neutral-900">₹{product.mrp}</span>
                          <span className="text-xs font-bold uppercase text-neutral-500">MRP</span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {product.availableFlavors?.map(f => (
                            <span key={f} className="text-[10px] font-bold uppercase tracking-[0.2em] border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-neutral-600 rounded-md">{f}</span>
                          ))}
                        </div>

                        <ul className="mt-4 grid gap-2">
                          {product.highlights.map((highlight) => (
                            <li
                              key={highlight}
                              className="flex items-center justify-between border-b border-neutral-100 py-2 text-sm text-neutral-700"
                            >
                              <span>{highlight}</span>
                              <span className="h-1.5 w-1.5 bg-[#A89340] rounded-full" />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Buttons at the bottom */}
                    <div className="p-5 pt-0 bg-white">
                      <div className="grid gap-2.5">
                        {/* VIEW PRODUCT = Full width primary */}
                        <Link
                          href={`/product/${product.slug}`}
                          className={`inline-flex min-h-12 w-full items-center justify-center gap-2 border text-sm font-bold uppercase tracking-[0.16em] transition-all duration-300 ${btnStyle}`}
                        >
                          View Product <ArrowRight className="h-4 w-4" />
                        </Link>
                        
                        {/* ORDER NOW (COD) */}
                        <Link
                          href={`/checkout?product=${product.slug}`}
                          className="inline-flex min-h-12 w-full items-center justify-center gap-2 border border-neutral-200 bg-neutral-50 text-xs font-bold uppercase tracking-[0.18em] text-neutral-800 hover:border-[#A89340] hover:bg-white hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300 rounded-xl"
                        >
                          <ShoppingCart className="h-4 w-4" /> Order Now (COD)
                        </Link>

                        {/* Small Trust Strip */}
                        <div className="mt-2 flex items-center justify-center gap-4 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500 border-t border-neutral-100 pt-3">
                          <span className="flex items-center gap-1">
                            <ShieldCheck className="h-3 w-3 text-emerald-600" /> Authentic Product
                          </span>
                          <span className="h-1 w-1 rounded-full bg-neutral-300" />
                          <span className="flex items-center gap-1">
                            <Truck className="h-3 w-3 text-[#A89340]" /> COD Available
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
