const partners = [
  { name: "OpenAI" },
  { name: "Anthropic" },
  { name: "Google" },
  { name: "Meta AI" },
  { name: "Mistral AI" },
  { name: "Cohere" }
];

export const PartnersMarquee = () => {
  return (
    <section className="py-16 overflow-hidden">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-white mb-2">
          Integrado com as Melhores IAs
        </h2>
        <p className="text-gray-400">
          Acesse os modelos mais avançados de IA através de nossa plataforma
        </p>
      </div>

      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="mx-8 flex items-center justify-center h-24"
            >
              <span className="text-xl font-semibold text-white opacity-70 hover:opacity-100 transition-opacity">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};