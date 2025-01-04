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
        ? "bg-gradient-to-br from-blue-600 to-blue-800 border-blue-400" 
        : "bg-chatgpt-secondary/50 backdrop-blur border-chatgpt-border"
      } hover:shadow-xl transition-all duration-300 relative`}
    >
      {isPro && (
        <div className="absolute top-4 right-4 bg-blue-400 text-white px-3 py-1 rounded-full text-sm">
          Popular
        </div>
      )}
      
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <div className="text-3xl font-bold text-white mb-6">
        {price}<span className={`text-lg font-normal ${isPro ? "text-gray-300" : "text-gray-400"}`}>/mês</span>
      </div>
      
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className={`flex items-center ${isPro ? "text-white" : "text-gray-300"}`}>
            <Check className={`h-5 w-5 ${isPro ? "text-blue-200" : "text-blue-400"} mr-2`} />
            {feature}
          </li>
        ))}
      </ul>
      
      <Button
        onClick={() => navigate("/login")}
        variant={isPro ? "default" : "outline"}
        className={isPro 
          ? "w-full bg-white text-blue-600 hover:bg-gray-100 transition-all duration-300"
          : "w-full border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-all duration-300"
        }
      >
        {isPro ? "Começar Agora" : "Começar Grátis"}
      </Button>
    </Card>
  );
};