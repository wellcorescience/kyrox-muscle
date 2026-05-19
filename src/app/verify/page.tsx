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
  { icon: Headset, title: "Direct Brand Support", desc: "If your code is invalid or suspicious, our support team is available 24/7 via WhatsApp to resolve the issue immediately." },
];

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10 pt-32 pb-20">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/bg/verify_bg.png"
            alt=""
            fill
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
        </div>

        <div className="container max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            Secure Verification System
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight mb-4">
            Verify Your <br />
            <span className="text-electric-300">Kyrox Product</span>
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
            Enter your authenticity code to check if your product is genuine.
          </p>
        </div>
      </section>

      {/* STEPS */}
      <section className="border-b border-white/10 py-16">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.step} className="relative group border border-white/10 bg-white/[0.02] p-6 text-center">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-electric-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1">
                    {s.step}
                  </div>
                  <div className="mt-4 mx-auto w-14 h-14 grid place-items-center border border-electric-300/25 bg-electric-500/10 text-electric-300 mb-5">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* VERIFICATION FORM */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/bg/verify_bg.png"
            alt=""
            fill
            className="object-cover object-center opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        </div>

        <div className="container max-w-4xl mx-auto px-4">
          <VerificationForm />
        </div>
      </section>

      {/* WHY VERIFY TRUST SECTION */}
      <section className="relative overflow-hidden border-t border-white/10 py-16 md:py-24">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/bg/trust_bg.png"
            alt=""
            fill
            className="object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
        </div>

        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-wider text-electric-300 mb-3">Trust</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
              Why Verify Your Product
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {trustCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="border border-white/10 bg-black/50 backdrop-blur-sm p-6">
                  <div className="w-14 h-14 grid place-items-center border border-electric-300/25 bg-electric-500/10 text-electric-300 mb-5">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
