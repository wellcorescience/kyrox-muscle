import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Disclaimer | Kyrox Muscle",
  description: "Health and medical disclaimer for Kyrox Muscle products.",
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-12 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 text-electric-400 mb-4 font-bold uppercase tracking-wider text-sm">
            <ShieldCheck size={18} /> Kyrox Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">Disclaimer</h1>
          <p className="text-zinc-500 mt-4">Last Updated: May 2026</p>
        </div>

        <div className="space-y-8 text-zinc-300 leading-relaxed text-lg">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Health and Medical Disclaimer</h2>
            <div className="p-6 border border-white/20 bg-white/[0.02] text-zinc-400 space-y-4">
              <p>
                <strong>The products and claims made about specific products on or through this Site have not been evaluated by the Food and Drug Administration (FDA) or the Food Safety and Standards Authority of India (FSSAI) and are not intended to diagnose, treat, cure or prevent disease.</strong>
              </p>
              <p>
                The information provided on this site is for informational purposes only and is not intended as a substitute for advice from your physician or other health care professional or any information contained on or in any product label or packaging. 
              </p>
              <p>
                You should not use the information on this site for diagnosis or treatment of any health problem or for prescription of any medication or other treatment. You should consult with a healthcare professional before starting any diet, exercise or supplementation program, before taking any medication, or if you have or suspect you might have a health problem.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Fitness & Nutrition Disclaimer</h2>
            <p>
              Kyrox Muscle products are formulated for healthy adults engaged in an intense physical training program. The results obtained from using our supplements will vary from person to person depending on age, health status, nutrition, and training regiment. We do not guarantee specific results.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-zinc-400">
              <li>Do not exceed the recommended daily serving.</li>
              <li>Keep out of reach of children.</li>
              <li>Not for medicinal use.</li>
              <li>Pregnant or lactating women, and individuals with known medical conditions should consult a healthcare professional before use.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
