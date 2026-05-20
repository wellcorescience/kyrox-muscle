"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShieldCheck, X, ShoppingCart } from "lucide-react";
import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handle);
    handle();
    return () => window.removeEventListener("scroll", handle);
  }, []);

  useEffect(() => {
    const updateCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("kyrox_cart") || "[]");
        const totalQty = cart.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0);
        setCartCount(totalQty);
      } catch (e) {
        setCartCount(0);
      }
    };
    updateCount();
    window.addEventListener("kyrox_cart_updated", updateCount);
    window.addEventListener("storage", updateCount);
    return () => {
      window.removeEventListener("kyrox_cart_updated", updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  const isHome = pathname === "/";
  const isTransparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        "navbar-scroll fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300",
        isTransparent
          ? "bg-transparent border-transparent text-white"
          : "bg-white/95 backdrop-blur-md border-[#e8e5de] text-[#1a1a1a]"
      )}
    >
      <nav className="container flex h-20 items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2"
          aria-label="Kyrox Muscle home"
        >
          <span
            className={cn(
              "grid h-11 w-11 place-items-center border text-xl font-semibold shadow-[inset_0_1px_4px_rgba(185,148,28,0.12)] transition-all",
              isTransparent
                ? "border-white/20 bg-white/10 text-white shadow-[inset_0_1px_4px_rgba(255,255,255,0.12)]"
                : "border-gold-300 bg-gold-50 text-gold-500"
            )}
          >
            K
          </span>
          <span className="leading-none">
            <span
              className={cn(
                "block font-heading text-3xl transition-colors",
                isTransparent ? "text-white" : "text-[#1a1a1a]"
              )}
            >
              Kyrox
            </span>
            <span
              className={cn(
                "block text-[0.68rem] font-semibold uppercase tracking-[0.28em] transition-colors",
                isTransparent ? "text-white/80" : "text-[#A89340]"
              )}
            >
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
                  "px-4 py-2 text-sm font-semibold uppercase tracking-[0.1em] transition-colors",
                  isTransparent
                    ? "text-white/80 hover:text-white"
                    : "text-[#555] hover:text-[#1a1a1a]",
                  isActive &&
                    (isTransparent
                      ? "text-white border-b-2 border-white"
                      : "text-[#1a1a1a] border-b-2 border-[#A89340]")
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop Buttons (Verify, Cart, Admin) */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/verify"
            className={cn(
              "items-center gap-2 px-5 py-2.5 text-sm font-bold uppercase tracking-[0.14em] transition-all flex",
              isTransparent
                ? "border border-white/30 bg-transparent text-white hover:bg-white hover:text-[#1a1a1a]"
                : "border border-[#A89340] bg-[#A89340] text-white shadow-glow hover:bg-gold-500 hover:border-gold-500 hover:text-white"
            )}
          >
            <ShieldCheck className="h-4 w-4" aria-hidden />
            Verify
          </Link>

          <Link
            href="/cart"
            className={cn(
              "relative grid place-items-center h-11 w-11 border transition-all rounded-xl",
              isTransparent
                ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
                : "border-[#e8e5de] bg-[#FAF8F5]/50 text-[#1a1a1a] hover:bg-white hover:border-gold-300"
            )}
            aria-label="View shopping cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold-400 text-[10px] font-black text-black shadow-sm border border-white">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            href="/admin/login"
            className={cn(
              "text-xs font-bold uppercase tracking-[0.16em] hover:text-gold-500 transition-colors px-3 py-2",
              isTransparent ? "text-white/60 hover:text-white" : "text-[#A89340] hover:text-gold-500"
            )}
          >
            Admin Access
          </Link>
        </div>

        <details className="group lg:hidden">
          <summary
            className={cn(
              "grid h-11 w-11 cursor-pointer list-none place-items-center border transition-colors [&::-webkit-details-marker]:hidden",
              isTransparent
                ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
                : "border-ivory-200 bg-ivory-100 text-[#1a1a1a] hover:bg-ivory-200"
            )}
          >
            <Menu className="h-5 w-5 group-open:hidden" aria-hidden />
            <X className="hidden h-5 w-5 group-open:block" aria-hidden />
            <span className="sr-only">Toggle navigation menu</span>
          </summary>

          <div
            className={cn(
              "absolute left-0 right-0 top-20 z-50 border-b p-4 shadow-[0_12px_32px_rgba(26,23,20,0.12)]",
              isTransparent
                ? "border-white/10 bg-[#1a1a1a] shadow-[0_12px_32px_rgba(0,0,0,0.5)]"
                : "border-ivory-200 bg-ivory-50"
            )}
          >
            <div className="container grid gap-2.5 p-0">
              {siteConfig.navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] border transition-colors",
                      isTransparent
                        ? "border-white/10 bg-white/5 text-white/80"
                        : "border-ivory-200 bg-ivory-100 text-[#1a1a1a]",
                      isActive &&
                        (isTransparent
                          ? "border-white text-white bg-white/10"
                          : "border-gold-300 text-gold-500 bg-gold-50")
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="border-t border-[#e8e5de]/50 my-2 pt-2" />

              <Link
                href="/verify"
                className={cn(
                  "px-4 py-3.5 text-sm font-bold uppercase tracking-[0.14em] border transition-colors flex items-center gap-2 justify-center",
                  isTransparent
                    ? "border-white/20 bg-white/10 text-gold-400"
                    : "border-gold-300 bg-gold-50 text-gold-600"
                )}
              >
                <ShieldCheck className="h-4 w-4" />
                Verify Authenticity
              </Link>

              <Link
                href="/cart"
                className={cn(
                  "px-4 py-3.5 text-sm font-bold uppercase tracking-[0.14em] border transition-colors flex items-center justify-between",
                  isTransparent
                    ? "border-white/10 bg-white/5 text-white/80"
                    : "border-ivory-200 bg-ivory-100 text-[#1a1a1a]"
                )}
              >
                <span className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Shopping Cart
                </span>
                {cartCount > 0 && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-400 text-[10px] font-black text-black">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link
                href="/admin/login"
                className={cn(
                  "px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] border transition-colors opacity-75 text-center mt-1",
                  isTransparent
                    ? "border-white/5 bg-transparent text-white/50"
                    : "border-transparent bg-transparent text-neutral-500"
                )}
              >
                Admin Access
              </Link>
            </div>
          </div>
        </details>
      </nav>

      {/* Floating Cart Button for Mobile */}
      <Link
        href="/cart"
        className={cn(
          "fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300 active:scale-95 border lg:hidden",
          cartCount > 0 ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none",
          isTransparent
            ? "bg-black border-white/20 text-white"
            : "bg-[#1a1a1a] border-gold-300/40 text-gold-400"
        )}
        aria-label="View shopping cart"
      >
        <ShoppingCart className="h-6 w-6" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gold-400 text-[10px] font-black text-black border-2 border-[#1a1a1a]">
            {cartCount}
          </span>
        )}
      </Link>
    </header>
  );
}
