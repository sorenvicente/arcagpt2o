import { FeatureCard } from "./FeatureCard";

export const FeaturesGrid = () => {
  const features = [
    {
      icon: "brain" as const,
      title: "Propósito & Método",
      description: "Desenvolva sua missão e metodologia única com IA. Crie uma base sólida para seu negócio digital e destaque-se no mercado."
    },
    {
      icon: "book" as const,
      title: "Mentorias & Cursos",
      description: "Estruture programas de mentoria e cursos transformadores. Nossa IA ajuda a criar conteúdo educacional de alto impacto."
    },
    {
      icon: "rocket" as const,
      title: "Marketing & Vendas",
      description: "Gere VSLs, CPLs e páginas de vendas persuasivas. Crie ofertas irresistíveis e conteúdo otimizado automaticamente."
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