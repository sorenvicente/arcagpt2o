import { FeatureCard } from "./FeatureCard";

export const FeaturesGrid = () => {
  const features = [
    {
      icon: "brain" as const,
      title: "Propósito & Método",
      description: "Desenvolva sua missão e metodologia única com ajuda da IA. Crie uma base sólida para seu negócio digital."
    },
    {
      icon: "book" as const,
      title: "Mentoria & Curso",
      description: "Estruture programas de mentoria e cursos transformadores. Nossa IA ajuda a criar conteúdo educacional impactante."
    },
    {
      icon: "rocket" as const,
      title: "Conteúdo & Oferta",
      description: "Gere conteúdo persuasivo e ofertas irresistíveis automaticamente. Aumente suas vendas com copy otimizada por IA."
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 mb-24">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  );
};