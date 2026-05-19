"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  BatteryCharging,
  ChevronDown,
  Dumbbell,
  Flame,
  Headset,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
  UserCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product/product-card";
import { ProductReviews } from "@/components/product/product-reviews";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

type ProductDetailViewProps = {
  product: Product;
  relatedProducts: Product[];
};

const faqs = [
  {
    question: "Is COD available?",
    answer: "Yes! We offer Cash on Delivery across India. Simply click 'Order COD' and fill in your details. Pay only when your product arrives at your doorstep.",
  },
  {
    question: "How to verify product?",
    answer: "Every Kyrox product has a unique scratch-to-reveal authentication code. Visit the Verify Product page and enter your code to confirm your product is genuine.",
  },
  {
    question: "Which flavor options are available?",
    answer: "All our products are available in Kulfi and Chocolate flavors. Select your preferred flavor when placing your order.",
  },
  {
    question: "How long does delivery take?",
    answer: "Metro cities: 2-4 business days. Rest of India: 4-7 business days. You'll receive a tracking link via WhatsApp once your order is shipped.",
  },
];

const benefitIcons = [Dumbbell, BatteryCharging, Flame, Activity];

export function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [selectedFlavor, setSelectedFlavor] = useState(product.availableFlavors?.[0] || product.flavor);

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

  const waLink = `https://wa.me/917015553297?text=${encodeURIComponent(`Hi, I want to order:\n\nProduct: ${product.name}\nFlavor: ${selectedFlavor}\nQuantity: 1\n\nPlease help me with COD order.`)}`;

  return (
    <>
      {/* HERO PRODUCT SECTION */}
      <section className="relative isolate overflow-hidden border-b border-white/10 pt-28 pb-12 md:pt-32 md:pb-20">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/bg/hero_bg.png" alt="" fill className="object-cover object-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/80" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
        </div>

        <div className="container grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          {/* LEFT - Product Image */}
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

          {/* RIGHT - Product Details */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badges */}
            <div className="flex items-center gap-3 mb-4">
              <span className={cn("border bg-black/50 px-3 py-1.5 text-xs font-bold uppercase backdrop-blur-sm", tone.border, tone.text)}>
                {product.categoryLabel}
              </span>
              <span className="flex items-center gap-1.5 border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 backdrop-blur-sm">
                <ShieldCheck className="h-3 w-3" /> Verified Product
              </span>
            </div>

            <h1 className="text-5xl leading-[0.9] text-white md:text-6xl lg:text-7xl font-black uppercase tracking-tight">
              {product.name}
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-zinc-300">
              {product.description}
            </p>

            {/* MRP */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-4xl font-black text-white">₹{product.mrp}</span>
              <span className="text-sm font-bold uppercase text-zinc-500">MRP (Incl. all taxes)</span>
            </div>

            {/* Flavor Selector */}
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">Select Flavor</p>
              <div className="flex gap-3">
                {product.availableFlavors?.map(flavor => (
                  <button
                    key={flavor}
                    onClick={() => setSelectedFlavor(flavor)}
                    className={cn(
                      "min-h-11 px-6 text-sm font-bold uppercase tracking-wider border transition-all",
                      selectedFlavor === flavor
                        ? "border-electric-300/60 bg-electric-500/15 text-white"
                        : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/25 hover:text-white"
                    )}
                  >
                    {flavor}
                  </button>
                ))}
              </div>
            </div>

            {/* Info pills */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <InfoPill label="Flavor" value={selectedFlavor} />
              <InfoPill label="Weight" value={product.weight} />
            </div>

            {/* Highlights */}
            <div className="mt-5 flex flex-wrap gap-2">
              {product.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className={cn(
                    "border bg-white/[0.04] px-3 py-2 text-xs font-black uppercase text-white",
                    tone.border,
                  )}
                >
                  {highlight}
                </span>
              ))}
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-8 grid gap-3">
              {/* WhatsApp */}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 w-full items-center justify-center gap-2 border border-[#25D366] bg-[#25D366]/10 text-sm font-bold uppercase tracking-[0.16em] text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
              >
                <MessageCircle className="h-5 w-5" /> Order on WhatsApp
              </a>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href={`/checkout?product=${product.slug}&flavor=${selectedFlavor}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 border border-electric-400 bg-electric-500 text-sm font-bold uppercase tracking-wider text-black hover:bg-white transition-colors"
                >
                  <ShoppingCart className="h-4 w-4" /> COD Order
                </Link>
                <Link
                  href="/verify"
                  className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/15 bg-white/[0.04] text-sm font-bold uppercase tracking-wider text-white hover:border-electric-300/60 transition-colors"
                >
                  <ShieldCheck className="h-4 w-4" /> Verify Product
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/bg/trust_bg.png" alt="" fill className="object-cover object-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
        </div>
        <div className="container py-5">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-0 md:divide-x md:divide-white/10">
            {[
              { icon: Truck, label: "Cash on Delivery" },
              { icon: Sparkles, label: "Premium Ingredients" },
              { icon: ShieldCheck, label: "Authentic Verification" },
              { icon: Headset, label: "Direct Support" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center justify-center gap-2.5 px-4 py-2">
                  <Icon className="h-4 w-4 shrink-0 text-electric-400" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-300">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <ProductSection eyebrow="Benefits" title="Why This Product?">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {product.benefits.map((benefit, index) => {
            const Icon = benefitIcons[index] ?? Activity;
            return (
              <RevealCard key={benefit} delay={index * 0.06}>
                <div className="w-12 h-12 grid place-items-center border border-electric-300/25 bg-electric-500/10 mb-4">
                  <Icon className={cn("h-6 w-6", tone.text)} aria-hidden />
                </div>
                <h3 className="text-xl font-bold text-white">{benefit}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Designed to support the demands of hard training and consistent physical progress.
                </p>
              </RevealCard>
            );
          })}
        </div>
      </ProductSection>

      {/* NUTRITION FACTS */}
      <ProductSection eyebrow="Nutrition Facts" title="Formula Proof Points">
        <div className="grid gap-4 md:grid-cols-3">
          {product.nutritionFacts.map((fact, index) => (
            <RevealCard key={fact.label} delay={index * 0.06}>
              <PackageCheck className={cn("h-6 w-6", tone.text)} aria-hidden />
              <p className="mt-6 font-heading text-6xl leading-none text-white">
                {fact.value}
              </p>
              <p className="mt-2 text-sm font-bold uppercase text-zinc-500">
                {fact.label}
              </p>
            </RevealCard>
          ))}
        </div>
      </ProductSection>

      {/* INGREDIENTS */}
      <ProductSection eyebrow="Ingredients" title="Premium Formula Architecture">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {product.ingredients.map((ingredient, index) => (
            <RevealCard key={ingredient} delay={index * 0.05}>
              <div className={cn("h-px w-20 bg-gradient-to-r", tone.line)} />
              <h3 className="mt-6 text-2xl font-bold text-white">{ingredient}</h3>
            </RevealCard>
          ))}
        </div>
      </ProductSection>

      {/* HOW TO USE */}
      <ProductSection eyebrow="How To Use" title="Simple, Consistent Daily Use">
        <div className="grid gap-4 md:grid-cols-3">
          {product.usageInstructions.map((instruction, index) => (
            <RevealCard key={instruction} delay={index * 0.06}>
              <p className={cn("font-heading text-5xl leading-none", tone.text)}>
                0{index + 1}
              </p>
              <h3 className="mt-6 text-2xl font-bold text-white">{instruction}</h3>
            </RevealCard>
          ))}
        </div>
      </ProductSection>

      {/* AUTHENTICITY SECTION */}
      <section className="relative isolate overflow-hidden border-b border-white/10 py-16 md:py-24">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/bg/trust_bg.png" alt="" fill className="object-cover object-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="container mx-auto max-w-4xl text-center"
        >
          <p className="text-sm font-bold uppercase tracking-wider text-electric-300 mb-4">
            Product Authentication
          </p>
          <h2 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tight mb-4">
            Authentic Verified Product
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-8 text-zinc-400 mb-8">
            Every Kyrox product includes a unique authenticity verification code.
            Scratch and reveal the code on your product packaging, then verify it
            instantly on our secure system.
          </p>
          <Link
            href="/verify"
            className="inline-flex min-h-14 items-center justify-center gap-2 border border-electric-400 bg-electric-500 px-10 text-sm font-bold uppercase tracking-[0.16em] text-black shadow-glow hover:bg-white hover:border-white transition-colors"
          >
            <ShieldCheck className="h-5 w-5" /> Verify Your Product
          </Link>
        </motion.div>
      </section>

      {/* WARNINGS */}
      <ProductSection eyebrow="Compliance" title="Important Warnings">
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            "Not for medicinal use",
            "Keep away from children",
            "Pregnant or lactating women should consult a doctor before use",
            "Do not exceed recommended serving"
          ].map((warning, index) => (
            <div
              key={index}
              className="flex items-start gap-3 border border-red-500/10 bg-red-500/[0.02] p-4"
            >
              <div className="mt-1 shrink-0 text-red-400">
                <AlertTriangle className="h-5 w-5" aria-hidden />
              </div>
              <p className="text-sm font-medium leading-relaxed text-red-200/80">{warning}</p>
            </div>
          ))}
        </div>
      </ProductSection>

      {/* REVIEWS */}
      <ProductReviews productId={product.id} />

      {/* FAQ */}
      <ProductSection eyebrow="FAQ" title="Supplement Questions, Answered">
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
                  <span className="text-xl font-bold text-white">{faq.question}</span>
                  <ChevronDown
                    className={cn("h-5 w-5 shrink-0 text-zinc-400 transition-transform", isOpen && "rotate-180")}
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
                      <p className="pb-5 text-sm leading-7 text-zinc-400">{faq.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </ProductSection>

      {/* RELATED PRODUCTS */}
      <ProductSection eyebrow="Related Products" title="Complete The Stack">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {relatedProducts.map((relatedProduct, index) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} index={index} />
          ))}
        </div>
      </ProductSection>

      {/* STICKY MOBILE CTA */}
      <div className="fixed bottom-0 inset-x-0 z-50 md:hidden border-t border-[#25D366]/30 bg-black/90 backdrop-blur-lg px-4 py-3">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 w-full items-center justify-center gap-2 bg-[#25D366] text-sm font-bold uppercase tracking-[0.16em] text-white shadow-lg"
        >
          <MessageCircle className="h-5 w-5" /> WhatsApp Order Now
        </a>
      </div>
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
  // Collect actual image URLs
  const dynamicImages = [product.image, ...(product.gallery || [])].filter(
    (url) => url && (url.startsWith("http") || url.startsWith("/") || url.includes("."))
  );

  if (dynamicImages.length > 0) {
    const activeUrl = dynamicImages[activeImage] || dynamicImages[0];
    return (
      <div>
        <div className="relative grid min-h-[30rem] place-items-center overflow-hidden border border-white/10 bg-white/[0.035]">
          <div className={cn("absolute h-64 w-64 rounded-full blur-3xl", tone.glow)} />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -16 }}
              transition={{ duration: 0.34, ease: "easeOut" }}
              className="relative w-full h-[26rem] flex items-center justify-center p-8"
            >
              <Image
                src={activeUrl}
                alt={product.name}
                fill
                sizes="(max-w-md) 100vw, 360px"
                className="object-contain"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-3 grid grid-cols-4 gap-3">
          {dynamicImages.map((item, index) => {
            const isActive = activeImage === index;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setActiveImage(index)}
                className={cn(
                  "relative aspect-square border bg-white/[0.03] p-1 overflow-hidden transition-colors",
                  isActive
                    ? cn(tone.border)
                    : "border-white/10 hover:border-white/25",
                )}
              >
                <Image
                  src={item}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-contain p-1"
                />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

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
    <section className="relative overflow-hidden border-b border-white/10 py-16 md:py-24">
      <div className="absolute inset-0 -z-10">
        <Image src="/images/bg/featured_bg.png" alt="" fill className="object-cover object-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />
      </div>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 max-w-3xl"
        >
          <p className="text-sm font-bold uppercase tracking-wider text-electric-300">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-balance text-4xl leading-none text-white md:text-5xl font-black uppercase tracking-tight">
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
      className="min-h-40 border border-white/10 bg-black/40 backdrop-blur-sm p-6 shadow-2xl hover:border-electric-300/35"
    >
      {children}
    </motion.article>
  );
}
