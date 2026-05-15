"use client";

import {
  BadgeCheck,
  Dumbbell,
  Flame,
  HeartPulse,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { HomeSectionHeading } from "@/components/home/home-section-heading";
import { SectionReveal } from "@/components/home/section-reveal";

const features = [
  { title: "Premium Ingredients", icon: Sparkles },
  { title: "Added Creatine", icon: Flame },
  { title: "Recovery Support", icon: HeartPulse },
  { title: "Muscle Growth", icon: Dumbbell },
  { title: "Athlete Focused", icon: BadgeCheck },
  { title: "Authentic Formulas", icon: ShieldCheck },
];

export function WhyChooseSection() {
  return (
    <section className="border-y border-white/10 bg-[linear-gradient(180deg,#0b0b0d,#050505)] py-16 md:py-24">
      <div className="container">
        <SectionReveal>
          <HomeSectionHeading
            eyebrow="Why Choose Kyrox"
            title="Engineered For Performance"
            description="Every product touchpoint is designed to feel powerful, premium, and focused on measurable athletic progress."
            align="center"
          />
        </SectionReveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <SectionReveal key={feature.title} delay={index * 0.05}>
                <motion.article
                  whileHover={{ y: -6, borderColor: "rgba(38,217,255,0.42)" }}
                  className="group border border-white/10 bg-white/[0.03] p-6"
                >
                  <div className="grid h-12 w-12 place-items-center border border-silver-300/25 bg-white/[0.04] text-electric-300 transition-colors duration-300 group-hover:border-electric-300/50">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="mt-6 text-3xl text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-500">
                    Built into a brand system ready for premium ecommerce,
                    education, and conversion.
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
