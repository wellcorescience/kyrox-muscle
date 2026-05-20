"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollObserver() {
  const pathname = usePathname();

  useEffect(() => {
    let cleanupObserver = () => {};

    // Wait for Next.js to complete page client-side mounting
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
            }
          });
        },
        { threshold: 0.12 }
      );

      const elements = document.querySelectorAll(
        ".animate-on-scroll, .animate-from-left, .animate-scale-in"
      );

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const inViewport = rect.top < (window.innerHeight || document.documentElement.clientHeight);
        
        if (inViewport && rect.bottom > 0) {
          // If the element is already above the fold, display it immediately
          el.classList.add("is-visible");
        } else {
          // Otherwise, observe it for scroll entry
          observer.observe(el);
        }
      });

      cleanupObserver = () => observer.disconnect();
    }, 50);

    // Navbar scroll effect
    const handleScroll = () => {
      const nav = document.querySelector(".navbar-scroll");
      if (window.scrollY > 40) {
        nav?.classList.add("scrolled");
      } else {
        nav?.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => {
      clearTimeout(timer);
      cleanupObserver();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return null;
}
