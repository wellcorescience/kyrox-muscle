"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Truck, Headset, ScanLine } from "lucide-react";
import Image from "next/image";

const trustItems = [
  { icon: ShieldCheck, label: "100% Authentic Products" },
  { icon: Truck, label: "Cash on Delivery Across India" },
  { icon: Headset, label: "Direct Brand Support" },
  { icon: ScanLine, label: "Product Verification System" },
];

export function TrustBarSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/bg/trust_bg.png"
          alt=""
          fill
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
      </div>

      <div className="container py-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-0 md:divide-x md:divide-white/10">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-center gap-3 px-4 py-3"
            >
              <item.icon className="h-5 w-5 shrink-0 text-electric-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
