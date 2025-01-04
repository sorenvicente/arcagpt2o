import { PricingCard } from "./PricingCard";

export const PricingSection = () => {
  const basicFeatures = [
    "Até 1000 interações mensais",
    "3 prompts personalizados",
    "Suporte por email",
    "Análises básicas"
  ];

  const proFeatures = [
    "Interações ilimitadas",
    "Prompts ilimitados",
    "Suporte prioritário 24/7",
    "Análises avançadas",
    "API personalizada",
    "Treinamento exclusivo"
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white text-center mb-12">
        Planos que se Adaptam a Você
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <PricingCard
          title="Plano Básico"
          price="R$ 97"
          features={basicFeatures}
        />
        <PricingCard
          title="Plano Pro"
          price="R$ 197"
          features={proFeatures}
          isPro
        />
      </div>
    </div>
  );
};