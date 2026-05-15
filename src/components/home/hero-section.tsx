"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Zap } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { ProductVisual } from "@/components/home/product-visual";

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden border-b border-white/10">
      <motion.div
        className="absolute inset-0 -z-20 bg-[linear-gradient(120deg,rgba(38,217,255,0.18)_0%,transparent_28%,rgba(217,205,165,0.14)_68%,transparent_100%)]"
        animate={{ opacity: [0.55, 0.92, 0.55] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_74%_34%,rgba(38,217,255,0.18),transparent_24rem),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_36%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-black to-transparent" />

      <div className="container grid min-h-[calc(100vh-5rem)] items-center gap-12 py-14 lg:grid-cols-[1fr_0.9fr] lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 border border-electric-300/35 bg-electric-400/[0.08] px-3 py-2 text-xs font-bold uppercase text-electric-300">
            <Zap className="h-4 w-4" aria-hidden />
            Performance Nutrition
          </div>

          <h1 className="mt-6 text-balance font-heading text-7xl leading-[0.88] text-white sm:text-8xl lg:text-9xl">
            BUILT FOR STRENGTH.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
            Premium performance nutrition designed for muscle growth, recovery,
            and strength.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <LinkButton href="/shop" className="w-full sm:w-auto">
                Shop Now
                <ArrowRight className="h-4 w-4" aria-hidden />
              </LinkButton>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <LinkButton
                href="/product"
                variant="secondary"
                className="text-electric-100 w-full border-electric-300/35 hover:border-electric-300 hover:text-white sm:w-auto"
              >
                Explore Products
              </LinkButton>
            </motion.div>
          </div>

          <div className="bg-black/36 mt-10 grid max-w-xl grid-cols-3 border border-white/10">
            {[
              ["Power", "Growth"],
              ["Recovery", "Daily"],
              ["Formula", "Verified"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="border-r border-white/10 p-4 last:border-r-0"
              >
                <p className="font-heading text-3xl text-silver-100">{value}</p>
                <p className="mt-1 text-xs font-semibold uppercase text-zinc-500">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="relative mx-auto h-[31rem] w-full max-w-[34rem]">
          <motion.div
            className="absolute left-1/2 top-1/2 h-[25rem] w-[25rem] -translate-x-1/2 -translate-y-1/2 border border-electric-300/20 bg-electric-400/[0.04]"
            animate={{ rotate: [0, 2, 0], scale: [1, 1.03, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-[9%] top-[22%] w-[12rem] opacity-80"
            initial={{ opacity: 0, x: -24, y: 18 }}
            animate={{ opacity: 0.8, x: 0, y: [0, -12, 0] }}
            transition={{
              opacity: { duration: 0.7, delay: 0.15 },
              x: { duration: 0.7, delay: 0.15 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <ProductVisual
              name="Kyrox Muscle Nitra Whey Protein"
              tone="blue"
              size="sm"
            />
          </motion.div>
          <motion.div
            className="absolute right-[5%] top-[16%] w-[12rem] opacity-85"
            initial={{ opacity: 0, x: 24, y: 18 }}
            animate={{ opacity: 0.85, x: 0, y: [0, 10, 0] }}
            transition={{
              opacity: { duration: 0.7, delay: 0.25 },
              x: { duration: 0.7, delay: 0.25 },
              y: { duration: 5.6, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <ProductVisual
              name="Kyrox Muscle Anabolic Mass Gainer"
              tone="silver"
              size="sm"
            />
          </motion.div>
          <motion.div
            className="absolute inset-x-0 bottom-0 mx-auto w-[20rem]"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: [0, -14, 0], scale: 1 }}
            transition={{
              opacity: { duration: 0.75, delay: 0.35 },
              scale: { duration: 0.75, delay: 0.35 },
              y: { duration: 6.4, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <ProductVisual
              name="Kyrox Muscle Mass Gainer"
              tone="gold"
              size="lg"
            />
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-zinc-500 md:block">
        <ChevronDown className="h-6 w-6 animate-bounce" aria-hidden />
      </div>
    </section>
  );
}
