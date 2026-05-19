import Link from "next/link";
import { Dumbbell, ShieldCheck, Truck, Droplet, Headset } from "lucide-react";
import { siteConfig } from "@/constants/site";

export function Footer() {
  const year = 2026;

  return (
    <footer className="surface-line border-t border-white/10 bg-black pt-16">
      <div className="container px-4 max-w-7xl mx-auto">
        <div className="mb-16">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center border border-electric-500/40 text-electric-400 bg-electric-500/10">
              <Dumbbell className="h-5 w-5" aria-hidden />
            </span>
            <span className="font-heading text-3xl font-black tracking-tight text-white uppercase">
              Kyrox Muscle
            </span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-zinc-400">
            Premium supplement engineering for verified performance, disciplined training, and massive gains.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 pb-16">
          {/* COLUMN 1 */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-white mb-6">
              Shop
            </h2>
            <div className="grid gap-4">
              <Link href="/product/kyrox-mass-gainer" className="text-sm text-zinc-400 hover:text-electric-300 transition-colors">Mass Gainer</Link>
              <Link href="/product/kyrox-anabolic-mass-gainer" className="text-sm text-zinc-400 hover:text-electric-300 transition-colors">Anabolic Mass Gainer</Link>
              <Link href="/product/kyrox-nitra-whey-protein" className="text-sm text-zinc-400 hover:text-electric-300 transition-colors">Nitra Whey Protein</Link>
              <Link href="/" className="text-sm text-zinc-400 hover:text-electric-300 transition-colors">Shop All</Link>
            </div>
          </div>

          {/* COLUMN 2 */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-white mb-6">
              Support
            </h2>
            <div className="grid gap-4">
              <Link href="#" className="text-sm text-zinc-400 hover:text-electric-300 transition-colors">Contact Us</Link>
              <a href="https://wa.me/917015553297" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 hover:text-[#25D366] transition-colors">Order on WhatsApp</a>
              <Link href="/verify" className="text-sm text-zinc-400 hover:text-electric-300 transition-colors">Verify Product</Link>
              <Link href="#" className="text-sm text-zinc-400 hover:text-electric-300 transition-colors">Track Order</Link>
            </div>
          </div>

          {/* COLUMN 3 */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-white mb-6">
              Legal
            </h2>
            <div className="grid gap-4">
              <Link href="/privacy-policy" className="text-sm text-zinc-400 hover:text-electric-300 transition-colors">Privacy Policy</Link>
              <Link href="/terms-and-conditions" className="text-sm text-zinc-400 hover:text-electric-300 transition-colors">Terms & Conditions</Link>
              <Link href="/refund-policy" className="text-sm text-zinc-400 hover:text-electric-300 transition-colors">Refund Policy</Link>
              <Link href="/shipping-policy" className="text-sm text-zinc-400 hover:text-electric-300 transition-colors">Shipping Policy</Link>
              <Link href="/disclaimer" className="text-sm text-zinc-400 hover:text-electric-300 transition-colors">Disclaimer</Link>
            </div>
          </div>

          {/* COLUMN 4 */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-white mb-6">
              Why Kyrox
            </h2>
            <div className="grid gap-4">
              <div className="flex items-center gap-3 text-sm text-zinc-400"><ShieldCheck className="h-4 w-4 text-electric-400" /> Authentic Product Verification</div>
              <div className="flex items-center gap-3 text-sm text-zinc-400"><Truck className="h-4 w-4 text-electric-400" /> COD Available</div>
              <div className="flex items-center gap-3 text-sm text-zinc-400"><Droplet className="h-4 w-4 text-electric-400" /> Premium Ingredients</div>
              <div className="flex items-center gap-3 text-sm text-zinc-400"><Headset className="h-4 w-4 text-electric-400" /> Direct Support</div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="border-t border-white/10 py-8">
          <p className="text-xs text-zinc-500 text-center max-w-4xl mx-auto leading-relaxed mb-6">
            <strong className="text-zinc-400 uppercase tracking-wider block mb-2">Supplement Disclaimer</strong>
            These statements have not been evaluated for medical diagnosis, treatment, cure, or prevention of disease. Use as directed. Consult healthcare professional if needed. Do not exceed the recommended daily serving. Products are not intended to diagnose, treat, cure, or prevent any disease. Results may vary from person to person.
          </p>
          <div className="flex flex-col gap-3 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {year} Kyrox Muscle. All rights reserved.
            </p>
            <p className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-electric-400" aria-hidden />
              100% Genuine Products
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
