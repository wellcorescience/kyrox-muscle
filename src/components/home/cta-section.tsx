"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionReveal } from "@/components/home/section-reveal";

export function CtaSection() {
  return (
    <section className="relative isolate overflow-hidden border-t border-white/10 py-20 md:py-28">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/bg/cta_bg.png"
          alt=""
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-r from-black/80 via-black/50 to-black/70" />
      </div>

      <div className="container">
        <SectionReveal className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-electric-300">
            The Next Training Block Starts Here
          </p>
          <h2 className="mt-4 text-balance text-5xl leading-none text-white md:text-7xl lg:text-8xl font-black">
            READY TO BUILD MASS?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-zinc-300">
            Shop premium performance formulas designed for strength, size, and
            repeatable progress. Order now with Cash on Delivery or via WhatsApp.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/#featured"
                className="inline-flex min-h-14 w-full items-center justify-center gap-2 border border-electric-400 bg-electric-500 px-10 text-sm font-bold uppercase tracking-[0.16em] text-black shadow-glow hover:bg-white hover:border-white transition-colors sm:w-auto"
              >
                Buy Now
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <a
                href="https://wa.me/917015553297?text=Hi,%20I%20want%20to%20order%20from%20Kyrox%20Muscle."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 w-full items-center justify-center gap-2 border border-[#25D366] bg-[#25D366]/10 px-10 text-sm font-bold uppercase tracking-[0.16em] text-[#25D366] hover:bg-[#25D366]/20 backdrop-blur-sm transition-colors sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                Order on WhatsApp
              </a>
            </motion.div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
