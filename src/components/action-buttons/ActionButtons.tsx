import { useToast } from "@/components/ui/use-toast";
import { usePromptLoader } from "./usePromptLoader";
import { useActionButtons } from "./useActionButtons";
import MainActionButtons from "./MainActionButtons";
import CustomActionButtons from "./CustomActionButtons";

interface ActionButtonsProps {
  onSelectPrompt: (prompt: string, category: string) => void;
  activeCategory: string | null;
}

const ActionButtons = ({ onSelectPrompt, activeCategory }: ActionButtonsProps) => {
  const { prompts } = usePromptLoader();
  const { customButtons } = useActionButtons();
  const { toast } = useToast();

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

  return (
    <div className="flex flex-col gap-4 mb-4">
      <MainActionButtons
        activeCategory={activeCategory}
        onSelectPrompt={handlePromptSelect}
        normalizeString={normalizeString}
      />
    </div>
  );
};

export default ActionButtons;