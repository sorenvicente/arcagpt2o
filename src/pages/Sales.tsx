import { HeroSection } from "@/components/sales/HeroSection";
import { FeaturesGrid } from "@/components/sales/FeaturesGrid";
import { StepsSection } from "@/components/sales/StepsSection";
import { PartnersMarquee } from "@/components/sales/PartnersMarquee";
import { PricingSection } from "@/components/sales/PricingSection";
import { GuaranteeSection } from "@/components/sales/GuaranteeSection";
import { FAQSection } from "@/components/sales/FAQSection";
import { CTASection } from "@/components/sales/CTASection";

const SalesPage = () => {
  return (
    <div className="min-h-screen bg-[#151522] overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <HeroSection />
        <FeaturesGrid />
        <StepsSection />
        <PartnersMarquee />
        <PricingSection />
        <GuaranteeSection />
        <FAQSection />
        <CTASection />
      </div>
    </div>
  );
};

export default SalesPage;