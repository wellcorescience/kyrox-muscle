import { VerificationForm } from '@/components/verify/VerificationForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Verification | Kyrox Muscle',
  description: 'Auto-verifying your Kyrox Muscle supplement.',
};

export default async function VerifyCodePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-4xl relative z-10 text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4 leading-tight">
          AUTOMATIC <br />
          <span className="text-zinc-500">VERIFICATION</span>
        </h1>
        <p className="text-zinc-400">Verifying code: <span className="font-mono text-white">{code.toUpperCase()}</span></p>
      </div>

      <VerificationForm initialCode={code} />
    </div>
  );
}
