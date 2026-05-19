"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Zap, ShieldCheck, Truck, Sparkles, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden border-b border-white/10 flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 -z-30">
        <Image 
          src="/images/bg/hero_bg.png"
          alt="Kyrox Muscle Premium Supplements"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Dark Overlays for Readability */}
        <div className="absolute inset-0 bg-black/60 md:bg-black/40 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="container relative z-10 py-14 lg:py-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 border border-electric-300/35 bg-electric-400/[0.08] px-3 py-2 text-xs font-bold uppercase text-electric-300 backdrop-blur-sm">
            <Zap className="h-4 w-4" aria-hidden />
            Performance Nutrition
          </div>

          <h1 className="mt-6 text-balance font-heading text-6xl leading-[0.9] text-white sm:text-7xl lg:text-8xl">
            BUILT FOR <br/>STRENGTH.
          </h1>

          <p className="mt-4 text-sm sm:text-base font-bold uppercase tracking-wider text-electric-300">
            100% Authentic | COD Available | Direct WhatsApp Ordering
          </p>

          <p className="mt-6 max-w-xl text-base leading-8 text-zinc-300 sm:text-lg">
            Premium performance nutrition designed for explosive muscle growth, rapid recovery,
            and unmatched strength.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/#featured"
                className="inline-flex min-h-14 w-full items-center justify-center gap-2 border border-electric-400 bg-electric-500 px-8 text-sm font-bold uppercase tracking-[0.16em] text-black shadow-glow hover:bg-white hover:border-white transition-colors sm:w-auto"
              >
                Shop Now
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <a
                href="https://wa.me/917015553297?text=Hi,%20I%20want%20to%20order%20from%20Kyrox%20Muscle."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 w-full items-center justify-center gap-2 border border-[#25D366] bg-[#25D366]/10 px-8 text-sm font-bold uppercase tracking-[0.16em] text-[#25D366] hover:bg-[#25D366]/20 backdrop-blur-sm transition-colors sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                Order on WhatsApp
              </a>
            </motion.div>
          </div>

          {/* Trust Strip */}
          <div className="mt-12 flex flex-wrap items-center gap-6 text-xs font-bold uppercase tracking-wider text-zinc-400">
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-electric-400" /> Authentic Verification</div>
            <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-electric-400" /> COD Available</div>
            <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-electric-400" /> Premium Ingredients</div>
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-zinc-500 md:block">
        <ChevronDown className="h-6 w-6 animate-bounce" aria-hidden />
      </div>
    </section>
  );
}
