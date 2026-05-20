"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShieldCheck, X } from "lucide-react";
import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="bg-carbon-900/86 sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl">
      <nav className="container flex h-20 items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="Kyrox Muscle home"
        >
          <span className="grid h-11 w-11 place-items-center border border-metal-300/40 bg-white/[0.03] text-xl font-semibold text-metal-200 shadow-inner-metal">
            K
          </span>
          <span className="leading-none">
            <span className="block font-heading text-3xl text-white">
              Kyrox
            </span>
            <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-metal-200">
              Muscle
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {siteConfig.navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-zinc-300 hover:text-white",
                  isActive && "text-metal-200",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <Link
          href="/verify"
          className="hidden items-center gap-2 border border-metal-300/40 bg-metal-200 px-4 py-3 text-sm font-bold uppercase tracking-[0.14em] text-black shadow-glow hover:bg-white lg:flex"
        >
          <ShieldCheck className="h-4 w-4" aria-hidden />
          Verify
        </Link>

        <details className="group lg:hidden">
          <summary className="border-white/12 grid h-11 w-11 cursor-pointer list-none place-items-center border bg-white/[0.04] text-white [&::-webkit-details-marker]:hidden">
            <Menu className="h-5 w-5 group-open:hidden" aria-hidden />
            <X className="hidden h-5 w-5 group-open:block" aria-hidden />
            <span className="sr-only">Toggle navigation menu</span>
          </summary>

          <div className="absolute left-0 right-0 top-20 z-50 border-b border-white/10 bg-[#050505] p-4 shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
            <div className="container grid gap-2 p-0">
              {siteConfig.navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "border border-white/10 bg-white/[0.03] px-4 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-200",
                      isActive && "border-metal-300/50 text-metal-200",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </details>
      </nav>
    </header>
  );
}
