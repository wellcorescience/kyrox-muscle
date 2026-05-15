import type { Metadata } from 'next';
import { VerificationForm } from '@/components/verify/VerificationForm';

export const metadata: Metadata = {
  title: 'Verify Product Authenticity | Kyrox Muscle',
  description: 'Check whether your Kyrox Muscle supplement is authentic and officially verified.',
};

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background visual elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/[0.01] blur-[100px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-4xl relative z-10 text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-500 text-[10px] font-bold tracking-[0.3em] uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
          Secure Verification System
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 leading-tight md:leading-[1.1]">
          VERIFY PRODUCT <br />
          <span className="text-zinc-500">AUTHENTICITY</span>
        </h1>
        
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
          Check whether your Kyrox Muscle supplement is authentic and officially verified. 
          Enter your unique product code below.
        </p>
      </div>

      <VerificationForm />
    </div>
  );
}
