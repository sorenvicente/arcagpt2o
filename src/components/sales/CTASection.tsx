import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-24">
      <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-8">
        Pronto para Começar?
      </h2>
      <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
        Junte-se a milhares de empreendedores que já estão revolucionando seus negócios com IA.
      </p>
      <Button
        onClick={() => navigate("/login")}
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105 mb-24"
      >
        <span>Começar Agora</span>
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center">
          <div className="w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-gradient-to-r from-purple-400 to-blue-400">
            <img
              src="/lovable-uploads/d6ea02ca-d39e-4e43-b2fa-6d6af3d668a1.png"
              alt="Criador do ArcaGPT"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Criador e Mentor
          </h3>
          <h4 className="text-lg font-medium text-purple-400 mb-4">
            Soren Vincente
          </h4>
          <p className="text-lg text-gray-300 mb-6 max-w-2xl">
            "Minha missão é capacitar empreendedores a alcançarem seu máximo potencial através da tecnologia. 
            Acredito que cada mensagem tem o poder de transformar vidas e negócios, e com a IA podemos amplificar 
            esse impacto de forma extraordinária. Junte-se a nós nessa jornada de transformação digital e descubra 
            como sua voz pode alcançar o mundo de maneira mais eficiente e impactante."
          </p>
          <p className="text-sm text-gray-400">
            © 2024 ArcaGPT. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};