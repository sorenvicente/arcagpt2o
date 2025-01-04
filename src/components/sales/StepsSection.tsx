import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const StepsSection = () => {
  const navigate = useNavigate();
  
  const steps = [
    {
      title: "Defina seu Propósito",
      description: "Descubra sua missão única e alinhe seu negócio com seus valores."
    },
    {
      title: "Crie seu Método",
      description: "Desenvolva uma metodologia exclusiva que destaque sua expertise."
    },
    {
      title: "Lance suas Ofertas",
      description: "Transforme seu conhecimento em produtos digitais escaláveis."
    }
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-transparent to-purple-950/10">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 px-4 py-2 rounded-full mb-8">
          <CheckCircle2 className="h-4 w-4 text-purple-400" />
          <span className="text-sm text-purple-400">Processo Simplificado</span>
        </div>
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-6">
          3 Passos para o Sucesso
        </h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Nossa metodologia comprovada para construir um negócio digital de sucesso
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 mb-16">
        {steps.map((step, index) => (
          <div
            key={index}
            className="p-8 rounded-3xl bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
          >
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center text-2xl font-bold text-purple-400 mb-6">
              {index + 1}
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
            <p className="text-gray-300">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button
          onClick={() => navigate("/login")}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105"
        >
          <span>Começar Agora</span>
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};