import { Book, Brain, GraduationCap, School, Target, MoreHorizontal } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ActionButton from "./ActionButton";
import { usePromptLoader } from "./usePromptLoader";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ActionButtonsProps {
  onSelectPrompt: (prompt: string, category: string) => void;
  activeCategory: string | null;
}

const ActionButtons = ({ onSelectPrompt, activeCategory }: ActionButtonsProps) => {
  const { prompts } = usePromptLoader();
  const { toast } = useToast();
  const [showMore, setShowMore] = useState(false);

  const normalizeString = (str: string) => {
    return str.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  const handlePromptSelect = (category: string) => {
    const selectedPrompt = prompts.find(p => 
      normalizeString(p.category) === normalizeString(category)
    );
    
    if (selectedPrompt) {
      onSelectPrompt(selectedPrompt.prompt, category);
      console.log('Prompt selecionado:', selectedPrompt.prompt, 'Categoria:', category);
    } else {
      console.log('Nenhum prompt encontrado para categoria:', category);
      toast({
        title: "Prompt não encontrado",
        description: `Nenhum prompt configurado para a categoria ${category}`,
        variant: "destructive",
      });
    }
  };

  // Main action buttons that are always visible
  const mainActions = [
    { icon: <Target className="h-4 w-4 text-purple-400" />, label: "Propósito", category: "proposito" },
    { icon: <Brain className="h-4 w-4 text-blue-400" />, label: "Método", category: "metodo" },
    { icon: <School className="h-4 w-4 text-green-400" />, label: "Mentoria", category: "mentoria" },
    { icon: <GraduationCap className="h-4 w-4 text-yellow-400" />, label: "Curso", category: "curso" },
    { icon: <Book className="h-4 w-4 text-red-400" />, label: "Conteúdo", category: "conteudo" },
  ];

  // Get additional buttons from prompts that aren't in mainActions
  const additionalButtons = prompts
    .filter(prompt => !mainActions.some(action => 
      normalizeString(action.category) === normalizeString(prompt.category)
    ))
    .map(prompt => ({
      icon: <Target className="h-4 w-4 text-gray-400" />,
      label: prompt.name,
      category: prompt.category
    }));

  return (
    <div className="flex gap-2 flex-wrap justify-center mb-4">
      {mainActions.map((action) => (
        <ActionButton 
          key={action.label}
          icon={action.icon}
          label={action.label}
          isActive={normalizeString(activeCategory || '') === normalizeString(action.category)}
          onClick={() => handlePromptSelect(action.category)}
        />
      ))}

      {additionalButtons.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative flex h-[42px] items-center gap-1.5 rounded-full border px-3 py-2 text-start text-[13px] text-white transition enabled:hover:bg-chatgpt-secondary disabled:cursor-not-allowed xl:gap-2 xl:text-[14px] cursor-pointer border-[#383737] hover:bg-chatgpt-hover">
              <MoreHorizontal className="h-4 w-4" />
              <span>Mais</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-chatgpt-secondary border-chatgpt-border">
            {additionalButtons.map((action) => (
              <ActionButton
                key={action.label}
                icon={action.icon}
                label={action.label}
                isActive={normalizeString(activeCategory || '') === normalizeString(action.category)}
                onClick={() => handlePromptSelect(action.category)}
              />
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default ActionButtons;