import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/ui/page-shell";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Kyrox Muscle for support, wholesale, and product questions.",
};

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Support"
      title="Questions, partnerships, and product support."
      description="A clean contact route ready to connect with CRM, email, or Supabase-backed lead capture."
    >
      <form className="grid max-w-2xl gap-4">
        <input
          name="name"
          placeholder="Name"
          className="border border-white/10 bg-black px-4 py-4 text-white outline-none placeholder:text-zinc-600 focus:border-metal-300"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border border-white/10 bg-black px-4 py-4 text-white outline-none placeholder:text-zinc-600 focus:border-metal-300"
        />
        <textarea
          name="message"
          placeholder="Message"
          rows={5}
          className="border border-white/10 bg-black px-4 py-4 text-white outline-none placeholder:text-zinc-600 focus:border-metal-300"
        />
        <Button type="button" className="w-full sm:w-fit">
          Send Message
        </Button>
      </form>
    </PageShell>
  );
}
