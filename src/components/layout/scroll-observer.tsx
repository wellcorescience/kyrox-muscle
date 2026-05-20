"use client";

import { useEffect } from "react";

export function ScrollObserver() {
  useEffect(() => {
    // Intersection Observer for scroll-triggered animations
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

    document
      .querySelectorAll(
        ".animate-on-scroll, .animate-from-left, .animate-scale-in"
      )
      .forEach((el) => observer.observe(el));

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
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}
