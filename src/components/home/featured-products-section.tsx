"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProductVisual } from "@/components/home/product-visual";
import { SectionReveal } from "@/components/home/section-reveal";
import { LinkButton } from "@/components/ui/button";

const products = [
  {
    title: "Kyrox Muscle Mass Gainer",
    highlights: ["423 kcal", "72g carbs", "Weight gain support"],
    tone: "gold" as const,
  },
  {
    title: "Kyrox Muscle Anabolic Mass Gainer",
    highlights: ["30g protein", "Recovery support"],
    tone: "silver" as const,
  },
  {
    title: "Kyrox Muscle Nitra Whey Protein",
    highlights: ["26g protein", "Whey isolate blend"],
    tone: "blue" as const,
  },
];

export function FeaturedProductsSection() {
  return (
    <section className="bg-carbon-900 py-16 md:py-24">
      <div className="container">
        <SectionReveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase text-metal-200">
              Featured Products
            </p>
            <h2 className="mt-3 text-balance text-5xl leading-none text-white md:text-6xl">
              Featured Supplements
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-zinc-400">
            High-output formulas shaped for training blocks, muscle gain, and
            recovery-focused performance.
          </p>
        </SectionReveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {products.map((product, index) => (
            <SectionReveal key={product.title} delay={index * 0.08}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="group relative overflow-hidden border border-white/10 bg-white/[0.035] p-5 shadow-2xl"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric-300/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="grid min-h-[20rem] place-items-center bg-gradient-to-b from-white/[0.05] to-black/20">
                  <ProductVisual
                    name={product.title}
                    tone={product.tone}
                    size="sm"
                  />
                </div>
                <h3 className="mt-6 min-h-20 text-4xl leading-none text-white">
                  {product.title}
                </h3>
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
                <LinkButton
                  href="/product"
                  variant="secondary"
                  className="mt-6 w-full"
                >
                  View Product
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </LinkButton>
              </motion.article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
