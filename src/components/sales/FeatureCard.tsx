import { Card } from "@/components/ui/card";
import { Brain, BookOpen, Rocket } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: "brain" | "book" | "rocket";
}

export const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  const Icon = {
    brain: Brain,
    book: BookOpen,
    rocket: Rocket
  }[icon];

  return (
    <Card className="p-8 bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
      <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 p-3 mb-6">
        <Icon className="h-full w-full text-white" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </Card>
  );
};