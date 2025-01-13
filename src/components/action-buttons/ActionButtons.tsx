import { Book, Brain, GraduationCap, School, Target, MoreHorizontal } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ActionButton from "./ActionButton";
import { usePromptLoader } from "./usePromptLoader";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";

interface ActionButtonsProps {
  onSelectPrompt: (prompt: string, category: string) => void;
  activeCategory: string | null;
}

interface ActionButton {
  id: string;
  name: string;
  icon: string;
  label: string;
  category: string;
  color: string;
}

const ActionButtons = ({ onSelectPrompt, activeCategory }: ActionButtonsProps) => {
  const { prompts } = usePromptLoader();
  const { toast } = useToast();
  const [customButtons, setCustomButtons] = useState<ActionButton[]>([]);

  useEffect(() => {
    const loadCustomButtons = async () => {
      const { data, error } = await supabase
        .from('action_buttons')
        .select('*');
      
      if (error) {
        console.error('Error loading custom buttons:', error);
        return;
      }
      
      setCustomButtons(data || []);
    };

    loadCustomButtons();

    // Subscribe to changes in action_buttons table
    const channel = supabase
      .channel('action_buttons_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'action_buttons' },
        () => {
          loadCustomButtons();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

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

  // Get custom buttons that aren't in mainActions
  const additionalButtons = customButtons.filter(button => 
    !mainActions.some(action => normalizeString(action.category) === normalizeString(button.category))
  );

  const getIconComponent = (iconName: string) => {
    const icons = {
      Target: <Target className="h-4 w-4" />,
      Brain: <Brain className="h-4 w-4" />,
      School: <School className="h-4 w-4" />,
      GraduationCap: <GraduationCap className="h-4 w-4" />,
      Book: <Book className="h-4 w-4" />,
    };
    return icons[iconName as keyof typeof icons] || <Target className="h-4 w-4" />;
  };

  return (
    <div className="flex gap-2 flex-wrap justify-center mb-4">
      {mainActions.map((action) => (
        <ActionButton 
          key={action.category}
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
          <DropdownMenuContent className="bg-chatgpt-secondary border-chatgpt-border p-2 rounded-lg">
            <div className="flex flex-col gap-2">
              {additionalButtons.map((button) => (
                <ActionButton
                  key={button.id}
                  icon={getIconComponent(button.icon)}
                  label={button.label}
                  isActive={normalizeString(activeCategory || '') === normalizeString(button.category)}
                  onClick={() => handlePromptSelect(button.category)}
                />
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default ActionButtons;