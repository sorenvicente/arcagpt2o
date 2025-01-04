import { PricingCard } from "./PricingCard";

export const PricingSection = () => {
  const basicFeatures = [
    "Criação de propósito e método",
    "Estruturação de mentoria",
    "Geração de conteúdo básico",
    "Suporte por email"
  ];

  const proFeatures = [
    "Tudo do plano básico",
    "Criação avançada de cursos",
    "Geração ilimitada de conteúdo",
    "Criação de ofertas otimizadas",
    "Páginas de vendas personalizadas",
    "Suporte prioritário 24/7"
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white text-center mb-12">
        Escolha o Plano Ideal para Seu Negócio
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