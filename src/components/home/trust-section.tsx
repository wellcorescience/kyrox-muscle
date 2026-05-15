"use client";

import {
  BadgeCheck,
  PackageCheck,
  ShieldCheck,
  Truck,
  UserCheck,
} from "lucide-react";
import { SectionReveal } from "@/components/home/section-reveal";

const trustBadges = [
  { label: "Premium Quality", icon: BadgeCheck },
  { label: "Authentic Products", icon: ShieldCheck },
  { label: "Athlete Formulated", icon: UserCheck },
  { label: "FSSAI Certified", icon: PackageCheck },
  { label: "Fast Shipping", icon: Truck },
];

export function TrustSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <SectionReveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {trustBadges.map((badge) => {
              const Icon = badge.icon;

              return (
                <div
                  key={badge.label}
                  className="group flex min-h-28 items-center gap-4 border border-white/10 bg-white/[0.03] p-4 hover:border-metal-200/45"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center border border-white/10 text-metal-200 group-hover:text-electric-300">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <p className="font-heading text-2xl leading-none text-white">
                    {badge.label}
                  </p>
                </div>
              );
            })}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
