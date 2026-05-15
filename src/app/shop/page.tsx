import type { Metadata } from "next";
import { ShopBrowser } from "@/components/product/shop-browser";

export const metadata: Metadata = {
  title: "Shop Supplements",
  description:
    "Shop Kyrox Muscle premium performance nutrition engineered for strength, recovery, and muscle growth.",
};

export default function ShopPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-white/10 bg-black py-16 md:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_18%,rgba(38,217,255,0.18),transparent_24rem),radial-gradient(circle_at_82%_24%,rgba(217,205,165,0.16),transparent_22rem),linear-gradient(180deg,rgba(255,255,255,0.05),transparent_56%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-electric-300/70 to-transparent" />

        <div className="container">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase text-electric-300">
              Kyrox Muscle Catalog
            </p>
            <h1 className="mt-4 text-balance text-7xl leading-[0.88] text-white md:text-8xl lg:text-9xl">
              SHOP SUPPLEMENTS
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
              Premium performance nutrition engineered for strength, recovery,
              and muscle growth.
            </p>
          </div>
        </div>
      </section>

      <ShopBrowser />
    </>
  );
}
