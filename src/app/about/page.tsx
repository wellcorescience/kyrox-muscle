import type { Metadata } from "next";
import { PageShell } from "@/components/ui/page-shell";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about the Kyrox Muscle performance supplement brand.",
};

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="Brand"
      title="Cinematic fitness energy with a quality-first backbone."
      description="Kyrox Muscle is positioned for a premium supplement experience that pairs disciplined brand storytelling with transparent product trust."
    />
  );
}
