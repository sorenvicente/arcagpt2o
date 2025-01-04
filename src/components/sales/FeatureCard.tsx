import { Card } from "@/components/ui/card";
import { Zap } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
}

export const FeatureCard = ({ title, description }: FeatureCardProps) => {
  return (
    <Card className="p-6 bg-chatgpt-secondary/50 backdrop-blur border-chatgpt-border hover:shadow-xl transition-all duration-300">
      <Zap className="h-12 w-12 text-blue-400 mb-4" />
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </Card>
  );
};