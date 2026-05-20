import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Truck, Sparkles, Headset, FlaskConical, TestTubeDiagonal, Package, ScanLine, ArrowRight, Dumbbell, Target, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Kyrox Muscle | Premium Performance Supplements",
  description: "Learn about the Kyrox Muscle brand story, our quality process, and why athletes trust us for premium performance supplements.",
};

const qualitySteps = [
  { icon: FlaskConical, title: "Ingredient Selection", desc: "Every raw material is sourced from verified, certified suppliers. We prioritize bioavailability, purity, and potency — no fillers, no shortcuts." },
  { icon: TestTubeDiagonal, title: "Formulation", desc: "Our formulas are developed by sports nutrition experts using evidence-based dosing. Every ingredient is transparently listed — no proprietary blends." },
  { icon: Package, title: "Testing & QC", desc: "Each batch undergoes rigorous third-party lab testing for purity, potency, and heavy metals before it ever reaches your hands." },
  { icon: ScanLine, title: "Packaging & Verification", desc: "Every Kyrox product ships with tamper-evident seals and a unique authentication code so you can verify your product is genuine." },
];

const trustCards = [
  { icon: ShieldCheck, title: "Authenticity Code On Every Product", desc: "Scan and verify every product you purchase. If it is not in our database, it is not genuine." },
  { icon: Sparkles, title: "Premium Ingredients Only", desc: "We use globally sourced, lab-tested raw materials. Zero fillers, zero compromises on quality." },
  { icon: Target, title: "Performance Focused", desc: "Every formula is designed for real athletes pushing real limits — not casual users looking for a quick fix." },
  { icon: Headset, title: "Direct Brand Support", desc: "No middlemen. Connect directly with our customer support team for tracking, questions, and product inquiries." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* HERO (Section 1: Dark) */}
      <section className="relative overflow-hidden border-b border-white/10 pt-32 pb-20 md:pt-40 md:pb-28 bg-[#121212]">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/bg/athlete_bg.png" alt="" fill className="object-cover object-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-black/85 to-[#121212]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#121212] to-transparent" />
        </div>

        <div className="container max-w-5xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-wider text-white mb-8 rounded-full shadow-sm">
            <Dumbbell className="h-4 w-4 text-gold-400" /> Our Story
          </div>
          <div className="section-divider left mt-2 mb-4" />
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-normal leading-[1.1] mb-6">
            Built For <br />
            <span className="text-gold-400">Serious Athletes.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/75 max-w-2xl leading-relaxed font-medium">
            Kyrox Muscle was born from a single belief: athletes deserve supplements they can trust completely — transparent formulas, verified authenticity, and results you can measure in every training session.
          </p>
        </div>
      </section>

      {/* WHY KYROX EXISTS (Section 2: Light) */}
      <section className="relative overflow-hidden py-20 md:py-28 border-b border-[#e8e5de] bg-[#FAF8F5]">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/bg/trust_bg.png" alt="" fill className="object-cover object-center opacity-[0.03]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5] via-white/80 to-[#FAF8F5]" />
        </div>

        <div className="container max-w-5xl mx-auto px-4">
          <div className="mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A89340] mb-3">The Problem</p>
            <div className="section-divider left mt-2 mb-4" />
            <h2 className="text-3xl md:text-5xl font-black uppercase text-[#1a1a1a] tracking-normal leading-[1.1]">Why Kyrox Exists</h2>
          </div>

          <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6 text-[#444] text-base flex flex-col justify-center font-medium">
              <p className="text-base leading-[1.75]">
                The Indian supplement market is flooded with counterfeit products, misleading labels, and brands that prioritize marketing over quality. Athletes have no way to know if what they are consuming is real, safe, or effective.
              </p>
              <p className="text-base leading-[1.75]">
                <strong className="text-[#1a1a1a] font-black">Kyrox Muscle was founded to change that.</strong> We started with a simple question: what if every supplement came with proof of authenticity, transparent ingredient lists, and formulas designed by real sports nutrition scientists?
              </p>
              <p className="text-base leading-[1.75]">
                We are building the most trusted supplement brand in India — one where every product is verifiable, every formula is evidence-based, and every athlete knows exactly what they are putting in their body.
              </p>
            </div>
            <div className="relative overflow-hidden border border-[#A89340]/30 rounded-2xl min-h-[340px] shadow-premium group">
              <Image
                src="/images/bg/luxury_gym.png"
                alt="Kyrox Muscle Premium Gym"
                fill
                className="object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
              <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-end text-white z-10">
                <p className="text-gold-400 font-bold uppercase tracking-[0.15em] text-[11px] mb-4">Our Mission</p>
                <p className="text-white text-xl md:text-2xl font-black leading-[1.4] uppercase">
                  &ldquo;To make premium, verified, performance-focused nutrition accessible to every serious athlete in India.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUALITY PROCESS (Section 3: Dark) */}
      <section className="relative overflow-hidden py-20 md:py-32 border-b border-white/10 bg-[#121212] text-white">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/bg/featured_bg.png" alt="" fill className="object-cover object-center opacity-[0.04]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-black/45 to-[#121212]" />
        </div>

        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-400 mb-3">Process</p>
            <div className="section-divider my-3" />
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-normal leading-[1.1]">How Kyrox Builds Quality</h2>
            <p className="text-white/70 mt-4 max-w-2xl mx-auto font-medium">From raw material sourcing to the authentication code on your product — every step is engineered for trust.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
            {qualitySteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="group flex flex-col h-full border border-white/10 bg-white/5 p-10 hover:shadow-premium hover:-translate-y-1 transition-all shadow-sm rounded-2xl">
                  <div className="relative mb-6 shrink-0">
                    <span className="absolute -top-2 -left-2 text-[10px] font-black uppercase tracking-widest bg-gold-400 text-black px-2 py-0.5 rounded-full shadow-sm z-10">0{i + 1}</span>
                    <div className="w-14 h-14 grid place-items-center border border-white/20 bg-white/10 text-gold-400 group-hover:bg-white/20 transition-colors rounded-full">
                      <Icon className="h-7 w-7" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 leading-[1.4] tracking-normal">{step.title}</h3>
                  <p className="text-sm text-white/70 leading-[1.8] font-medium mt-auto">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY TRUST KYROX (Section 4: Light) */}
      <section className="relative overflow-hidden py-20 md:py-32 border-b border-[#e8e5de] bg-white">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/bg/trust_bg.png" alt="" fill className="object-cover object-center opacity-[0.03]" />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
        </div>

        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A89340] mb-3">Trust</p>
            <div className="section-divider my-3" />
            <h2 className="text-3xl md:text-5xl font-black uppercase text-[#1a1a1a] tracking-normal leading-[1.1]">Why Trust Kyrox</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
            {trustCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="group flex flex-col h-full border border-[#e8e5de] bg-[#FAF8F5]/50 backdrop-blur-sm p-10 hover:shadow-premium hover:-translate-y-1 transition-all shadow-sm rounded-2xl hover:bg-white">
                  <div className="w-14 h-14 grid place-items-center border border-gold-300/40 bg-gold-50 text-gold-500 group-hover:bg-gold-100 transition-colors mb-6 rounded-full shrink-0">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1a1a1a] mb-4 leading-[1.4] tracking-normal">{card.title}</h3>
                  <p className="text-sm text-muted leading-[1.8] font-medium mt-auto">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA BANNER (Section 5: Dark) */}
      <section className="relative overflow-hidden py-20 md:py-32 border-b border-white/10 bg-[#121212]">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/bg/athlete_workout.png" alt="" fill className="object-cover object-center opacity-[0.16] mix-blend-luminosity filter brightness-50 contrast-125" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#121212]/90 to-black/85" />
        </div>

        <div className="container max-w-4xl mx-auto px-4 text-center relative z-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-400 mb-4">Start Your Journey</p>
          <div className="section-divider my-3" />
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase text-white tracking-normal leading-[1.1] mb-6">
            Built For Serious <br />Fitness Goals
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10 font-medium">
            Premium performance nutrition engineered for athletes who refuse to compromise. Order now with Cash on Delivery.
          </p>
          <Link
            href="/#featured"
            className="inline-flex min-h-[3.5rem] items-center justify-center gap-2 border border-gold-400 bg-gold-400 px-10 text-[13px] font-bold uppercase tracking-[0.2em] text-white shadow-glow hover:-translate-y-1 hover:shadow-premium hover:bg-gold-500 hover:border-gold-500 transition-all duration-300 rounded-xl btn-primary"
          >
            Shop Now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* TRUST STRIP BOTTOM (Section 6: Light) */}
      <section className="relative overflow-hidden bg-white py-8 border-b border-[#e8e5de]">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/bg/trust_bg.png" alt="" fill className="object-cover object-center opacity-5" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white" />
        </div>

        <div className="container">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-0 md:divide-x md:divide-[#e8e5de]">
            {[
              { icon: Truck, label: "COD Available" },
              { icon: ShieldCheck, label: "Authentic Verification" },
              { icon: Sparkles, label: "Premium Quality" },
              { icon: Headset, label: "Direct Support" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center justify-center gap-3 px-4 py-3">
                  <Icon className="h-5 w-5 shrink-0 text-gold-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#555]">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
