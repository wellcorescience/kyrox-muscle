"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, ShieldCheck, ShoppingCart, Sparkles } from "lucide-react";
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
    glow: "bg-metal-200/20",
    line: "from-transparent via-metal-200/80 to-transparent",
    label: "from-metal-200 via-metal-300 to-metal-500",
    ring: "border-metal-200/45",
    text: "text-metal-200",
  },
  "whey-protein": {
    glow: "bg-electric-400/20",
    line: "from-transparent via-electric-300/80 to-transparent",
    label: "from-electric-300 via-electric-400 to-electric-600",
    ring: "border-electric-300/45",
    text: "text-electric-300",
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
      whileHover={{ y: -8, scale: 1.015 }}
      className="group relative overflow-hidden border border-white/10 bg-white/[0.035] shadow-2xl"
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

      <div className="relative grid min-h-[19rem] place-items-center overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.08),transparent_16rem),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(0,0,0,0.25))] p-4">
        {/* Category Badge */}
        <span
          className={cn(
            "absolute left-4 top-4 z-10 border bg-black/50 px-3 py-1.5 text-xs font-bold uppercase backdrop-blur-sm",
            tone.ring,
            tone.text,
          )}
        >
          {product.categoryLabel}
        </span>
        {/* Verified Badge */}
        <span className="absolute right-4 top-4 z-10 flex items-center gap-1.5 border border-emerald-500/30 bg-black/50 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 backdrop-blur-sm">
          <ShieldCheck className="h-3 w-3" /> Verified
        </span>
        <ProductImagePlaceholder product={product} />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-2xl font-bold leading-tight text-white">
            {product.name}
          </h2>
          <Sparkles
            className={cn("mt-1 h-5 w-5 shrink-0", tone.text)}
            aria-hidden
          />
        </div>

        {/* MRP */}
        <div className="mt-3 flex items-center gap-3">
          <span className="text-2xl font-black text-white">₹{product.mrp}</span>
          <span className="text-xs font-bold uppercase text-zinc-500">MRP</span>
        </div>

        {/* Flavors */}
        <div className="mt-3 flex items-center gap-2">
          {product.availableFlavors?.map(f => (
            <span key={f} className="text-[10px] font-bold uppercase tracking-wider border border-white/10 bg-white/5 px-2.5 py-1 text-zinc-400">{f}</span>
          ))}
        </div>

        {/* Highlights */}
        <ul className="mt-4 grid gap-2">
          {product.highlights.slice(0, 3).map((highlight) => (
            <li
              key={highlight}
              className="flex items-center justify-between border-b border-white/10 py-2 text-sm text-zinc-300"
            >
              <span>{highlight}</span>
              <span
                className={cn("h-1.5 w-1.5", tone.glow.replace("/20", ""))}
              />
            </li>
          ))}
        </ul>

        {/* ACTION BUTTONS */}
        <div className="mt-5 grid gap-2.5">
          {/* WhatsApp Order */}
          <a
            href={`https://wa.me/917015553297?text=${encodeURIComponent(`Hi, I want to order ${product.name}.\nFlavor: \nQuantity: \n\nPlease help me with COD order.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 border border-[#25D366] bg-[#25D366]/10 text-sm font-bold uppercase tracking-wider text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
          >
            <MessageCircle className="h-4 w-4" /> Order on WhatsApp
          </a>
          
          {/* COD + View */}
          <div className="grid grid-cols-2 gap-2.5">
            <Link
              href={`/checkout?product=${product.slug}`}
              className="inline-flex min-h-11 items-center justify-center gap-2 border border-electric-400 bg-electric-500 text-xs font-bold uppercase tracking-wider text-black hover:bg-white transition-colors"
            >
              <ShoppingCart className="h-3.5 w-3.5" /> COD Order
            </Link>
            <Link
              href={`/product/${product.slug}`}
              className="inline-flex min-h-11 items-center justify-center gap-2 border border-white/15 bg-white/[0.04] text-xs font-bold uppercase tracking-wider text-white hover:border-electric-300/60 transition-colors"
            >
              View <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
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
          "absolute inset-x-[18%] top-0 h-7 rounded-t-[44%] border bg-gradient-to-b from-zinc-700 to-black",
          tone.ring,
        )}
      />
      <div
        className={cn(
          "absolute inset-x-[13%] top-5 h-[88%] overflow-hidden border bg-[linear-gradient(112deg,#24262d_0%,#08080a_46%,#17181e_100%)] shadow-2xl",
          tone.ring,
        )}
      >
        <div className="absolute inset-y-0 left-0 w-1/2 bg-white/[0.055]" />
        <div className="absolute inset-y-0 right-5 w-px bg-white/10" />
        <div className="absolute left-1/2 top-7 h-14 w-14 -translate-x-1/2 border border-white/15 bg-white/[0.03]" />
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
        <p className="absolute inset-x-5 bottom-16 text-center text-[0.58rem] font-black uppercase tracking-[0.25em] text-zinc-400">
          {product.categoryLabel}
        </p>
        <div className="absolute inset-x-8 bottom-10 h-1 bg-white/20" />
        <div className="absolute inset-x-12 bottom-7 h-1 bg-white/10" />
      </div>
    </div>
  );
}
