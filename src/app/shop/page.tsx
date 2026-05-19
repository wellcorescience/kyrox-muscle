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
      <section className="relative isolate overflow-hidden border-b border-white/10 pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/bg/hero_bg.png" alt="" fill className="object-cover object-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/80" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-wider text-electric-300 mb-4">
              Kyrox Muscle Catalog
            </p>
            <h1 className="text-5xl leading-[0.9] text-white md:text-7xl lg:text-8xl font-black uppercase tracking-tight">
              Premium Performance Nutrition
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
              Premium muscle-building supplements built for serious fitness goals.
              Order with Cash on Delivery or directly via WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/bg/trust_bg.png" alt="" fill className="object-cover object-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
        </div>
        <div className="container py-5">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-0 md:divide-x md:divide-white/10">
            {[
              { icon: Truck, label: "Cash on Delivery" },
              { icon: ShieldCheck, label: "Authentic Verification" },
              { icon: Sparkles, label: "Premium Quality" },
              { icon: Headset, label: "Direct Support" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center justify-center gap-2.5 px-4 py-2">
                  <Icon className="h-4 w-4 shrink-0 text-electric-400" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-300">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ShopBrowser />

      {/* URGENCY SECTION */}
      <section className="relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/bg/featured_bg.png" alt="" fill className="object-cover object-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
        </div>
        <div className="container py-16 text-center">
          <div className="inline-flex items-center gap-2 border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-6">
            <Clock className="h-4 w-4" /> Limited Production
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight mb-4">
            Limited Batch Production
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Premium supplements manufactured in limited verified batches to ensure maximum freshness, potency, and quality control on every unit.
          </p>
        </div>
      </section>

      {/* STICKY MOBILE CTA */}
      <div className="fixed bottom-0 inset-x-0 z-50 md:hidden border-t border-[#25D366]/30 bg-black/90 backdrop-blur-lg px-4 py-3">
        <a
          href="https://wa.me/917015553297?text=Hi,%20I%20want%20to%20order%20from%20Kyrox%20Muscle."
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 w-full items-center justify-center gap-2 bg-[#25D366] text-sm font-bold uppercase tracking-[0.16em] text-white shadow-lg"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp Order
        </a>
      </div>
    </>
  );
}
