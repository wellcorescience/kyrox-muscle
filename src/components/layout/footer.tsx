import Link from "next/link";
import { Dumbbell, ShieldCheck, Truck, Droplet, Headset } from "lucide-react";
import { siteConfig } from "@/constants/site";

export function Footer() {
  const year = 2026;

  return (
    <footer className="surface-line border-t border-ivory-300 bg-ivory-50 pt-16">
      <div className="container px-4 max-w-7xl mx-auto">
        <div className="mb-16">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center border border-gold-300 bg-gold-50 text-gold-500 shadow-[inset_0_1px_4px_rgba(185,148,28,0.12)]">
              <Dumbbell className="h-5 w-5" aria-hidden />
            </span>
            <span className="font-heading text-3xl font-black tracking-normal leading-[1.1] text-foreground uppercase">
              Kyrox Muscle
            </span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted">
            Premium supplement engineering for verified performance, disciplined training, and massive gains.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 pb-16">
          {/* COLUMN 1 */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-foreground mb-6">
              Shop
            </h2>
            <div className="grid gap-4">
              <Link href="/product/kyrox-mass-gainer" className="text-sm text-muted hover:text-gold-500 transition-colors">Mass Gainer</Link>
              <Link href="/product/kyrox-anabolic-mass-gainer" className="text-sm text-muted hover:text-gold-500 transition-colors">Anabolic Mass Gainer</Link>
              <Link href="/product/kyrox-nitra-whey-protein" className="text-sm text-muted hover:text-gold-500 transition-colors">Nitra Whey Protein</Link>
              <Link href="/shop" className="text-sm text-muted hover:text-gold-500 transition-colors">Shop All</Link>
            </div>
          </div>

          {/* COLUMN 2 */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-foreground mb-6">
              Support
            </h2>
            <div className="grid gap-4">
              <Link href="/contact" className="text-sm text-muted hover:text-gold-500 transition-colors">Contact Us</Link>
              <Link href="/verify" className="text-sm text-muted hover:text-gold-500 transition-colors">Verify Product</Link>
              <Link href="/cart" className="text-sm text-muted hover:text-gold-500 transition-colors">Shopping Cart</Link>
              <Link href="/admin/login" className="text-sm text-muted hover:text-gold-500 transition-colors">Admin Portal</Link>
            </div>
          </div>

          {/* COLUMN 3 */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-foreground mb-6">
              Legal
            </h2>
            <div className="grid gap-4">
              <Link href="/privacy-policy" className="text-sm text-muted hover:text-gold-500 transition-colors">Privacy Policy</Link>
              <Link href="/terms-and-conditions" className="text-sm text-muted hover:text-gold-500 transition-colors">Terms & Conditions</Link>
              <Link href="/refund-policy" className="text-sm text-muted hover:text-gold-500 transition-colors">Refund Policy</Link>
              <Link href="/shipping-policy" className="text-sm text-muted hover:text-gold-500 transition-colors">Shipping Policy</Link>
              <Link href="/disclaimer" className="text-sm text-muted hover:text-gold-500 transition-colors">Disclaimer</Link>
            </div>
          </div>

          {/* COLUMN 4 */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-foreground mb-6">
              Why Kyrox
            </h2>
            <div className="grid gap-4">
              <div className="flex items-center gap-3 text-sm text-muted"><ShieldCheck className="h-4 w-4 text-gold-500" /> Authentic Product Verification</div>
              <div className="flex items-center gap-3 text-sm text-muted"><Truck className="h-4 w-4 text-gold-500" /> COD Available</div>
              <div className="flex items-center gap-3 text-sm text-muted"><Droplet className="h-4 w-4 text-gold-500" /> Premium Ingredients</div>
              <div className="flex items-center gap-3 text-sm text-muted"><Headset className="h-4 w-4 text-gold-500" /> Direct Support</div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="border-t border-ivory-200 py-8">
          <p className="text-xs text-muted/80 text-center max-w-4xl mx-auto leading-relaxed mb-6">
            <strong className="text-muted uppercase tracking-wider block mb-2">Supplement Disclaimer</strong>
            These statements have not been evaluated for medical diagnosis, treatment, cure, or prevention of disease. Use as directed. Consult healthcare professional if needed. Do not exceed the recommended daily serving. Products are not intended to diagnose, treat, cure, or prevent any disease. Results may vary from person to person.
          </p>
          <div className="flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {year} Kyrox Muscle. All rights reserved.
            </p>
            <p className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-gold-500" aria-hidden />
              100% Genuine Products
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
