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
  { icon: Headset, title: "Direct Brand Support", desc: "No middlemen. Chat directly with our team via WhatsApp for orders, tracking, and product questions." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/bg/athlete_bg.png" alt="" fill className="object-cover object-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/80" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
        </div>

        <div className="container max-w-5xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 border border-electric-300/35 bg-electric-400/[0.08] px-3 py-2 text-xs font-bold uppercase tracking-wider text-electric-300 mb-8">
            <Dumbbell className="h-4 w-4" /> Our Story
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight leading-[0.9] mb-6">
            Built For <br />
            <span className="text-electric-300">Serious Athletes.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 max-w-2xl leading-relaxed">
            Kyrox Muscle was born from a single belief: athletes deserve supplements they can trust completely — transparent formulas, verified authenticity, and results you can measure in every training session.
          </p>
        </div>
      </section>

      {/* WHY KYROX EXISTS */}
      <section className="relative overflow-hidden py-16 md:py-24 border-b border-white/10">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/bg/trust_bg.png" alt="" fill className="object-cover object-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
        </div>

        <div className="container max-w-5xl mx-auto px-4">
          <div className="mb-12">
            <p className="text-sm font-bold uppercase tracking-wider text-electric-300 mb-3">The Problem</p>
            <h2 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tight">Why Kyrox Exists</h2>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="space-y-6 text-zinc-300 text-lg leading-relaxed">
              <p>
                The Indian supplement market is flooded with counterfeit products, misleading labels, and brands that prioritize marketing over quality. Athletes have no way to know if what they are consuming is real, safe, or effective.
              </p>
              <p>
                <strong className="text-white">Kyrox Muscle was founded to change that.</strong> We started with a simple question: what if every supplement came with proof of authenticity, transparent ingredient lists, and formulas designed by real sports nutrition scientists?
              </p>
            </div>
            <div className="space-y-6 text-zinc-300 text-lg leading-relaxed">
              <p>
                Our mission is to build the most trusted supplement brand in India — one where every product is verifiable, every formula is evidence-based, and every athlete knows exactly what they are putting in their body.
              </p>
              <div className="border border-electric-300/20 bg-electric-500/[0.05] p-6 mt-4">
                <p className="text-electric-300 font-bold uppercase tracking-wider text-sm mb-2">Our Mission</p>
                <p className="text-white text-xl font-bold leading-snug">
                  &ldquo;To make premium, verified, performance-focused nutrition accessible to every serious athlete in India.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUALITY PROCESS */}
      <section className="relative overflow-hidden py-16 md:py-24 border-b border-white/10">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/bg/featured_bg.png" alt="" fill className="object-cover object-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
        </div>

        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-wider text-electric-300 mb-3">Process</p>
            <h2 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tight">How Kyrox Builds Quality</h2>
            <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">From raw material sourcing to the authentication code on your product — every step is engineered for trust.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {qualitySteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="group border border-white/10 bg-black/40 backdrop-blur-sm p-6 hover:border-electric-300/30 transition-colors">
                  <div className="relative mb-5">
                    <span className="absolute -top-2 -left-2 text-[10px] font-black uppercase tracking-widest bg-electric-500 text-black px-2 py-0.5">0{i + 1}</span>
                    <div className="w-14 h-14 grid place-items-center border border-electric-300/25 bg-electric-500/10 text-electric-300 group-hover:bg-electric-500/20 transition-colors">
                      <Icon className="h-7 w-7" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY TRUST KYROX */}
      <section className="relative overflow-hidden py-16 md:py-24 border-b border-white/10">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/bg/trust_bg.png" alt="" fill className="object-cover object-center opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-wider text-electric-300 mb-3">Trust</p>
            <h2 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tight">Why Trust Kyrox</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trustCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="group border border-white/10 bg-black/50 backdrop-blur-sm p-6 hover:border-electric-300/30 transition-colors">
                  <div className="w-14 h-14 grid place-items-center border border-electric-300/25 bg-electric-500/10 text-electric-300 group-hover:bg-electric-500/20 transition-colors mb-5">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{card.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative overflow-hidden py-20 md:py-28 border-b border-white/10">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/bg/cta_bg.png" alt="" fill className="object-cover object-center" />
          <div className="absolute inset-0 bg-black/60 bg-gradient-to-r from-black/80 via-black/50 to-black/70" />
        </div>

        <div className="container max-w-4xl mx-auto px-4 text-center relative z-10">
          <p className="text-sm font-bold uppercase tracking-wider text-electric-300 mb-4">Start Your Journey</p>
          <h2 className="text-5xl md:text-7xl font-black uppercase text-white tracking-tight mb-6">
            Built For Serious <br />Fitness Goals
          </h2>
          <p className="text-zinc-300 text-lg max-w-2xl mx-auto mb-10">
            Premium performance nutrition engineered for athletes who refuse to compromise. Order now with Cash on Delivery.
          </p>
          <Link
            href="/#featured"
            className="inline-flex min-h-14 items-center justify-center gap-2 border border-electric-400 bg-electric-500 px-10 text-sm font-bold uppercase tracking-[0.16em] text-black shadow-glow hover:bg-white hover:border-white transition-colors"
          >
            Shop Now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* TRUST STRIP BOTTOM */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/bg/trust_bg.png" alt="" fill className="object-cover object-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
        </div>

        <div className="container py-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-0 md:divide-x md:divide-white/10">
            {[
              { icon: Truck, label: "COD Available" },
              { icon: ShieldCheck, label: "Authentic Verification" },
              { icon: Sparkles, label: "Premium Quality" },
              { icon: Headset, label: "Direct Support" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center justify-center gap-3 px-4 py-3">
                  <Icon className="h-5 w-5 shrink-0 text-electric-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
