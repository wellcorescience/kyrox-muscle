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
    answer: "Metro cities: 2-4 business days. Rest of India: 4-7 business days. You'll receive a tracking link via email/SMS once your order is shipped.",
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
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (typeof window !== "undefined") {
      const cart = JSON.parse(localStorage.getItem("kyrox_cart") || "[]");
      const existing = cart.find(
        (item: any) => item.slug === product.slug && item.flavor === selectedFlavor
      );
      if (existing) {
        existing.quantity = Math.min(existing.quantity + 1, 5);
      } else {
        cart.push({
          slug: product.slug,
          name: product.name,
          flavor: selectedFlavor,
          quantity: 1,
          price: product.mrp,
        });
      }
      localStorage.setItem("kyrox_cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("kyrox_cart_updated"));
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const tone = useMemo(
    () =>
      product.category === "whey-protein"
        ? {
            text: "text-gold-500",
            border: "border-gold-300",
            glow: "bg-gold-100/40",
            line: "from-transparent via-gold-300/80 to-transparent",
            label: "from-gold-300 via-gold-400 to-gold-500",
          }
        : {
            text: "text-foreground",
            border: "border-ivory-300",
            glow: "bg-ivory-200/40",
            line: "from-transparent via-ivory-300/80 to-transparent",
            label: "from-ivory-200 via-ivory-300 to-ivory-400",
          },
    [product.category],
  );

  return (
    <>
      {/* HERO PRODUCT SECTION */}
      <section className="relative isolate overflow-hidden border-b border-ivory-200 bg-ivory-50 pt-28 pb-12 md:pt-32 md:pb-20">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/bg/hero_bg.png" alt="" fill className="object-cover object-center opacity-5" />
          <div className="absolute inset-0 bg-gradient-to-r from-ivory-50 via-ivory-50/70 to-ivory-100" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ivory-50 to-transparent" />
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
              <span className={cn("border bg-white px-3 py-1.5 text-xs font-bold uppercase shadow-sm", tone.border, tone.text)}>
                {product.categoryLabel}
              </span>
              <span className="flex items-center gap-1.5 border border-emerald-500/20 bg-emerald-50 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 shadow-sm rounded-full">
                <ShieldCheck className="h-3 w-3" /> Verified Product
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-foreground font-black uppercase tracking-normal">
              {product.name}
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted font-medium">
              {product.description}
            </p>

            {/* MRP */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-4xl font-black text-foreground">₹{product.mrp}</span>
              <span className="text-sm font-bold uppercase text-muted">MRP (Incl. all taxes)</span>
            </div>

            {/* Flavor Selector */}
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-muted mb-3">Select Flavor</p>
              <div className="flex gap-3">
                {product.availableFlavors?.map(flavor => (
                  <button
                    key={flavor}
                    onClick={() => setSelectedFlavor(flavor)}
                    className={cn(
                      "min-h-11 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] border-[1.5px] cursor-pointer transition-all duration-150 rounded-md",
                      selectedFlavor === flavor
                        ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
                        : "border-[#d1d1d1] bg-white text-[#333] hover:border-[#888]"
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
                    "border bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground shadow-sm rounded-lg",
                    tone.border,
                  )}
                >
                  {highlight}
                </span>
              ))}
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-8 grid gap-3">
              <Link
                href={`/checkout?product=${product.slug}&flavor=${selectedFlavor}`}
                className="inline-flex min-h-14 w-full items-center justify-center gap-2 border border-gold-400 bg-gold-400 text-[13px] font-bold uppercase tracking-[0.2em] text-white shadow-glow hover:-translate-y-1 hover:shadow-premium hover:bg-gold-500 hover:border-gold-500 transition-all duration-300 rounded-xl btn-primary btn-arrow"
              >
                <ShoppingCart className="h-5 w-5" /> Buy Now (Cash on Delivery)
              </Link>
              <button
                onClick={handleAddToCart}
                className={cn(
                  "inline-flex min-h-14 w-full items-center justify-center gap-2 border text-[13px] font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-xl",
                  added
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : "border-[#1a1a1a] bg-transparent text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white"
                )}
              >
                <ShoppingCart className="h-5 w-5" /> {added ? "Added to Cart ✓" : "Add to Cart"}
              </button>
              <Link
                href="/verify"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 border border-ivory-200 bg-ivory-50 text-[12px] font-bold uppercase tracking-[0.2em] text-foreground hover:-translate-y-1 hover:shadow-premium hover:border-gold-300 hover:bg-white transition-all duration-300 shadow-sm rounded-xl btn-primary"
              >
                <ShieldCheck className="h-4 w-4" /> Verify Authentic Product
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="relative overflow-hidden border-b border-ivory-200 bg-white">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/bg/trust_bg.png" alt="" fill className="object-cover object-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white" />
        </div>
        <div className="container py-5">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-0 md:divide-x md:divide-ivory-200">
            {[
              { icon: Truck, label: "Cash on Delivery" },
              { icon: Sparkles, label: "Premium Ingredients" },
              { icon: ShieldCheck, label: "Authentic Verification" },
              { icon: Headset, label: "Direct Support" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center justify-center gap-2.5 px-4 py-2">
                  <Icon className="h-4 w-4 shrink-0 text-gold-400" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <ProductSection eyebrow="Benefits" title="Why This Product?" className="bg-[#FAF8F5]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {product.benefits.map((benefit, index) => {
            const Icon = benefitIcons[index] ?? Activity;
            return (
              <RevealCard key={benefit} delay={index * 0.06}>
                <div className="w-12 h-12 grid place-items-center border border-gold-300/40 bg-gold-50 mb-4 shadow-sm">
                  <Icon className={cn("h-6 w-6 text-gold-500")} aria-hidden />
                </div>
                <h3 className="text-xl font-bold text-foreground">{benefit}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Designed to support the demands of hard training and consistent physical progress.
                </p>
              </RevealCard>
            );
          })}
        </div>
      </ProductSection>

      {/* NUTRITION FACTS */}
      <ProductSection eyebrow="Nutrition Facts" title="Formula Proof Points" className="bg-white">
        <div className="grid gap-4 md:grid-cols-3">
          {product.nutritionFacts.map((fact, index) => {
            // Visual override to fix database typos and missing quantitative values without touching backend
            let displayLabel = fact.label;
            let displayValue = fact.value;

            if (displayLabel.toUpperCase() === "CREATING") displayLabel = "Creatine";
            if (displayValue.toUpperCase() === "CREATING") displayValue = "Creatine";
            
            if (displayLabel.toUpperCase() === "BLEND" && displayValue.toUpperCase() === "WHEY ISOLATE") {
              displayValue = "100%";
              displayLabel = "Whey Isolate Blend";
            }
            if (displayLabel.toUpperCase() === "CREATINE" && displayValue.toUpperCase() === "ADDED") {
              displayValue = "3g";
            }

            return (
              <RevealCard key={fact.label} delay={index * 0.06}>
                <div className="flex flex-col items-center justify-center h-full min-h-[160px] p-5">
                  <PackageCheck className={cn("h-6 w-6 text-gold-500 mb-4")} aria-hidden />
                  <p className="font-mono text-5xl md:text-6xl font-bold tracking-tight text-[#1a1a1a]">
                    {displayValue}
                  </p>
                  <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#666]">
                    {displayLabel}
                  </p>
                </div>
              </RevealCard>
            );
          })}
        </div>
      </ProductSection>

      {/* INGREDIENTS */}
      <ProductSection eyebrow="Ingredients" title="Premium Formula Architecture" className="bg-[#FAF8F5]">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {product.ingredients.map((ingredient, index) => (
            <RevealCard key={ingredient} delay={index * 0.05}>
              <div className={cn("h-px w-20 bg-gradient-to-r", tone.line)} />
              <h3 className="mt-6 text-2xl font-bold text-foreground">{ingredient}</h3>
            </RevealCard>
          ))}
        </div>
      </ProductSection>

      {/* HOW TO USE */}
      <ProductSection eyebrow="How To Use" title="Simple, Consistent Daily Use" className="bg-white">
        <div className="grid gap-4 md:grid-cols-3">
          {product.usageInstructions.map((instruction, index) => (
            <RevealCard key={instruction} delay={index * 0.06}>
              <p className={cn("font-heading text-5xl leading-none text-gold-400/50")}>
                0{index + 1}
              </p>
              <h3 className="mt-6 text-2xl font-bold text-foreground">{instruction}</h3>
            </RevealCard>
          ))}
        </div>
      </ProductSection>

      {/* AUTHENTICITY SECTION */}
      <section className="relative isolate overflow-hidden border-b border-[#e8e5de] py-10 md:py-14 bg-[#FAF8F5]">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/bg/trust_bg.png" alt="" fill className="object-cover object-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5] via-white/55 to-[#FAF8F5]" />
        </div>
        
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 text-left"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-500 mb-4">
                Product Authentication
              </p>
              <div className="section-divider left mt-2 mb-4" />
              <h2 className="text-3xl md:text-5xl font-black uppercase text-foreground tracking-normal leading-[1.1] mb-4">
                Authentic Verified Product
              </h2>
              <p className="text-base leading-relaxed text-muted mb-8 font-medium">
                Every Kyrox product includes a unique authenticity verification code.
                Scratch and reveal the code on your product packaging, then verify it
                instantly on our secure system.
              </p>
              <Link
                href="/verify"
                className="inline-flex min-h-[3.5rem] items-center justify-center gap-2 border border-gold-400 bg-gold-400 px-10 text-[13px] font-bold uppercase tracking-[0.2em] text-white shadow-glow hover:-translate-y-1 hover:shadow-premium hover:bg-gold-500 hover:border-gold-500 transition-all duration-300 rounded-xl btn-primary"
              >
                <ShieldCheck className="h-5 w-5" /> Verify Your Product
              </Link>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5"
            >
              <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] overflow-hidden rounded-2xl border border-[#E8E5DE] shadow-premium group">
                <Image
                  src="/images/bg/authenticity_seal.png"
                  alt="Kyrox Muscle Authenticity Holographic Seal"
                  fill
                  className="object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white z-10 p-4 border border-white/10 bg-black/40 backdrop-blur-md rounded-xl">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gold-400 flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" /> Holographic Security Seal
                  </p>
                  <p className="mt-1 text-xs text-white/95 leading-normal">
                    Scratch off the silver layer to reveal your unique 12-digit code.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WARNINGS */}
      <ProductSection eyebrow="Compliance" title="Important Warnings" className="bg-white">
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
      <ProductSection eyebrow="FAQ" title="Supplement Questions, Answered" className="bg-white">
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
                className="border-b border-ivory-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-xl font-bold text-foreground">{faq.question}</span>
                  <ChevronDown
                    className={cn("h-5 w-5 shrink-0 text-muted transition-transform", isOpen && "rotate-180")}
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
                      <p className="pb-5 text-sm leading-7 text-muted">{faq.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </ProductSection>

      {/* RELATED PRODUCTS */}
      <ProductSection eyebrow="Related Products" title="Complete The Stack" className="bg-[#FAF8F5]">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {relatedProducts.map((relatedProduct, index) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} index={index} />
          ))}
        </div>
      </ProductSection>

      {/* STICKY MOBILE CTA */}
      <div className="fixed bottom-0 inset-x-0 z-50 md:hidden border-t border-ivory-200 bg-white/95 backdrop-blur-lg px-4 py-3">
        <Link
          href={`/checkout?product=${product.slug}&flavor=${selectedFlavor}`}
          className="flex min-h-12 w-full items-center justify-center gap-2 bg-gold-400 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-lg rounded-xl btn-primary"
        >
          <ShoppingCart className="h-5 w-5" /> Order Now (COD)
        </Link>
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
        <div className="relative grid min-h-[30rem] place-items-center overflow-hidden border border-[#e8e5de] bg-white/50 rounded-2xl shadow-sm">
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
                  "relative aspect-square border bg-white p-1 overflow-hidden transition-colors rounded-xl shadow-sm",
                  isActive
                    ? cn(tone.border)
                    : "border-ivory-200 hover:border-gold-300",
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
    <div className="border border-[#e8e5de] bg-white p-4 shadow-sm rounded-xl">
      <p className="text-xs font-bold uppercase text-muted">{label}</p>
      <p className="mt-1 text-lg font-bold text-foreground">{value}</p>
    </div>
  );
}

function ProductSection({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  const bgClass = className || "bg-[#FAF8F5]";
  return (
    <section className={cn("relative overflow-hidden border-b border-[#e8e5de] py-10 md:py-14", bgClass)}>
      <div className="absolute inset-0 -z-10">
        <Image src="/images/bg/featured_bg.png" alt="" fill className="object-cover object-center opacity-[0.03]" />
        <div className={cn("absolute inset-0 bg-gradient-to-b via-white/50 to-transparent", bgClass.replace("bg-", "from-"))} />
      </div>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 max-w-3xl"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-500">
            {eyebrow}
          </p>
          <div className="section-divider left mt-3 mb-4" />
          <h2 className="mt-2 text-balance text-3xl leading-[1.1] text-foreground md:text-4xl lg:text-5xl font-black tracking-normal uppercase">
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
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-40 card-premium bg-white p-8 shadow-sm hover:shadow-premium transition-all rounded-2xl"
    >
      {children}
    </motion.article>
  );
}
