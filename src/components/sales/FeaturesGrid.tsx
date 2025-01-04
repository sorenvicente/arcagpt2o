import { FeatureCard } from "./FeatureCard";

export const FeaturesGrid = () => {
  const features = [
    {
      icon: "brain" as const,
      title: "Propósito",
      description: "Desenvolva sua missão e visão com IA. Crie uma base sólida para seu negócio digital e destaque-se no mercado."
    },
    {
      icon: "compass" as const,
      title: "Método",
      description: "Estruture sua metodologia única e processos com ajuda da IA. Transforme sua experiência em um sistema replicável."
    },
    {
      icon: "users" as const,
      title: "Mentoria",
      description: "Crie programas de mentoria transformadores. Nossa IA ajuda a estruturar cada etapa do processo."
    },
    {
      icon: "book" as const,
      title: "Cursos",
      description: "Desenvolva cursos de alto impacto. Gere conteúdo educacional otimizado automaticamente com IA."
    },
    {
      icon: "pen-tool" as const,
      title: "Conteúdo",
      description: "Produza VSLs, CPLs e páginas de vendas persuasivas. Gere conteúdo envolvente de forma automática."
    },
    {
      icon: "rocket" as const,
      title: "Ofertas",
      description: "Crie ofertas irresistíveis e funis de vendas otimizados. Maximize suas conversões com ajuda da IA."
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