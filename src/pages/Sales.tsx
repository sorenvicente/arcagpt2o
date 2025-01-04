import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Check, Zap } from "lucide-react";

const SalesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-chatgpt-main to-chatgpt-secondary">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Revolucione seu Atendimento com IA
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Uma plataforma inteligente que transforma a maneira como você interage com seus clientes
          </p>
          <Button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105"
          >
            <span>Começar Agora</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 bg-chatgpt-secondary/50 backdrop-blur border-chatgpt-border hover:shadow-xl transition-all duration-300">
            <Zap className="h-12 w-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Respostas Instantâneas</h3>
            <p className="text-gray-300">
              IA avançada que fornece respostas precisas e contextualizadas em segundos
            </p>
          </Card>
          
          <Card className="p-6 bg-chatgpt-secondary/50 backdrop-blur border-chatgpt-border hover:shadow-xl transition-all duration-300">
            <Zap className="h-12 w-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Personalização Total</h3>
            <p className="text-gray-300">
              Adapte a IA ao seu negócio com prompts e configurações personalizadas
            </p>
          </Card>
          
          <Card className="p-6 bg-chatgpt-secondary/50 backdrop-blur border-chatgpt-border hover:shadow-xl transition-all duration-300">
            <Zap className="h-12 w-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">Análise Avançada</h3>
            <p className="text-gray-300">
              Insights detalhados sobre interações e performance do sistema
            </p>
          </Card>
        </div>

        {/* Pricing Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Planos que se Adaptam a Você</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 bg-chatgpt-secondary/50 backdrop-blur border-chatgpt-border hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-4">Plano Básico</h3>
              <div className="text-3xl font-bold text-white mb-6">
                R$ 97<span className="text-lg font-normal text-gray-400">/mês</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Até 1000 interações mensais",
                  "3 prompts personalizados",
                  "Suporte por email",
                  "Análises básicas"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-blue-400 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button
                onClick={() => navigate("/login")}
                variant="outline"
                className="w-full border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-all duration-300"
              >
                Começar Grátis
              </Button>
            </Card>
            
            <Card className="p-8 bg-gradient-to-br from-blue-600 to-blue-800 border-blue-400 hover:shadow-xl transition-all duration-300">
              <div className="absolute top-4 right-4 bg-blue-400 text-white px-3 py-1 rounded-full text-sm">
                Popular
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">Plano Pro</h3>
              <div className="text-3xl font-bold text-white mb-6">
                R$ 197<span className="text-lg font-normal text-gray-300">/mês</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Interações ilimitadas",
                  "Prompts ilimitados",
                  "Suporte prioritário 24/7",
                  "Análises avançadas",
                  "API personalizada",
                  "Treinamento exclusivo"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center text-white">
                    <Check className="h-5 w-5 text-blue-200 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button
                onClick={() => navigate("/login")}
                className="w-full bg-white text-blue-600 hover:bg-gray-100 transition-all duration-300"
              >
                Começar Agora
              </Button>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-white mb-6">
            Pronto para Transformar seu Negócio?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de empresas que já estão usando nossa plataforma
          </p>
          <Button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105"
          >
            <span>Começar Gratuitamente</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;