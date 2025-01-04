import { HeroSection } from "@/components/sales/HeroSection";
import { FeaturesGrid } from "@/components/sales/FeaturesGrid";
import { PricingSection } from "@/components/sales/PricingSection";
import { CTASection } from "@/components/sales/CTASection";

const SalesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-chatgpt-main to-chatgpt-secondary">
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