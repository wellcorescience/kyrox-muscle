"use client";

import {
  Activity,
  BatteryCharging,
  Dumbbell,
  PackageCheck,
} from "lucide-react";
import { AnimatedCounter } from "@/components/home/animated-counter";
import { HomeSectionHeading } from "@/components/home/home-section-heading";

const stats = [
  { label: "Protein", value: 30, suffix: "g", icon: Dumbbell },
  { label: "Calories", value: 423, suffix: "", icon: Activity },
  { label: "Servings", value: 57, suffix: "", icon: PackageCheck },
  { label: "Added Creatine", value: 100, suffix: "%", icon: BatteryCharging },
];

export function PerformanceStatsSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 border-b border-[#E8E5DE] bg-[#F8F4EE]">
      <div className="container">
        <div className="animate-on-scroll">
          <HomeSectionHeading
            eyebrow="Performance Metrics"
            eyebrowClassName="text-[#A89340]"
            title="Numbers that sell the formula."
            titleClassName="text-neutral-900"
            description="Strong, scan-friendly product proof points give shoppers a fast reason to trust the stack."
            descriptionClassName="text-neutral-600"
          />
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const delayClass = `animate-delay-${index + 1}`;

            return (
              <div key={stat.label} className={`animate-scale-in ${delayClass} h-full`}>
                <article className="premium-card bg-white border border-[#E8E5DE] p-8 h-full rounded-2xl transition-all duration-300">
                  <Icon className="h-6 w-6 text-[#A89340]" aria-hidden />
                  <p className="mt-8 font-heading text-5xl sm:text-6xl leading-none tracking-normal text-neutral-900 stat-number">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                    {stat.label}
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
