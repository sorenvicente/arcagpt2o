import { Book, Brain, GraduationCap, School, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ActionButton from "./ActionButton";
import { usePromptLoader } from "./usePromptLoader";

interface ActionButtonsProps {
  onSelectPrompt: (prompt: string, category: string) => void;
  activeCategory: string | null;
}

const ActionButtons = ({ onSelectPrompt, activeCategory }: ActionButtonsProps) => {
  const { prompts } = usePromptLoader();
  const { toast } = useToast();

  const normalizeString = (str: string) => {
    return str.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  const handlePromptSelect = (category: string) => {
    console.log('Procurando prompt para categoria:', category);
    console.log('Prompts disponíveis:', prompts);
    
    const selectedPrompt = prompts.find(p => 
      normalizeString(p.category) === normalizeString(category)
    );
    
    if (selectedPrompt) {
      console.log('Prompt encontrado:', selectedPrompt);
      const systemMessage = `Você está agora atuando como um assistente especializado em ${category}. Seu objetivo é: ${selectedPrompt.prompt}`;
      onSelectPrompt(systemMessage, category);
    } else {
      console.log('Nenhum prompt encontrado para categoria:', category);
      console.log('Categorias disponíveis:', prompts.map(p => p.category));
      toast({
        title: "Erro",
        description: `Nenhum prompt encontrado para ${category}`,
        variant: "destructive",
      });
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
          isActive={normalizeString(activeCategory || '') === normalizeString(action.category)}
          onClick={() => handlePromptSelect(action.category)}
        />
      ))}
    </div>
  );
};

export default ActionButtons;