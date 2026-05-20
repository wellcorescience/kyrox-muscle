"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionReveal } from "@/components/home/section-reveal";

export function CtaSection() {
  return (
    <section
      className="relative isolate overflow-hidden border-t border-neutral-900 py-20 md:py-32 bg-[#0f0f0f] grain-bg relative"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(168,147,64,0.12) 0%, #0f0f0f 70%)' }}
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/bg/product_lifestyle.png"
          alt=""
          fill
          className="object-cover object-center opacity-[0.14] mix-blend-luminosity filter brightness-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f]/90 via-[#0f0f0f]/40 to-[#0f0f0f]/95" />
      </div>

      <div className="container relative z-10">
        <SectionReveal className="mx-auto max-w-4xl text-center animate-on-scroll">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A89340]">
            The Next Training Block Starts Here
          </p>
          <h2 className="mt-4 text-balance text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-[#FFFFFF] font-black tracking-normal uppercase">
            READY TO BUILD MASS?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70">
            Shop premium performance formulas designed for strength, size, and
            repeatable progress. Order now with Cash on Delivery.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/#featured"
              className="inline-flex min-h-[3.5rem] w-full items-center justify-center gap-2 bg-[#A89340] text-white border border-[#A89340] px-10 text-[13px] font-bold uppercase tracking-[0.2em] transition-all duration-200 hover:brightness-[1.1] hover:-translate-y-[1px] active:scale-[0.97] shadow-[0_4px_24px_rgba(168,147,64,0.4)] btn-primary btn-arrow sm:w-auto rounded-xl"
            >
              Buy Now
              <ArrowRight className="h-4 w-4 arrow-icon" aria-hidden />
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-[3.5rem] w-full items-center justify-center gap-2 border border-white/25 bg-white/[0.08] text-white backdrop-blur-sm px-10 text-[13px] font-bold uppercase tracking-[0.2em] transition-all duration-200 hover:bg-white/[0.16] active:scale-[0.97] sm:w-auto rounded-xl"
            >
              Contact Support
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
