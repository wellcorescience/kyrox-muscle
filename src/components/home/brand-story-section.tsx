"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HomeSectionHeading } from "@/components/home/home-section-heading";
import { SectionReveal } from "@/components/home/section-reveal";

export function BrandStorySection() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 py-16 md:py-24">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/bg/athlete_bg.png"
          alt=""
          fill
          className="object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
      </div>

      <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
        <SectionReveal>
          <HomeSectionHeading
            eyebrow="Brand Story"
            title="The Kyrox Philosophy"
            description="Kyrox Muscle was built for athletes and lifters committed to pushing beyond limits. Every formula is engineered to support strength, recovery, and consistent physical progress."
          >
            <div className="mt-6 space-y-4 text-sm leading-7 text-zinc-400">
              <p>
                We don&apos;t believe in shortcuts. Every scoop of Kyrox is designed with 
                transparent dosing, premium raw materials, and a relentless focus on 
                results you can feel in every rep.
              </p>
              <p>
                From the gym floor to the lab — Kyrox Muscle is where science meets 
                the iron. Train heavy. Recover fully. Grow relentlessly.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/#featured"
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white hover:border-electric-300/60 transition-colors"
              >
                Explore Products
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </HomeSectionHeading>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <div className="relative min-h-[28rem] overflow-hidden border border-white/10">
            <Image
              src="/images/bg/athlete_bg.png"
              alt="Kyrox Muscle athlete training"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
            <div className="absolute left-8 bottom-8 max-w-xs">
              <p className="text-sm font-bold uppercase tracking-wider text-electric-300">
                Train Heavy
              </p>
              <p className="mt-2 text-4xl leading-none text-white font-black">
                Recover Fully.<br/>Grow Relentlessly.
              </p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
