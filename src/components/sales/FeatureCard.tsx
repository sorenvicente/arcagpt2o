import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Compass, Users, Book, PenTool, Rocket } from "lucide-react";

interface FeatureCardProps {
  icon: "brain" | "compass" | "users" | "book" | "pen-tool" | "rocket";
  title: string;
  description: string;
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  const navigate = useNavigate();

  const getIcon = () => {
    switch (icon) {
      case "brain":
        return <Brain className="h-6 w-6 text-purple-400" />;
      case "compass":
        return <Compass className="h-6 w-6 text-blue-400" />;
      case "users":
        return <Users className="h-6 w-6 text-green-400" />;
      case "book":
        return <Book className="h-6 w-6 text-yellow-400" />;
      case "pen-tool":
        return <PenTool className="h-6 w-6 text-red-400" />;
      case "rocket":
        return <Rocket className="h-6 w-6 text-indigo-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center mb-6">
        {getIcon()}
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