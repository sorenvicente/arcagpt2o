import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  isPro?: boolean;
}

export const PricingCard = ({ title, price, features, isPro = false }: PricingCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className={`p-8 ${
      isPro 
        ? "bg-gradient-to-br from-purple-600/20 to-blue-600/20 border-purple-400/50" 
        : "bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/20"
      } backdrop-blur hover:border-purple-500/40 transition-all duration-300 relative`}
    >
      {isPro && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
          Mais Popular
        </div>
      )}
      
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-6">
        {price}<span className="text-lg font-normal text-gray-400">/mês</span>
      </div>
      
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-300">
            <Check className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button
        onClick={() => navigate("/login")}
        className={isPro 
          ? "w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-300"
          : "w-full bg-purple-900/50 hover:bg-purple-900/70 text-purple-400 border border-purple-500/50 hover:text-white transition-all duration-300"
        }
      >
        {isPro ? "Começar Agora" : "Começar Grátis"}
      </Button>
    </Card>
  );
};