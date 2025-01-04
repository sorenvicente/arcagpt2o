import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-16">
      <h2 className="text-3xl font-bold text-white mb-6">
        Pronto para Transformar seu Negócio?
      </h2>
      <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
        Crie seu império digital com a ajuda da inteligência artificial
      </p>
      <Button
        onClick={() => navigate("/login")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105"
      >
        <span>Começar Gratuitamente</span>
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};