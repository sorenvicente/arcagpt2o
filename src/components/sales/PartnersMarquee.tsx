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
        {/* Elementos 3D laterais */}
        <div className="absolute inset-y-0 left-0 w-32 z-10 flex items-center">
          {/* Gradiente base */}
          <div className="h-full w-full bg-gradient-to-r from-[#1A1A2E] via-[#151522]/70 to-transparent"></div>
          
          {/* Elemento 3D - Portal de Entrada */}
          <div className="absolute inset-y-0 right-0 flex items-center">
            <div className="relative h-[140%] w-3">
              {/* Borda luminosa */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent rounded-l-full"></div>
              {/* Efeito de profundidade */}
              <div className="absolute inset-0 bg-gradient-to-b from-purple-400/5 via-blue-500/5 to-purple-400/5 rounded-l-full backdrop-blur-[2px]"></div>
              {/* Brilho central */}
              <div className="absolute inset-0 flex items-center">
                <div className="h-[60%] w-full bg-gradient-to-r from-purple-400/10 to-transparent rounded-l-full blur-[1px]"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-y-0 right-0 w-32 z-10 flex items-center">
          {/* Gradiente base */}
          <div className="h-full w-full bg-gradient-to-l from-[#1A1A2E] via-[#13131E]/70 to-transparent"></div>
          
          {/* Elemento 3D - Portal de Saída */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <div className="relative h-[140%] w-3">
              {/* Borda luminosa */}
              <div className="absolute inset-0 bg-gradient-to-l from-purple-500/10 to-transparent rounded-r-full"></div>
              {/* Efeito de profundidade */}
              <div className="absolute inset-0 bg-gradient-to-b from-purple-400/5 via-blue-500/5 to-purple-400/5 rounded-r-full backdrop-blur-[2px]"></div>
              {/* Brilho central */}
              <div className="absolute inset-0 flex items-center">
                <div className="h-[60%] w-full bg-gradient-to-l from-purple-400/10 to-transparent rounded-r-full blur-[1px]"></div>
              </div>
            </div>
          </div>
        </div>

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