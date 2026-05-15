"use client";

import {
  Activity,
  BatteryCharging,
  Dumbbell,
  PackageCheck,
} from "lucide-react";
import { AnimatedCounter } from "@/components/home/animated-counter";
import { HomeSectionHeading } from "@/components/home/home-section-heading";
import { SectionReveal } from "@/components/home/section-reveal";

const stats = [
  { label: "Protein", value: 30, suffix: "g", icon: Dumbbell },
  { label: "Calories", value: 423, suffix: "", icon: Activity },
  { label: "Servings", value: 57, suffix: "", icon: PackageCheck },
  { label: "Added Creatine", value: 100, suffix: "%", icon: BatteryCharging },
];

export function PerformanceStatsSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(38,217,255,0.1),transparent_28%,rgba(217,205,165,0.1))]" />
      <div className="container">
        <SectionReveal>
          <HomeSectionHeading
            eyebrow="Performance Metrics"
            title="Numbers that sell the formula."
            description="Strong, scan-friendly product proof points give shoppers a fast reason to trust the stack."
          />
        </SectionReveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <SectionReveal key={stat.label} delay={index * 0.06}>
                <article className="border border-white/10 bg-black/50 p-6 shadow-2xl">
                  <Icon className="h-6 w-6 text-electric-300" aria-hidden />
                  <p className="mt-8 font-heading text-6xl leading-none text-white">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-sm font-bold uppercase text-metal-200">
                    {stat.label}
                  </p>
                </article>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
