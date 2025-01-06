import { Book, Brain, GraduationCap, School, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ActionButton from "./ActionButton";
import { usePromptLoader } from "./usePromptLoader";
import { SubPromptsMenu } from "./SubPromptsMenu";

interface ActionButtonsProps {
  onSelectPrompt: (prompt: string, category: string) => void;
  activeCategory: string | null;
}

const ActionButtons = ({ onSelectPrompt, activeCategory }: ActionButtonsProps) => {
  const { prompts, subPrompts } = usePromptLoader();
  const { toast } = useToast();

  const normalizeString = (str: string) => {
    return str.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  const handlePromptSelect = (category: string) => {
    // Filtrar sub-prompts da categoria selecionada
    const categorySubPrompts = subPrompts.filter(p => 
      normalizeString(p.parent_category || '') === normalizeString(category)
    );
    
    if (categorySubPrompts.length > 0) {
      // Mostrar menu de sub-prompts
      toast({
        title: `Sub-prompts de ${category}`,
        description: (
          <SubPromptsMenu
            subPrompts={categorySubPrompts}
            onSelect={(subPrompt) => {
              onSelectPrompt(subPrompt.prompt, subPrompt.category);
              console.log('Sub-prompt selecionado:', subPrompt.prompt, 'Categoria:', subPrompt.category);
            }}
          />
        ),
        duration: 10000,
      });
    } else {
      // Se não houver sub-prompts, usar o prompt principal
      const selectedPrompt = prompts.find(p => 
        normalizeString(p.category) === normalizeString(category)
      );
      
      if (selectedPrompt) {
        onSelectPrompt(selectedPrompt.prompt, category);
        console.log('Prompt selecionado:', selectedPrompt.prompt, 'Categoria:', category);
      } else {
        console.log('Nenhum prompt encontrado para categoria:', category);
        toast({
          title: "Erro",
          description: `Nenhum prompt encontrado para ${category}`,
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
          isActive={normalizeString(activeCategory || '') === normalizeString(action.category)}
          onClick={() => handlePromptSelect(action.category)}
        />
      ))}
    </div>
  );
};

export default ActionButtons;