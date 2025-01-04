import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";

export const GuaranteeSection = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-24 bg-gradient-to-b from-transparent to-purple-950/10">
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 px-4 py-2 rounded-full mb-8">
        <Shield className="h-4 w-4 text-purple-400" />
        <span className="text-sm text-purple-400">Garantia de 7 Dias</span>
      </div>
      <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-6">
        Experimente Sem Riscos
      </h2>
      <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
        Se você não ficar satisfeito com os resultados nos primeiros 7 dias,
        devolvemos 100% do seu investimento. Sem perguntas.
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