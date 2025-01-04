import { PricingCard } from "./PricingCard";

export const PricingSection = () => {
  const basicFeatures = [
    "Criação de propósito e método",
    "Estruturação básica de mentoria",
    "Geração de conteúdo limitada",
    "1 VSL e 1 página de vendas por mês",
    "Suporte por email"
  ];

  const proFeatures = [
    "Tudo do plano básico",
    "Criação avançada de cursos",
    "Geração ilimitada de conteúdo",
    "VSLs e páginas de vendas ilimitadas",
    "Criação de CPLs otimizadas",
    "Ofertas personalizadas com IA",
    "Suporte prioritário 24/7"
  ];

  return (
    <div className="max-w-5xl mx-auto mb-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
          Escolha o Plano Ideal
        </h2>
        <p className="text-xl text-gray-300">
          Comece gratuitamente e escale conforme seu negócio cresce
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 px-4">
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