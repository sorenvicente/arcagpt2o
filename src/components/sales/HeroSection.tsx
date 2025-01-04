import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mb-24 animate-fade-in">
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 px-4 py-2 rounded-full mb-8">
        <Sparkles className="h-4 w-4 text-purple-400" />
        <span className="text-sm text-purple-400">Revolucione seu Negócio Digital</span>
      </div>
      <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-8">
        Crie seu Império Digital
        <br />
        com Ajuda da IA
      </h1>
      <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
        Desenvolva seu propósito, método único e ofertas irresistíveis automaticamente.
        <br />
        Crie mentorias, cursos, conteúdos e páginas de vendas com IA avançada.
      </p>
      <Button
        onClick={() => navigate("/login")}
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105"
      >
        <span>Começar Agora</span>
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};