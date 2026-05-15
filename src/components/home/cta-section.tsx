"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionReveal } from "@/components/home/section-reveal";
import { LinkButton } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="relative isolate overflow-hidden border-t border-white/10 bg-black py-20 md:py-28">
      <motion.div
        className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,rgba(38,217,255,0.14),transparent_38%,rgba(217,205,165,0.16))]"
        animate={{ opacity: [0.45, 0.88, 0.45] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-metal-200 to-transparent" />

      <div className="container">
        <SectionReveal className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase text-electric-300">
            The Next Training Block Starts Here
          </p>
          <h2 className="mt-4 text-balance text-6xl leading-none text-white md:text-8xl">
            START BUILDING YOUR BEST PHYSIQUE.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-zinc-400">
            Shop premium performance formulas designed for strength, size, and
            repeatable progress.
          </p>
          <motion.div
            className="mt-8 inline-flex"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <LinkButton href="/shop">
              Shop Now
              <ArrowRight className="h-4 w-4" aria-hidden />
            </LinkButton>
          </motion.div>
        </SectionReveal>
      </div>
    </section>
  );
}
