import { FeatureCard } from "./FeatureCard";

export const FeaturesGrid = () => {
  const features = [
    {
      title: "Respostas Instantâneas",
      description: "IA avançada que fornece respostas precisas e contextualizadas em segundos"
    },
    {
      title: "Personalização Total",
      description: "Adapte a IA ao seu negócio com prompts e configurações personalizadas"
    },
    {
      title: "Análise Avançada",
      description: "Insights detalhados sobre interações e performance do sistema"
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 mb-16">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  );
};