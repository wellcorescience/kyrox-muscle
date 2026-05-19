"use client";

import {
  ShieldCheck,
  Truck,
  Headset,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HomeSectionHeading } from "@/components/home/home-section-heading";
import { SectionReveal } from "@/components/home/section-reveal";

const trustCards = [
  { title: "Authenticity Code On Every Product", desc: "Every Kyrox product ships with a unique verification code. Scan it to confirm you have a genuine, untampered product.", icon: ShieldCheck },
  { title: "Cash On Delivery", desc: "Pay only when your order arrives at your doorstep. Zero risk, full trust. Available across India.", icon: Truck },
  { title: "Direct Brand Support", desc: "Skip the middlemen. Chat directly with our team on WhatsApp for orders, tracking, and any product queries.", icon: Headset },
  { title: "Premium Ingredients", desc: "Transparent labels, no proprietary blends, no fillers. Every ingredient is dosed for real-world athletic performance.", icon: Sparkles },
];

export function TrustSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 border-y border-white/10">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/bg/trust_bg.png"
          alt=""
          fill
          className="object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      <div className="container">
        <SectionReveal>
          <HomeSectionHeading
            eyebrow="Trust"
            title="Why Buy From Kyrox"
            description="We built Kyrox Muscle to be the most trustworthy supplement brand in India. Here is why thousands of athletes choose us."
            align="center"
          />
        </SectionReveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trustCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <SectionReveal key={card.title} delay={index * 0.06}>
                <motion.div
                  whileHover={{ y: -6, borderColor: "rgba(38,217,255,0.4)" }}
                  className="group border border-white/10 bg-black/50 backdrop-blur-sm p-6 h-full flex flex-col"
                >
                  <div className="grid h-14 w-14 place-items-center border border-electric-300/25 bg-electric-500/10 text-electric-300 transition-all duration-300 group-hover:border-electric-300/50 group-hover:bg-electric-500/20 group-hover:scale-110">
                    <Icon className="h-7 w-7" aria-hidden />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-white leading-tight">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400 flex-1">
                    {card.desc}
                  </p>
                </motion.div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
