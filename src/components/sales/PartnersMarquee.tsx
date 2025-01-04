export const PartnersMarquee = () => {
  const partners = [
    { name: "GPT-4" },
    { name: "Claude 3" },
    { name: "Gemini" },
    { name: "Mistral" },
    { name: "Llama 2" },
    { name: "PaLM 2" },
    { name: "DALL-E" },
    { name: "Stable Diffusion" },
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-transparent to-purple-950/10">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
          Integrado com as Melhores IAs
        </h2>
        <p className="text-xl text-gray-300">
          Potencialize seus resultados com as IAs mais avançadas do mercado
        </p>
      </div>

      <div className="relative flex flex-col gap-2 overflow-hidden">
        {/* Gradientes laterais para suavizar as transições */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0F0F1A] to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0F0F1A] to-transparent z-10"></div>

        {/* First row - Left to right */}
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee whitespace-nowrap flex items-center">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="mx-4 flex items-center justify-center h-14"
              >
                <span className="text-xl font-semibold text-gray-300 hover:text-white transition-colors px-6 py-2 rounded-xl bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/20 hover:border-purple-500/40">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Second row - Right to left */}
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marqueeReverse whitespace-nowrap flex items-center">
            {[...partners.reverse(), ...partners].map((partner, index) => (
              <div
                key={index}
                className="mx-4 flex items-center justify-center h-14"
              >
                <span className="text-xl font-semibold text-gray-300 hover:text-white transition-colors px-6 py-2 rounded-xl bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/20 hover:border-purple-500/40">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};