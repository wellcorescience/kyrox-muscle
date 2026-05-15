import Link from "next/link";
import { Dumbbell, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/constants/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="surface-line border-t border-white/10 bg-black">
      <div className="container grid gap-10 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center border border-metal-300/40 text-metal-200">
              <Dumbbell className="h-5 w-5" aria-hidden />
            </span>
            <span className="font-heading text-3xl text-white">
              {siteConfig.name}
            </span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-zinc-400">
            Premium supplement ecommerce foundation for verified performance
            products, disciplined training, and future storefront scale.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-metal-200">
            Quick Links
          </h2>
          <div className="mt-4 grid gap-3">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-zinc-400 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-metal-200">
            Legal
          </h2>
          <div className="mt-4 grid gap-3">
            {siteConfig.legalItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-zinc-400 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-3 py-5 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-metal-300" aria-hidden />
            Built for authenticated product verification.
          </p>
        </div>
      </div>
    </footer>
  );
}
