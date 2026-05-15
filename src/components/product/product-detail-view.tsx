"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  BadgeCheck,
  BatteryCharging,
  ChevronDown,
  Dumbbell,
  Flame,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product/product-card";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

type ProductDetailViewProps = {
  product: Product;
  relatedProducts: Product[];
};

const faqs = [
  {
    question: "Is this beginner friendly?",
    answer:
      "Yes. Start with the recommended serving size and use it alongside a consistent training and nutrition plan.",
  },
  {
    question: "Best time to consume?",
    answer:
      "Post-workout is ideal for recovery support, while mass gainers can also be used between meals during calorie-surplus phases.",
  },
  {
    question: "Is it vegetarian?",
    answer:
      "The formulas are designed for vegetarian supplement users. Always check the final product label for allergen and dietary details.",
  },
  {
    question: "Can women use this supplement?",
    answer:
      "Yes. These products can be used by women when the formula matches their training, nutrition, and health goals.",
  },
];

const trustBadges = [
  { label: "Authentic Products", icon: ShieldCheck },
  { label: "FSSAI Certified", icon: BadgeCheck },
  { label: "Premium Ingredients", icon: Sparkles },
  { label: "Athlete Formulated", icon: UserCheck },
];

const benefitIcons = [Dumbbell, BatteryCharging, Flame];

export function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  const tone = useMemo(
    () =>
      product.category === "whey-protein"
        ? {
            text: "text-electric-300",
            border: "border-electric-300/45",
            glow: "bg-electric-400/20",
            line: "from-transparent via-electric-300/80 to-transparent",
            label: "from-electric-300 via-electric-400 to-electric-600",
          }
        : {
            text: "text-metal-200",
            border: "border-metal-200/45",
            glow: "bg-metal-200/20",
            line: "from-transparent via-metal-200/80 to-transparent",
            label: "from-metal-200 via-metal-300 to-metal-500",
          },
    [product.category],
  );

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-white/10 bg-black py-12 md:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_16%,rgba(38,217,255,0.15),transparent_25rem),radial-gradient(circle_at_78%_20%,rgba(217,205,165,0.14),transparent_23rem),linear-gradient(180deg,rgba(255,255,255,0.05),transparent_60%)]" />
        <div className="container grid gap-10 lg:grid-cols-[1fr_0.92fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProductGallery
              product={product}
              activeImage={activeImage}
              setActiveImage={setActiveImage}
              tone={tone}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.62,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className={cn("text-sm font-bold uppercase", tone.text)}>
              {product.categoryLabel}
            </p>
            <h1 className="mt-4 text-balance text-6xl leading-[0.9] text-white md:text-8xl">
              {product.name}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-300">
              {product.description}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <InfoPill label="Flavor" value={product.flavor} />
              <InfoPill label="Weight" value={product.weight} />
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {product.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className={cn(
                    "border bg-white/[0.04] px-3 py-2 text-xs font-black uppercase text-white shadow-glow",
                    tone.border,
                  )}
                >
                  {highlight}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-metal-200 bg-metal-200 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-black shadow-glow hover:bg-white"
              >
                Add to Cart
              </motion.button>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/verify"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white hover:border-electric-300/60 sm:w-auto"
                >
                  <ShieldCheck className="h-4 w-4" aria-hidden />
                  Verify Product
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <ProductSection
        eyebrow="Benefits"
        title="Built for measurable training outcomes."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {product.benefits.map((benefit, index) => {
            const Icon = benefitIcons[index] ?? Activity;

            return (
              <RevealCard key={benefit} delay={index * 0.06}>
                <Icon className={cn("h-6 w-6", tone.text)} aria-hidden />
                <h2 className="mt-6 text-3xl text-white">{benefit}</h2>
                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  Designed to support the demands of hard training and
                  consistent physical progress.
                </p>
              </RevealCard>
            );
          })}
        </div>
      </ProductSection>

      <ProductSection eyebrow="Nutrition Facts" title="Formula proof points.">
        <div className="grid gap-4 md:grid-cols-3">
          {product.nutritionFacts.map((fact, index) => (
            <RevealCard key={fact.label} delay={index * 0.06}>
              <PackageCheck className={cn("h-6 w-6", tone.text)} aria-hidden />
              <p className="mt-8 font-heading text-6xl leading-none text-white">
                {fact.value}
              </p>
              <p className="mt-2 text-sm font-bold uppercase text-zinc-500">
                {fact.label}
              </p>
            </RevealCard>
          ))}
        </div>
      </ProductSection>

      <ProductSection
        eyebrow="Ingredients"
        title="Premium formula architecture."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {product.ingredients.map((ingredient, index) => (
            <RevealCard key={ingredient} delay={index * 0.05}>
              <div className={cn("h-px w-20 bg-gradient-to-r", tone.line)} />
              <h2 className="mt-6 text-3xl text-white">{ingredient}</h2>
            </RevealCard>
          ))}
        </div>
      </ProductSection>

      <ProductSection
        eyebrow="How To Use"
        title="Simple, consistent daily use."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {product.usageInstructions.map((instruction, index) => (
            <RevealCard key={instruction} delay={index * 0.06}>
              <p
                className={cn("font-heading text-5xl leading-none", tone.text)}
              >
                0{index + 1}
              </p>
              <h2 className="mt-6 text-3xl text-white">{instruction}</h2>
            </RevealCard>
          ))}
        </div>
      </ProductSection>

      <ProductSection eyebrow="FAQ" title="Supplement questions, answered.">
        <div className="mx-auto max-w-4xl">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                className="border-b border-white/10"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-xl font-bold text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-metal-200 transition-transform",
                      isOpen && "rotate-180",
                    )}
                    aria-hidden
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm leading-7 text-zinc-400">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </ProductSection>

      <ProductSection eyebrow="Related Products" title="Complete the stack.">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {relatedProducts.map((relatedProduct, index) => (
            <ProductCard
              key={relatedProduct.id}
              product={relatedProduct}
              index={index}
            />
          ))}
        </div>
      </ProductSection>

      <ProductSection eyebrow="Trust" title="Quality signals at every step.">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon;

            return (
              <RevealCard key={badge.label} delay={index * 0.05}>
                <Icon className={cn("h-6 w-6", tone.text)} aria-hidden />
                <h2 className="mt-6 text-3xl text-white">{badge.label}</h2>
              </RevealCard>
            );
          })}
        </div>
      </ProductSection>

      <section className="relative isolate overflow-hidden border-t border-white/10 bg-black py-16 md:py-24">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,rgba(38,217,255,0.14),transparent_42%,rgba(217,205,165,0.14))]" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="container mx-auto max-w-4xl text-center"
        >
          <p className={cn("text-sm font-bold uppercase", tone.text)}>
            Product Authentication
          </p>
          <h2 className="mt-4 text-balance text-6xl leading-none text-white md:text-8xl">
            VERIFY YOUR PRODUCT AUTHENTICITY
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-zinc-400">
            Confirm your Kyrox Muscle product before use with the dedicated
            verification flow.
          </p>
          <motion.div className="mt-8 inline-flex" whileHover={{ y: -2 }}>
            <Link
              href="/verify"
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-metal-200 bg-metal-200 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-black shadow-glow hover:bg-white"
            >
              <ShieldCheck className="h-4 w-4" aria-hidden />
              Verify Product
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}

function ProductGallery({
  product,
  activeImage,
  setActiveImage,
  tone,
}: {
  product: Product;
  activeImage: number;
  setActiveImage: (index: number) => void;
  tone: {
    text: string;
    border: string;
    glow: string;
    line: string;
    label: string;
  };
}) {
  return (
    <div>
      <div className="relative grid min-h-[30rem] place-items-center overflow-hidden border border-white/10 bg-white/[0.035]">
        <div
          className={cn("absolute h-64 w-64 rounded-full blur-3xl", tone.glow)}
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -16 }}
            transition={{ duration: 0.34, ease: "easeOut" }}
            className="relative aspect-[3/4] w-full max-w-[18rem]"
            aria-label={`${product.name} ${product.gallery[activeImage]} placeholder`}
            role="img"
          >
            <div
              className={cn(
                "absolute inset-x-[18%] top-0 h-8 rounded-t-[44%] border bg-gradient-to-b from-zinc-700 to-black",
                tone.border,
              )}
            />
            <div
              className={cn(
                "absolute inset-x-[12%] top-6 h-[88%] overflow-hidden border bg-[linear-gradient(112deg,#24262d_0%,#08080a_46%,#17181e_100%)] shadow-2xl",
                tone.border,
              )}
            >
              <div className="absolute inset-y-0 left-0 w-1/2 bg-white/[0.055]" />
              <div
                className={cn(
                  "absolute inset-x-0 top-[34%] bg-gradient-to-r py-5",
                  tone.label,
                )}
              >
                <p className="text-center font-heading text-5xl leading-none text-black">
                  KYROX
                </p>
                <p className="text-center text-xs font-black uppercase text-black">
                  Muscle
                </p>
              </div>
              <p className="absolute inset-x-6 bottom-20 text-center text-xs font-black uppercase tracking-[0.22em] text-zinc-400">
                {product.gallery[activeImage]}
              </p>
              <div className="absolute inset-x-10 bottom-12 h-1 bg-white/20" />
              <div className="absolute inset-x-14 bottom-8 h-1 bg-white/10" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {product.gallery.map((item, index) => {
          const isActive = activeImage === index;

          return (
            <button
              key={item}
              type="button"
              onClick={() => setActiveImage(index)}
              className={cn(
                "min-h-20 border bg-white/[0.03] p-3 text-left text-xs font-bold uppercase text-zinc-400",
                isActive
                  ? cn(tone.border, tone.text)
                  : "border-white/10 hover:border-white/25 hover:text-white",
              )}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-white/10 bg-white/[0.035] p-4">
      <p className="text-xs font-bold uppercase text-zinc-500">{label}</p>
      <p className="mt-1 text-lg font-bold text-white">{value}</p>
    </div>
  );
}

function ProductSection({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-white/10 bg-carbon-900 py-16 md:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 max-w-3xl"
        >
          <p className="text-sm font-bold uppercase text-electric-300">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-balance text-5xl leading-none text-white md:text-6xl">
            {title}
          </h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function RevealCard({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.46, delay, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-40 border border-white/10 bg-white/[0.035] p-6 shadow-2xl hover:border-electric-300/35"
    >
      {children}
    </motion.article>
  );
}
