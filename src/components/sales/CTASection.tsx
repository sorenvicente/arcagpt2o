import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

export const CTASection = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 px-4 py-2 rounded-full mb-8">
        <Star className="h-4 w-4 text-purple-400" />
        <span className="text-sm text-purple-400">Comece sua Jornada Hoje</span>
      </div>
      <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-6">
        Pronto para Transformar seu Negócio?
      </h2>
      <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
        Junte-se aos empreendedores que já estão construindo seus impérios digitais com IA
      </p>
      <Button
        onClick={() => navigate("/login")}
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105"
      >
        <span>Começar Gratuitamente</span>
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};