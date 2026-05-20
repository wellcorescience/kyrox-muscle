"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HomeSectionHeading } from "@/components/home/home-section-heading";

export function BrandStorySection() {
  return (
    <section className="relative overflow-hidden border-b border-[#E8E5DE] py-20 md:py-32 bg-white">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/bg/athlete_bg.png"
          alt=""
          fill
          className="object-cover object-center opacity-[0.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-white" />
      </div>

      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="animate-from-left">
          <HomeSectionHeading
            eyebrow="Brand Story"
            eyebrowClassName="text-[#A89340]"
            title="The Kyrox Philosophy"
            titleClassName="text-neutral-900"
            description="Kyrox Muscle was built for athletes and lifters committed to pushing beyond limits. Every formula is engineered to support strength, recovery, and consistent physical progress."
            descriptionClassName="text-neutral-500"
          >
            <div className="mt-6 space-y-4 text-base leading-7 text-neutral-700">
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
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#A89340]/40 bg-[#A89340]/5 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#A89340] hover:-translate-y-[1px] hover:shadow-sm hover:bg-[#A89340] hover:text-white transition-all duration-200 rounded-xl"
              >
                Explore Products
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </HomeSectionHeading>
        </div>

        <div className="animate-scale-in">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#E8E5DE] shadow-premium">
            <Image
              src="/images/bg/athlete_workout.png"
              alt="Kyrox Muscle athlete training"
              fill
              className="object-cover object-center scale-105 hover:scale-100 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
            <div className="absolute left-0 bottom-0 p-6 md:p-8 max-w-lg w-full">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/80">
                Train Heavy
              </p>
              <p className="mt-3 text-3xl md:text-4xl leading-[1.1] text-white font-semibold">
                Recover Fully.<br/>Grow Relentlessly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
