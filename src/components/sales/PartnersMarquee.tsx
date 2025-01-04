const partners = [
  { name: "OpenAI" },
  { name: "Anthropic" },
  { name: "Google" },
  { name: "Meta AI" },
  { name: "Mistral AI" },
  { name: "Cohere" },
  { name: "Claude" },
  { name: "Gemini" },
  { name: "PaLM" },
  { name: "Llama" }
];

export const PartnersMarquee = () => {
  return (
    <section className="py-16 overflow-hidden mb-32">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
          Integrado com as Melhores IAs
        </h2>
        <p className="text-lg text-gray-400">
          Acesse os modelos mais avançados de IA através de nossa plataforma
        </p>
      </div>

      <div className="relative flex flex-col gap-2">
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
    </section>
  );
};