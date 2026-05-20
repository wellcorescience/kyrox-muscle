import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Refund Policy | Kyrox Muscle",
  description: "Refund and cancellation policy for Kyrox Muscle products.",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-12 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 text-electric-400 mb-4 font-bold uppercase tracking-wider text-sm">
            <ShieldCheck size={18} /> Kyrox Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">Refund Policy</h1>
          <p className="text-zinc-500 mt-4">Last Updated: May 2026</p>
        </div>

        <div className="space-y-8 text-zinc-300 leading-relaxed text-lg">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Return Eligibility</h2>
            <p>
              Due to the consumable nature of our supplements and health products, we do not accept returns once the product seal has been broken or tampered with. To be eligible for a return, the item must be unused, sealed, and in the same condition that you received it. Returns must be initiated within 7 days of delivery.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Damaged or Incorrect Items</h2>
            <p>
              If you receive a defective, damaged, or incorrect item, please contact our support team immediately with an unboxing video and clear photos of the issue. We will arrange a free replacement or initiate a full refund upon verification of the claim.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Refund Process</h2>
            <p>
              Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, the refund will be processed and credited back to your original method of payment within 5-7 business days. For Cash on Delivery (COD) orders, refunds will be provided via bank transfer or store credit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Order Cancellations</h2>
            <p>
              Orders can be cancelled before they are dispatched. Once an order has been handed over to our courier partners (Shipped status), cancellation requests will no longer be accepted. To cancel an order, please contact our support team immediately.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
