import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, Truck, Headset, Clock, Send, HelpCircle, Mail, CheckCircle2 } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact Kyrox Muscle | Premium Supplement Support",
  description: "Get in touch with Kyrox Muscle for help with orders, authenticity verification, product questions, and customer assistance.",
};

const supportCards = [
  {
    icon: Headset,
    title: "Direct Support",
    desc: "Submit a support ticket directly to our team for quick resolution.",
    detail: "support@kyroxmuscle.com",
    action: {
      label: "Submit Ticket",
      href: "#contact-form"
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
    icon: HelpCircle,
    title: "Customer Assistance",
    desc: "General queries, wholesale options, partnership plans, or nutritional advice.",
    detail: "support@kyroxmuscle.com",
    action: {
      label: "Learn More",
      href: "/about"
    }
  }
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* HERO SECTION (Section 1: Dark) */}
      <section className="relative overflow-hidden border-b border-white/10 pt-32 pb-16 md:pt-40 md:pb-24 bg-[#121212]">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/bg/hero_bg.png"
            alt=""
            fill
            className="object-cover object-center opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-black/85 to-[#121212]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#121212] to-transparent" />
        </div>

        <div className="container max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white mb-8 rounded-full shadow-sm">
            <Headset className="h-4 w-4 text-gold-400" /> 24/7 Support Portal
          </div>
          <div className="section-divider my-3" />
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-normal leading-[1.1] mb-6">
            Contact <span className="text-gold-400">Kyrox Muscle</span>
          </h1>
          <p className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed font-medium">
            We are here to help with orders, authenticity, product support, and customer assistance.
          </p>
        </div>
      </section>

      {/* QUICK SUPPORT STRIP (Section 2: Light) */}
      <section className="relative overflow-hidden border-b border-[#e8e5de] bg-white">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/bg/trust_bg.png"
            alt=""
            fill
            className="object-cover object-center opacity-5"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white" />
        </div>
        <div className="container py-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-0 md:divide-x md:divide-[#e8e5de]">
            {[
              { icon: Send, label: "Direct Support Desk" },
              { icon: Truck, label: "Order Assistance" },
              { icon: ShieldCheck, label: "Verification Help" },
              { icon: Clock, label: "Fast Response Guaranteed" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center justify-center gap-3 px-4 py-2">
                  <Icon className="h-4 w-4 shrink-0 text-gold-500" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#555]">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT OPTIONS SECTION (Section 3: Light Alternating) */}
      <section className="py-20 md:py-28 border-b border-[#e8e5de] relative overflow-hidden bg-[#FAF8F5]">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/bg/featured_bg.png"
            alt=""
            fill
            className="object-cover object-center opacity-5"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5] via-white/80 to-[#FAF8F5]" />
        </div>

        <div className="container max-w-6xl mx-auto px-4">
          <div className="mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A89340] mb-3">Support Channels</p>
            <div className="section-divider left mt-2 mb-4" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase text-[#1a1a1a] tracking-normal leading-[1.1]">How Can We Help?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {supportCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="group border border-[#e8e5de] bg-white p-10 md:p-12 hover:border-gold-300 hover:shadow-premium hover:-translate-y-1 transition-all duration-300 rounded-2xl flex flex-col justify-between h-full shadow-sm card-hover-lift">
                  <div>
                    <div className="w-14 h-14 grid place-items-center border border-gold-300/40 bg-gold-50 text-gold-500 group-hover:bg-gold-100 transition-colors mb-6 rounded-full">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#1a1a1a] mb-4 tracking-normal leading-[1.4]">{card.title}</h3>
                    <p className="text-sm text-muted leading-[1.8] mb-5 font-medium">{card.desc}</p>
                    <p className="text-xs font-mono text-gold-600 mb-8 uppercase tracking-wider">{card.detail}</p>
                  </div>

                  <a
                    href={card.action.href}
                    className="inline-flex min-h-12 items-center justify-center gap-2 border text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-300 py-3 px-6 rounded-xl btn-primary border-neutral-800 bg-transparent text-foreground hover:border-gold-400 hover:text-gold-500 mt-auto"
                  >
                    {card.action.label}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT FORM (Section 4: White Background) */}
      <section id="contact-form" className="py-20 md:py-28 relative overflow-hidden bg-white border-b border-[#e8e5de]">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/bg/verify_bg.png"
            alt=""
            fill
            className="object-cover object-center opacity-5"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
        </div>

        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A89340] mb-3">Direct Support</p>
              <div className="section-divider left mt-2 mb-4" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase text-[#1a1a1a] tracking-normal leading-[1.1] mb-6">Send Us A Message</h2>
              <p className="text-[#444] text-lg leading-relaxed mb-10 font-medium">
                Have any direct questions? Fill out the form and our team will get back to you shortly. For faster support regarding orders or verification, please submit a ticket below or email us.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 grid place-items-center border border-emerald-500/20 bg-emerald-50 text-emerald-600 rounded-full">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1a1a1a] mb-1">Fast Response Time</h4>
                    <p className="text-sm text-muted font-medium">We aim to respond to all inquiries within 24 hours.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 grid place-items-center border border-gold-300/40 bg-gold-50 text-gold-500 rounded-full">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1a1a1a] mb-1">Secure Support</h4>
                    <p className="text-sm text-muted font-medium">Your query is handled securely by our official team.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full">
              <ContactForm />
              <p className="text-center text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-6">
                Your information is securely encrypted.
              </p>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
