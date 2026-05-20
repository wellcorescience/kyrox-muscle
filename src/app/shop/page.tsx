import type { Metadata } from "next";
import Image from "next/image";
import { ShopBrowser } from "@/components/product/shop-browser";
import { ShieldCheck, Truck, Sparkles, Headset, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Shop Premium Supplements | Kyrox Muscle",
  description:
    "Shop Kyrox Muscle premium performance nutrition engineered for strength, recovery, and muscle growth. COD available.",
};

export default function ShopPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-ivory-200 pt-32 pb-20 md:pt-40 md:pb-32 bg-ivory-50">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/bg/hero_bg.png" alt="" fill className="object-cover object-center opacity-5" />
          <div className="absolute inset-0 bg-gradient-to-r from-ivory-50 via-white/80 to-ivory-50" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ivory-50 to-transparent" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-wider text-gold-500 mb-4">
              Kyrox Muscle Catalog
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] text-foreground font-black uppercase tracking-normal">
              Premium Performance Nutrition
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
              Premium muscle-building supplements built for serious fitness goals.
              Order with Cash on Delivery.
            </p>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="relative overflow-hidden border-b border-ivory-200 bg-white">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/bg/trust_bg.png" alt="" fill className="object-cover object-center opacity-5" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white" />
        </div>
        <div className="container py-5">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-0 md:divide-x md:divide-ivory-200">
            {[
              { icon: Truck, label: "Cash on Delivery" },
              { icon: ShieldCheck, label: "Authentic Verification" },
              { icon: Sparkles, label: "Premium Quality" },
              { icon: Headset, label: "Direct Support" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center justify-center gap-2.5 px-4 py-2">
                  <Icon className="h-4 w-4 shrink-0 text-gold-500" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ShopBrowser />

      {/* URGENCY SECTION */}
      <section className="relative overflow-hidden border-t border-t border-[#e8e5de] bg-ivory-50">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/bg/featured_bg.png" alt="" fill className="object-cover object-center opacity-[0.03]" />
          <div className="absolute inset-0 bg-gradient-to-b from-ivory-50 via-white/80 to-ivory-50" />
        </div>
        <div className="container py-20 md:py-28 flex flex-col items-center text-center mx-auto max-w-[600px]">
          <div className="inline-flex items-center gap-2 border border-amber-500/20 bg-amber-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-600 mb-6 rounded-full">
            <Clock className="h-4 w-4" /> Limited Production
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase text-[#1a1a1a] tracking-normal leading-[1.1] mb-4">
            Limited Batch Production
          </h2>
          <p className="text-[#555] text-base leading-[1.7]">
            Premium supplements manufactured in limited verified batches to ensure maximum freshness, potency, and quality control on every unit.
          </p>
        </div>
      </section>
    </>
  );
}
