"use client";

import {
  ShieldCheck,
  Truck,
  Headset,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

const trustCards = [
  { title: "Authenticity Code On Every Product", desc: "Every Kyrox product ships with a unique verification code. Scan it to confirm you have a genuine, untampered product.", icon: ShieldCheck },
  { title: "Cash On Delivery", desc: "Pay only when your order arrives at your doorstep. Zero risk, full trust. Available across India.", icon: Truck },
  { title: "Direct Brand Support", desc: "Skip the middlemen. Get direct support from our expert team for orders, tracking, and product queries.", icon: Headset },
  { title: "Premium Ingredients", desc: "Transparent labels, no proprietary blends, no fillers. Every ingredient is dosed for real-world athletic performance.", icon: Sparkles },
];

export function TrustSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 border-y border-neutral-900 bg-[#111111] grain-bg z-10">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/bg/trust_bg.png"
          alt=""
          fill
          className="object-cover object-center opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/90 via-[#111111]/80 to-[#111111]/95" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-on-scroll">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-400">
            Trust
          </p>
          <div className="section-divider my-4" />
          <h2 className="mt-3 text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-[#FFFFFF] font-black uppercase tracking-normal">
            Why Buy From Kyrox
          </h2>
          <p className="mt-5 text-base leading-8 text-white/70">
            We built Kyrox Muscle to be the most trustworthy supplement brand in India. Here is why thousands of athletes choose us.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trustCards.map((card, index) => {
            const Icon = card.icon;
            const delayClass = `animate-delay-${index + 1}`;

            return (
              <div key={card.title} className={`animate-scale-in ${delayClass} h-full`}>
                <article
                  className="group premium-card bg-white/5 border border-white/10 text-white p-8 h-full flex flex-col rounded-2xl transition-all duration-300"
                >
                  <div className="grid h-14 w-14 place-items-center bg-[rgba(168,147,64,0.1)] text-gold-400 rounded-xl transition-all duration-300 group-hover:-translate-y-1">
                    <Icon className="h-7 w-7" aria-hidden />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-white leading-tight">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/70 flex-1">
                    {card.desc}
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
