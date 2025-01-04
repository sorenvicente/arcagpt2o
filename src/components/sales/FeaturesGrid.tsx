import { FeatureCard } from "./FeatureCard";

export const FeaturesGrid = () => {
  const features = [
    {
      title: "Propósito & Método",
      description: "Desenvolva seu propósito claro e método único com ajuda da IA"
    },
    {
      title: "Mentoria & Curso",
      description: "Estruture sua mentoria e crie cursos impactantes de forma inteligente"
    },
    {
      title: "Conteúdo & Oferta",
      description: "Gere conteúdo envolvente e ofertas irresistíveis automaticamente"
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