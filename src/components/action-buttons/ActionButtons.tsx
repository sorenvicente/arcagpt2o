import { Book, Brain, GraduationCap, School, Target } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ActionButton from "./ActionButton";
import { usePromptLoader } from "./usePromptLoader";
import { useState } from "react";

interface ActionButtonsProps {
  onSelectPrompt: (prompt: string, category: string) => void;
  activeCategory: string | null;
}

const ActionButtons = ({ onSelectPrompt, activeCategory }: ActionButtonsProps) => {
  const { prompts } = usePromptLoader();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const normalizeString = (str: string) => {
    return str.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  const handleCategorySelect = (category: string) => {
    const isCurrentlySelected = normalizeString(selectedCategory || '') === normalizeString(category);
    
    if (isCurrentlySelected) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
      const selectedPrompt = prompts.find(p => 
        normalizeString(p.category) === normalizeString(category)
      );
      
      if (!selectedPrompt) {
        console.log('Nenhum prompt encontrado para categoria:', category);
        toast({
          title: "Prompt não encontrado",
          description: `Nenhum prompt configurado para a categoria ${category}`,
          variant: "destructive",
        });
      }
    }
  };

  const actions = [
    { icon: <Target className="h-4 w-4 text-purple-400" />, label: "Propósito", category: "proposito" },
    { icon: <Brain className="h-4 w-4 text-blue-400" />, label: "Método", category: "metodo" },
    { icon: <School className="h-4 w-4 text-green-400" />, label: "Mentoria", category: "mentoria" },
    { icon: <GraduationCap className="h-4 w-4 text-yellow-400" />, label: "Curso", category: "curso" },
    { icon: <Book className="h-4 w-4 text-red-400" />, label: "Conteúdo", category: "conteudo" },
  ];

  return (
    <div className="flex gap-2 flex-wrap justify-center mb-4">
      {actions.map((action) => (
        <ActionButton 
          key={action.label}
          icon={action.icon}
          label={action.label}
          isActive={normalizeString(selectedCategory || '') === normalizeString(action.category)}
          onClick={() => handleCategorySelect(action.category)}
        />
      ))}
    </div>
  );
};

export default ActionButtons;