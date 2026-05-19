"use client";

import {
  Dumbbell,
  Flame,
  HeartPulse,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { HomeSectionHeading } from "@/components/home/home-section-heading";
import { SectionReveal } from "@/components/home/section-reveal";

const features = [
  { title: "Muscle Growth", icon: Dumbbell, desc: "Scientifically dosed formulas to maximize hypertrophy and lean mass gains during intense training cycles." },
  { title: "Weight Gain", icon: Flame, desc: "Calorie-dense mass gainers engineered for hardgainers who need serious surplus to pack on size." },
  { title: "Recovery Support", icon: HeartPulse, desc: "Fast-absorbing protein blends with amino acid profiles optimized for post-workout muscle repair." },
  { title: "Premium Ingredients", icon: Sparkles, desc: "No fillers, no proprietary blends. Every ingredient is transparently dosed and sourced for purity." },
];

export function WhyChooseSection() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 py-16 md:py-24">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/bg/athlete_bg.png"
          alt=""
          fill
          className="object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
      </div>

      <div className="container">
        <SectionReveal>
          <HomeSectionHeading
            eyebrow="Why Choose Kyrox"
            title="Engineered For Performance"
            description="Every product is designed to feel powerful, premium, and focused on measurable athletic progress."
            align="center"
          />
        </SectionReveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <SectionReveal key={feature.title} delay={index * 0.05}>
                <motion.article
                  whileHover={{ y: -6, borderColor: "rgba(38,217,255,0.42)" }}
                  className="group border border-white/10 bg-black/40 backdrop-blur-sm p-6 h-full"
                >
                  <div className="grid h-14 w-14 place-items-center border border-electric-300/25 bg-electric-500/10 text-electric-300 transition-colors duration-300 group-hover:border-electric-300/50 group-hover:bg-electric-500/20">
                    <Icon className="h-7 w-7" aria-hidden />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {feature.desc}
                  </p>
                </motion.article>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
