"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Zap, ShieldCheck, Truck, Sparkles, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden border-b border-neutral-900 flex items-center bg-[#0d0d0d] grain-bg">
      {/* Background Image */}
      <div className="absolute inset-0 -z-30">
        <Image 
          src="/images/bg/hero_bg.png"
          alt="Kyrox Muscle Premium Supplements"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Dark Overlays for Readability & Contrast */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.75) 100%)' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(185,148,28,0.2),transparent_50%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/90 to-transparent" />
      </div>

      <div className="container relative z-10 py-14 lg:py-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 border border-gold-400/40 bg-[rgba(168,147,64,0.15)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#A89340] backdrop-blur-md rounded-full shadow-sm">
            <Zap className="h-3.5 w-3.5" aria-hidden />
            Performance Nutrition
          </div>

          <h1 className="mt-8 text-balance font-extrabold antialiased text-4xl sm:text-6xl lg:text-7xl leading-[1.1] tracking-wide uppercase text-white hero-text-shadow animate-on-scroll">
            BUILT FOR <br/><span className="metallic-text">STRENGTH.</span>
          </h1>

          <p className="mt-6 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-gold-500">
            100% Authentic • COD Available • Direct Support
          </p>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl font-medium tracking-[0.01em]">
            Premium performance nutrition designed for explosive muscle growth, rapid recovery,
            and unmatched strength.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/#featured"
              className="inline-flex min-h-[3.5rem] w-full sm:w-auto items-center justify-center gap-2 bg-[#A89340] text-white border border-[#A89340] px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-200 hover:brightness-[1.1] hover:-translate-y-[1px] active:scale-[0.97] shadow-[0_4px_24px_rgba(168,147,64,0.4)] btn-primary btn-arrow"
            >
              Shop Now
              <ArrowRight className="h-4 w-4 arrow-icon" aria-hidden />
            </Link>
            <Link
              href="/verify"
              className="inline-flex min-h-[3.5rem] w-full sm:w-auto items-center justify-center gap-2 border border-white/25 bg-white/8 text-white backdrop-blur-sm px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:bg-white/16"
            >
              <ShieldCheck className="h-4 w-4" aria-hidden />
              Verify Product
            </Link>
          </div>

          {/* Trust Strip */}
          <div className="mt-12 flex flex-wrap items-center gap-6 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/60">
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#A89340]" /> Authentic Verification</div>
            <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-[#A89340]" /> COD Available</div>
            <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-[#A89340]" /> Premium Ingredients</div>
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-white/50 md:block">
        <ChevronDown className="h-6 w-6 animate-bounce" aria-hidden />
      </div>
    </section>
  );
}
