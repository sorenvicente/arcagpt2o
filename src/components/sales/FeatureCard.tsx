import { Card } from "@/components/ui/card";
import { Brain, BookOpen, Rocket, Compass, Users, PenTool } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: "brain" | "book" | "rocket" | "compass" | "users" | "pen-tool";
}

export const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  const Icon = {
    brain: Brain,
    book: BookOpen,
    rocket: Rocket,
    compass: Compass,
    users: Users,
    "pen-tool": PenTool
  }[icon];

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 rounded-3xl">
      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </Card>
  );
};