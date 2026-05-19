import type { Metadata } from "next";
import Image from "next/image";
import { MessageCircle, ShieldCheck, Truck, Headset, Clock, Send, PhoneCall, HelpCircle, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact Kyrox Muscle | Premium Supplement Support",
  description: "Get in touch with Kyrox Muscle for help with orders, authenticity verification, product questions, and customer assistance.",
};

const supportCards = [
  {
    icon: MessageCircle,
    title: "WhatsApp Support",
    desc: "Chat directly with our team for instant assistance.",
    detail: "+91 7015553297",
    action: {
      label: "Chat On WhatsApp",
      href: "https://wa.me/917015553297?text=Hi,%20I%20need%20help%20with%20Kyrox%20Muscle.",
      isWhatsApp: true
    }
  },
  {
    icon: Truck,
    title: "Order Support",
    desc: "Help with Cash on Delivery (COD) orders, shipment tracking, or delivery delays.",
    detail: "orders@kyroxmuscle.com",
    action: {
      label: "Track Orders",
      href: "/#featured"
    }
  },
  {
    icon: ShieldCheck,
    title: "Product Verification",
    desc: "Stuck with your scratch code or need verification help? Contact us immediately.",
    detail: "verification@kyroxmuscle.com",
    action: {
      label: "Verify Product",
      href: "/verify"
    }
  },
  {
    icon: Headset,
    title: "Customer Assistance",
    desc: "General queries, wholesale options, partnership plans, or nutritional advice.",
    detail: "support@kyroxmuscle.com",
    action: {
      label: "View Products",
      href: "/shop"
    }
  }
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-white/10 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/bg/hero_bg.png"
            alt=""
            fill
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/85" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
        </div>

        <div className="container max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 border border-electric-300/30 bg-electric-400/[0.08] px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-electric-300 mb-8">
            <Headset className="h-4 w-4" /> 24/7 Support Portal
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight leading-[0.9] mb-6">
            Contact <span className="text-electric-300">Kyrox Muscle</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            We are here to help with orders, authenticity, product support, and customer assistance.
          </p>
        </div>
      </section>

      {/* QUICK SUPPORT STRIP */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/bg/trust_bg.png"
            alt=""
            fill
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/85" />
        </div>
        <div className="container py-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-0 md:divide-x md:divide-white/10">
            {[
              { icon: MessageCircle, label: "Direct WhatsApp Support" },
              { icon: Truck, label: "Order Assistance" },
              { icon: ShieldCheck, label: "Verification Help" },
              { icon: Clock, label: "Fast Response Guaranteed" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center justify-center gap-3 px-4 py-2">
                  <Icon className="h-4 w-4 shrink-0 text-electric-400" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-300">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT OPTIONS SECTION */}
      <section className="py-16 md:py-24 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/bg/featured_bg.png"
            alt=""
            fill
            className="object-cover object-center opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black" />
        </div>

        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2">
            {supportCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="group border border-white/10 bg-black/40 backdrop-blur-sm p-6 hover:border-electric-300/30 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="w-14 h-14 grid place-items-center border border-electric-300/25 bg-electric-500/10 text-electric-300 group-hover:bg-electric-500/20 transition-colors mb-5">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{card.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-4">{card.desc}</p>
                    <p className="text-sm font-mono text-electric-300/80 mb-6">{card.detail}</p>
                  </div>

                  <a
                    href={card.action.href}
                    target={card.action.isWhatsApp ? "_blank" : undefined}
                    rel={card.action.isWhatsApp ? "noopener noreferrer" : undefined}
                    className={`inline-flex min-h-12 items-center justify-center gap-2 border text-sm font-bold uppercase tracking-wider transition-colors py-3 px-6 ${
                      card.action.isWhatsApp
                        ? "border-[#25D366] bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20"
                        : "border-white/15 bg-white/[0.04] text-white hover:border-electric-300/60 hover:bg-white/[0.07]"
                    }`}
                  >
                    {card.action.isWhatsApp && <MessageCircle className="h-4 w-4" />}
                    {card.action.label}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/bg/verify_bg.png"
            alt=""
            fill
            className="object-cover object-center opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
        </div>

        <div className="container max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-wider text-electric-300 mb-3">Enquiry Form</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight">Send Us A Message</h2>
            <p className="text-zinc-400 mt-3 text-sm">Have any direct questions? Fill out the form below and we will get back to you shortly.</p>
          </div>

          <ContactForm />

          <p className="text-center text-xs font-bold text-zinc-500 uppercase tracking-widest mt-6">
            We usually respond quickly on WhatsApp for faster support.
          </p>
        </div>
      </section>
    </div>
  );
}
