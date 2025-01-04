const partners = [
  {
    name: "OpenAI",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg"
  },
  {
    name: "Anthropic",
    logo: "https://avatars.githubusercontent.com/u/51382740?s=200&v=4"
  },
  {
    name: "Google",
    logo: "https://www.gstatic.com/lamda/images/favicon_v1_150160cddff7f294ce30.svg"
  },
  {
    name: "Meta AI",
    logo: "https://ai.meta.com/images/meta-logo.png"
  },
  {
    name: "Mistral AI",
    logo: "https://mistral.ai/images/logo-light.svg"
  },
  {
    name: "Cohere",
    logo: "https://assets-global.website-files.com/64f6f2c0e3f4c5a91c1543c5/64f6f2c0e3f4c5a91c1543ee_cohere%20logo.svg"
  }
];

export const PartnersMarquee = () => {
  return (
    <section className="py-16 overflow-hidden bg-black/20">
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
              className="mx-8 flex items-center justify-center h-24 w-32"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-12 w-auto object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};