"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, ShoppingCart, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  index?: number;
};

const toneByCategory = {
  "mass-gainer": {
    glow: "bg-gold-200/20",
    line: "from-transparent via-gold-300/80 to-transparent",
    label: "from-gold-300 via-gold-400 to-gold-500",
    ring: "border-gold-300/45",
    text: "text-gold-500",
  },
  "whey-protein": {
    glow: "bg-gold-400/20",
    line: "from-transparent via-gold-400/80 to-transparent",
    label: "from-gold-400 via-gold-500 to-gold-600",
    ring: "border-gold-400/45",
    text: "text-gold-600",
  },
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const tone = toneByCategory[product.category as keyof typeof toneByCategory] || toneByCategory["mass-gainer"];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 18, scale: 0.98 }}
      transition={{
        duration: 0.42,
        delay: Math.min(index * 0.05, 0.18),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden bg-white border border-[#e8e5de] rounded-xl h-full flex flex-col justify-between transition-all duration-300 card-hover-lift product-card"
    >
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-40 transition-opacity duration-300 group-hover:opacity-100",
          tone.line,
        )}
      />
      <div
        className={cn(
          "absolute left-1/2 top-16 h-40 w-40 -translate-x-1/2 rounded-full blur-3xl transition-opacity duration-300 group-hover:opacity-100",
          tone.glow,
        )}
      />

      <div className="relative grid min-h-[19rem] place-items-center overflow-hidden border-b border-[#e8e5de] bg-[#fafaf8] p-4">
        {/* Verified Badge - top right */}
        <div className="absolute top-3 right-3 z-10">
          <span className="flex items-center gap-1.5 bg-[#1a1a1a] px-2.5 py-1 text-[11px] font-semibold text-white rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Verified
          </span>
        </div>
        <div className="product-image overflow-hidden w-full h-full flex items-center justify-center">
          <ProductImagePlaceholder product={product} />
        </div>
      </div>

      <div className="p-5">
        {/* Category Label Above Title */}
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#999] mb-2">
          {product.categoryLabel}
        </p>

        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-bold leading-tight text-[#1a1a1a]">
            {product.name}
          </h2>
          <Sparkles
            className={cn("mt-1 h-4 w-4 shrink-0", tone.text)}
            aria-hidden
          />
        </div>

        {/* Pricing */}
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-[13px] text-[#999] line-through">₹{Math.round(product.mrp * 1.25)}</span>
            <span className="text-[22px] font-bold text-[#1a1a1a]">₹{product.mrp}</span>
          </div>
          <span className="inline-block mt-1 bg-gold-50 text-gold-500 text-[11px] font-semibold px-2 py-0.5 rounded">SAVE ₹{Math.round(product.mrp * 1.25) - product.mrp}</span>
        </div>

        {/* Flavors */}
        <div className="mt-4 flex items-center gap-2">
          {product.availableFlavors?.map(f => (
            <span key={f} className="text-[10px] font-semibold uppercase tracking-[0.1em] border border-[#e8e5de] bg-[#fafaf8] px-2.5 py-1 text-[#666] rounded">{f}</span>
          ))}
        </div>

        {/* Highlights */}
        <ul className="mt-5 grid gap-2">
          {product.highlights.slice(0, 3).map((highlight) => (
            <li
              key={highlight}
              className="flex items-center justify-between border-b border-[#e8e5de] py-2 text-sm text-[#555]"
            >
              <span>{highlight}</span>
              <span
                className={cn("h-1 w-1", tone.glow.replace("/20", ""))}
              />
            </li>
          ))}
        </ul>

        {/* ACTION BUTTONS */}
        <div className="mt-6 grid gap-2.5">
          <Link
            href={`/checkout?product=${product.slug}`}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-gold-400 text-xs font-bold uppercase tracking-[0.16em] text-white hover:brightness-110 active:scale-[0.97] transition-all duration-200 rounded-md btn-primary btn-arrow"
          >
            Buy Now <ArrowRight className="h-4 w-4 arrow-icon" />
          </Link>
          <Link
            href={`/product/${product.slug}`}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 border border-neutral-200 bg-transparent text-xs font-bold uppercase tracking-[0.16em] text-neutral-800 hover:bg-[#1a1a1a] hover:text-white transition-all duration-200 rounded-md"
          >
            Product Details <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function ProductImagePlaceholder({ product }: { product: Product }) {
  const tone = toneByCategory[product.category as keyof typeof toneByCategory] || toneByCategory["mass-gainer"];
  const isReal = product.image && (product.image.startsWith("http") || product.image.startsWith("/") || product.image.includes("."));

  if (isReal) {
    return (
      <div className="relative mx-auto aspect-[3/4] w-full max-w-[13.5rem] flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-w-xs) 100vw, 220px"
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div
      className="relative mx-auto aspect-[3/4] w-full max-w-[13.5rem]"
      aria-label={`${product.name} image placeholder`}
      role="img"
    >
      <div
        className={cn("absolute inset-x-8 bottom-2 h-12 blur-2xl", tone.glow)}
      />
      <div
        className={cn(
          "absolute inset-x-[18%] top-0 h-7 rounded-t-[44%] border bg-gradient-to-b from-white to-ivory-100",
          tone.ring,
        )}
      />
      <div
        className={cn(
          "absolute inset-x-[13%] top-5 h-[88%] overflow-hidden border bg-[linear-gradient(112deg,#ffffff_0%,#f5f4ef_46%,#eae8e0_100%)] shadow-md",
          tone.ring,
        )}
      >
        <div className="absolute inset-y-0 left-0 w-1/2 bg-white/40" />
        <div className="absolute inset-y-0 right-5 w-px bg-ivory-200" />
        <div className="absolute left-1/2 top-7 h-14 w-14 -translate-x-1/2 border border-ivory-200 bg-white" />
        <div
          className={cn(
            "absolute inset-x-0 top-[34%] bg-gradient-to-r py-4",
            tone.label,
          )}
        >
          <p className="text-center font-heading text-4xl leading-none text-black">
            KYROX
          </p>
          <p className="text-center text-[0.62rem] font-black uppercase text-black">
            Muscle
          </p>
        </div>
        <p className="absolute inset-x-5 bottom-16 text-center text-[0.58rem] font-black uppercase tracking-[0.25em] text-muted">
          {product.categoryLabel}
        </p>
        <div className="absolute inset-x-8 bottom-10 h-1 bg-ivory-200" />
        <div className="absolute inset-x-12 bottom-7 h-1 bg-ivory-200" />
      </div>
    </div>
  );
}
