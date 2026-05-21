"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
};

export function AnimatedCounter({ value, suffix = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);
  const [started, setStarted] = useState(false);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    if (inView || isMobile) {
      setStarted(true);
      const controls = animate(motionValue, value, {
        duration: 1.4,
        ease: [0.22, 1, 0.36, 1],
      });

      return controls.stop;
    }
  }, [inView, motionValue, value, mounted]);

  // Server-side and initial client hydration pass render identical static values.
  // This prevents hydration mismatches.
  // We also show static values until the animation actually triggers to prevent jumping.
  if (!mounted || !started) {
    return (
      <span>
        {value}
        {suffix}
      </span>
    );
  }

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
