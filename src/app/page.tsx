import { BrandStorySection } from "@/components/home/brand-story-section";
import { CtaSection } from "@/components/home/cta-section";
import { FeaturedProductsSection } from "@/components/home/featured-products-section";
import { HeroSection } from "@/components/home/hero-section";
import { PerformanceStatsSection } from "@/components/home/performance-stats-section";
import { TrustSection } from "@/components/home/trust-section";
import { WhyChooseSection } from "@/components/home/why-choose-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProductsSection />
      <WhyChooseSection />
      <PerformanceStatsSection />
      <BrandStorySection />
      <TrustSection />
      <CtaSection />
    </>
  );
}
