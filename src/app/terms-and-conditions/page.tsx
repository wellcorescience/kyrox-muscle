import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Terms and Conditions | Kyrox Muscle",
  description: "Terms and conditions of use for the Kyrox Muscle website.",
};

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-12 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 text-electric-400 mb-4 font-bold uppercase tracking-wider text-sm">
            <ShieldCheck size={18} /> Kyrox Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">Terms & Conditions</h1>
          <p className="text-zinc-500 mt-4">Last Updated: May 2026</p>
        </div>

        <div className="space-y-8 text-zinc-300 leading-relaxed text-lg">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing our website and purchasing products from Kyrox Muscle, you agree to be bound by these Terms and Conditions. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Products and Services</h2>
            <p>
              Kyrox Muscle specializes in premium sports nutrition supplements. We reserve the right to modify or discontinue any product without notice at any time. We have made every effort to display as accurately as possible the colors and images of our products that appear on the store. However, actual product packaging may vary.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Accuracy of Billing and Account Information</h2>
            <p>
              You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store. We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Intellectual Property</h2>
            <p>
              All content included on this site, such as text, graphics, logos, button icons, images, and software, is the property of Kyrox Muscle or its content suppliers and protected by international copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Limitation of Liability</h2>
            <p>
              In no case shall Kyrox Muscle, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind arising from your use of any of the service or any products procured using the service.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
