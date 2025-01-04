import { HeroSection } from "@/components/sales/HeroSection";
import { FeaturesGrid } from "@/components/sales/FeaturesGrid";
import { PricingSection } from "@/components/sales/PricingSection";
import { CTASection } from "@/components/sales/CTASection";

const SalesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F1A] to-[#1A1A2E] overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <HeroSection />
        <FeaturesGrid />
        <PricingSection />
        <CTASection />
      </div>
    </div>
  );
};

export default SalesPage;