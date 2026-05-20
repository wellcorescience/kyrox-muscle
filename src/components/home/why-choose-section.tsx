"use client";

import {
  Dumbbell,
  Flame,
  HeartPulse,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

const features = [
  { title: "Muscle Growth", icon: Dumbbell, desc: "Scientifically dosed formulas to maximize hypertrophy and lean mass gains during intense training cycles." },
  { title: "Weight Gain", icon: Flame, desc: "Calorie-dense mass gainers engineered for hardgainers who need serious surplus to pack on size." },
  { title: "Recovery Support", icon: HeartPulse, desc: "Fast-absorbing protein blends with amino acid profiles optimized for post-workout muscle repair." },
  { title: "Premium Ingredients", icon: Sparkles, desc: "No fillers, no proprietary blends. Every ingredient is transparently dosed and sourced for purity." },
];

export function WhyChooseSection() {
  return (
    <section className="relative overflow-hidden border-y border-neutral-900 py-20 md:py-32 bg-[#111111] grain-bg">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/bg/athlete_bg.png"
          alt=""
          fill
          className="object-cover object-center opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/90 via-[#111111]/80 to-[#111111]/95" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-on-scroll">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-400">
            Why Choose Kyrox
          </p>
          <div className="section-divider my-4" />
          <h2 className="mt-3 text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-[#FFFFFF] font-black uppercase tracking-normal">
            Engineered For Performance
          </h2>
          <p className="mt-5 text-base leading-8 text-white/70">
            Every product is designed to feel powerful, premium, and focused on measurable athletic progress.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const delayClass = `animate-delay-${index + 1}`;

            return (
              <div key={feature.title} className={`animate-scale-in ${delayClass} h-full`}>
                <article
                  className="group premium-card bg-white/5 border border-white/10 text-white p-8 h-full rounded-2xl transition-all duration-300"
                >
                  <div className="grid h-14 w-14 place-items-center bg-[rgba(168,147,64,0.1)] text-gold-400 rounded-xl transition-all duration-300 group-hover:-translate-y-1">
                    <Icon className="h-7 w-7" aria-hidden />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/70">
                    {feature.desc}
                  </p>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
