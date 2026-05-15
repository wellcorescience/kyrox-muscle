"use client";

import { ArrowRight } from "lucide-react";
import { HomeSectionHeading } from "@/components/home/home-section-heading";
import { SectionReveal } from "@/components/home/section-reveal";
import { LinkButton } from "@/components/ui/button";

export function BrandStorySection() {
  return (
    <section className="border-y border-white/10 bg-carbon-800/80 py-16 md:py-24">
      <div className="container grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <SectionReveal>
          <HomeSectionHeading
            eyebrow="Brand Story"
            title="The Kyrox Philosophy"
            description="Kyrox Muscle was built for athletes and lifters committed to pushing beyond limits. Every formula is engineered to support strength, recovery, and consistent physical progress."
          >
            <div className="mt-8">
              <LinkButton href="/about" variant="secondary">
                Explore The Brand
                <ArrowRight className="h-4 w-4" aria-hidden />
              </LinkButton>
            </div>
          </HomeSectionHeading>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <div className="relative min-h-[28rem] overflow-hidden border border-white/10 bg-black">
            <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(255,255,255,0.08),transparent_34%),radial-gradient(circle_at_70%_28%,rgba(38,217,255,0.16),transparent_20rem)]" />
            <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-[linear-gradient(160deg,rgba(255,255,255,0.12)_0_1px,transparent_1px_100%)] bg-[length:44px_44px] opacity-25" />
            <div className="absolute bottom-0 left-[9%] h-[72%] w-[26%] border-x border-t border-silver-200/25 bg-white/[0.03]" />
            <div className="absolute bottom-0 left-[42%] h-[88%] w-[16%] border-x border-t border-electric-300/30 bg-electric-400/[0.04]" />
            <div className="absolute bottom-0 right-[10%] h-[60%] w-[30%] border-x border-t border-metal-200/30 bg-metal-200/[0.04]" />
            <div className="absolute left-8 top-8 max-w-xs">
              <p className="text-sm font-bold uppercase text-electric-300">
                Gym / Lifestyle Visual
              </p>
              <p className="mt-2 text-4xl leading-none text-white">
                Train Heavy. Recover Fully.
              </p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
