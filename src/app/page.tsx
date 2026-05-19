import { BrandStorySection } from "@/components/home/brand-story-section";
import { CtaSection } from "@/components/home/cta-section";
import { FeaturedProductsSection } from "@/components/home/featured-products-section";
import { HeroSection } from "@/components/home/hero-section";
import { PerformanceStatsSection } from "@/components/home/performance-stats-section";
import { TrustBarSection } from "@/components/home/trust-bar-section";
import { TrustSection } from "@/components/home/trust-section";
import { WhyChooseSection } from "@/components/home/why-choose-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBarSection />
      <FeaturedProductsSection />
      <WhyChooseSection />
      <PerformanceStatsSection />
      <BrandStorySection />
      <TrustSection />
      <CtaSection />
    </>
  );
}
