import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Kyrox Muscle",
  description: "Privacy Policy and data handling practices for Kyrox Muscle.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-12 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 text-electric-400 mb-4 font-bold uppercase tracking-wider text-sm">
            <ShieldCheck size={18} /> Kyrox Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">Privacy Policy</h1>
          <p className="text-zinc-500 mt-4">Last Updated: May 2026</p>
        </div>

        <div className="space-y-8 text-zinc-300 leading-relaxed text-lg">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
            <p>
              At Kyrox Muscle, we are committed to protecting your privacy. We collect personal information when you register an account, place an order, or subscribe to our newsletter. This includes your name, email address, shipping and billing address, and phone number. Payment details are processed securely and not stored on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-400">
              <li>Process and fulfill your orders, including Cash on Delivery (COD) verification.</li>
              <li>Communicate with you regarding order tracking and customer support via WhatsApp.</li>
              <li>Send promotional emails and exclusive offers (you may opt-out at any time).</li>
              <li>Improve our website, product offerings, and overall customer experience.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Data Security</h2>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information. All sensitive data is encrypted via Secure Socket Layer (SSL) technology and securely stored within our database. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Cookies</h2>
            <p>
              Our website uses cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can choose to disable cookies through your browser settings, though some features of our site may not function properly as a result.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Contact Us</h2>
            <p>
              If you have any questions regarding this Privacy Policy, please contact our support team at support@kyroxmuscle.com or via our official WhatsApp support channel.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
