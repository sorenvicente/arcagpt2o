import { Book, Brain, GraduationCap, School, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface ActionButtonsProps {
  onSelectPrompt: (prompt: string, category: string) => void;
  activeCategory: string | null;
}

const ActionButtons = ({ onSelectPrompt, activeCategory }: ActionButtonsProps) => {
  const [prompts, setPrompts] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadPrompts = () => {
      const savedPrompts = localStorage.getItem('prompts');
      if (savedPrompts) {
        setPrompts(JSON.parse(savedPrompts));
        console.log('Prompts carregados:', JSON.parse(savedPrompts));
      } else {
        console.log('Nenhum prompt encontrado no localStorage');
      }
    };

    loadPrompts();
    window.addEventListener('storage', loadPrompts);
    return () => window.removeEventListener('storage', loadPrompts);
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
      const systemMessage = `Você está agora atuando como um assistente especializado em ${category}. Seu objetivo é: ${selectedPrompt.prompt}`;
      onSelectPrompt(systemMessage, category);
      console.log('Prompt selecionado:', selectedPrompt.prompt, 'Categoria:', category);
      toast({
        title: "Assistente Ativado",
        description: `Assistente de ${category} está pronto para ajudar`,
      });
    } else {
      console.log('Nenhum prompt encontrado para categoria:', category);
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
        <button 
          key={action.label} 
          onClick={() => handlePromptSelect(action.category)}
          className={`relative flex h-[42px] items-center gap-1.5 rounded-full border px-3 py-2 text-start text-[13px] transition enabled:hover:bg-chatgpt-secondary disabled:cursor-not-allowed xl:gap-2 xl:text-[14px] cursor-pointer ${
            normalizeString(activeCategory || '') === normalizeString(action.category)
              ? 'bg-chatgpt-secondary border-chatgpt-border' 
              : 'border-[#383737] hover:bg-chatgpt-hover'
          }`}
        >
          {action.icon}
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default ActionButtons;