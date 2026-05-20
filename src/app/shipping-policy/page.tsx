import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Shipping Policy | Kyrox Muscle",
  description: "Shipping details and delivery timelines for Kyrox Muscle products.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-12 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 text-electric-400 mb-4 font-bold uppercase tracking-wider text-sm">
            <ShieldCheck size={18} /> Kyrox Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">Shipping Policy</h1>
          <p className="text-zinc-500 mt-4">Last Updated: May 2026</p>
        </div>

        <div className="space-y-8 text-zinc-300 leading-relaxed text-lg">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Order Processing Time</h2>
            <p>
              All orders are processed within 1 to 2 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped, along with a tracking number.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Shipping Rates & Delivery Estimates</h2>
            <p className="mb-4">
              We offer free standard shipping on all prepaid and Cash on Delivery (COD) orders across India.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-400">
              <li><strong>Metro Cities:</strong> 2 to 4 business days</li>
              <li><strong>Rest of India:</strong> 4 to 7 business days</li>
            </ul>
            <p className="mt-4 text-zinc-400 italic text-sm">
              Note: Delivery delays can occasionally occur due to extreme weather conditions, strikes, or high-volume sale periods.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Order Tracking</h2>
            <p>
              Once your order has been dispatched, you will receive a tracking link via email and SMS. You can also track the status of your shipment by contacting our customer support team.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Cash on Delivery (COD)</h2>
            <p>
              We provide Cash on Delivery as a payment option. Please ensure someone is available at the provided shipping address to receive the package and make the cash payment. If a COD order is refused at the time of delivery without valid reason, future COD privileges may be restricted for that account.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
