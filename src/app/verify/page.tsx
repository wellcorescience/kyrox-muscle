import type { Metadata } from 'next';
import Image from 'next/image';
import { VerificationForm } from '@/components/verify/VerificationForm';
import { ScanLine, KeyRound, CheckCircle2, ShieldCheck, Lock, Headset } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Verify Product Authenticity | Kyrox Muscle',
  description: 'Check whether your Kyrox Muscle supplement is authentic and officially verified.',
};

const steps = [
  { icon: ScanLine, step: "Step 1", title: "Find Scratch Code", desc: "Locate the scratch panel on your Kyrox product packaging and gently scratch to reveal the unique authentication code." },
  { icon: KeyRound, step: "Step 2", title: "Enter Code", desc: "Type or paste the revealed code into the verification input field below." },
  { icon: CheckCircle2, step: "Step 3", title: "See Verification Result", desc: "Instantly receive confirmation that your product is genuine and officially verified by Kyrox Muscle." },
];

const trustCards = [
  { icon: ShieldCheck, title: "Protect Against Fake Supplements", desc: "Counterfeit supplements can contain harmful substances. Verification ensures you consume only lab-tested, safe products." },
  { icon: Lock, title: "Authenticity Guaranteed", desc: "Every genuine Kyrox product has a unique, one-time-use code that is registered in our secure database at the time of manufacture." },
  { icon: Headset, title: "Direct Brand Support", desc: "If your code is invalid or suspicious, our support team is available to help resolve the issue immediately." },
];

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-ivory-50">
      {/* HERO + VERIFICATION FORM — combined above the fold */}
      <section className="relative overflow-hidden border-b border-ivory-200 min-h-[70vh] flex flex-col justify-center pt-16 pb-12">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/bg/verify_bg.png"
            alt=""
            fill
            className="object-cover object-center opacity-5"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white/95" />
        </div>

        <div className="container max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-emerald-500/20 bg-emerald-50 text-emerald-600 text-[10px] font-bold tracking-[0.3em] uppercase mb-6 shadow-sm rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
            Secure Verification System
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground uppercase tracking-normal mb-4 leading-[1.1]">
            Verify Your <br />
            <span className="text-gold-500">Kyrox Product</span>
          </h1>

          <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Enter your authenticity code to check if your product is genuine.
          </p>

          <VerificationForm />
        </div>
      </section>

      {/* STEPS */}
      <section className="border-b border-ivory-200 py-20 md:py-32 bg-white">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.step} className="relative group card-premium bg-white p-8 text-center shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-300 rounded-2xl">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-400 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                    {s.step}
                  </div>
                  <div className="mt-4 mx-auto w-14 h-14 grid place-items-center border border-gold-300/40 bg-gold-50 text-gold-500 mb-5 rounded-full">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY VERIFY TRUST SECTION */}
      <section className="relative overflow-hidden border-t border-ivory-200 py-20 md:py-32 bg-white">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/bg/trust_bg.png"
            alt=""
            fill
            className="object-cover object-center opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
        </div>

        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-500 mb-3">Trust</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase text-foreground tracking-normal leading-[1.1]">
              Why Verify Your Product
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {trustCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="card-premium bg-ivory-50/50 backdrop-blur-sm p-8 shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-300 rounded-2xl">
                  <div className="w-14 h-14 grid place-items-center border border-gold-300/40 bg-gold-50 text-gold-500 mb-5 rounded-full">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{card.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
