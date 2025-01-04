import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-300 mb-6">{description}</p>
      <Button
        onClick={() => navigate("/login")}
        variant="ghost"
        className="text-purple-400 hover:text-white hover:bg-purple-900/50 group"
      >
        Começar Agora
        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
};