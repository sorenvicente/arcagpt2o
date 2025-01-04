import { LogIn, Users, Brain } from "lucide-react";

const steps = [
  {
    icon: LogIn,
    title: "Faça Login",
    description: "Comece sua jornada criando sua conta em menos de 1 minuto. Sem complicações, sem burocracia.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80"
  },
  {
    icon: Users,
    title: "Escolha seu Agente",
    description: "Selecione o assistente perfeito para sua necessidade. Cada um é especializado em diferentes aspectos do seu negócio.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
  },
  {
    icon: Brain,
    title: "Veja o Milagre da IA",
    description: "Observe a mágica acontecer enquanto nossa IA transforma suas ideias em conteúdo persuasivo e estratégias eficazes.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80"
  }
];

export const StepsSection = () => {
  return (
    <section className="py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
          Como Funciona
        </h2>
        <p className="text-gray-300 text-lg">
          Três passos simples para transformar suas ideias em realidade
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center group">
            <div className="relative mb-8">
              <div className="w-full h-64 rounded-2xl overflow-hidden">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg">
                  <step.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            
            <h3 className="text-2xl font-semibold text-white mb-4 mt-8">
              {step.title}
            </h3>
            <p className="text-gray-300">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};