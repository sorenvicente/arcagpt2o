import { Book, Brain, GraduationCap, School, Target, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ActionButtonsProps {
  onSelectPrompt: (prompt: string, category: string) => void;
  activeCategory: string | null;
}

const ActionButtons = ({ onSelectPrompt, activeCategory }: ActionButtonsProps) => {
  const [prompts, setPrompts] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadPrompts = async () => {
      try {
        // Fetch most recent API key
        const { data: apiKeys, error: apiKeysError } = await supabase
          .from('api_keys')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1);

        if (apiKeysError) {
          console.error('Erro ao buscar chaves API:', apiKeysError);
          throw new Error('Falha ao buscar chaves API');
        }

        if (!apiKeys?.length || (!apiKeys[0].openai_key && !apiKeys[0].openrouter_key)) {
          toast({
            title: "Configuração necessária",
            description: "Por favor, configure pelo menos uma chave API (OpenAI ou OpenRouter) na página de Chaves API.",
            variant: "destructive",
          });
          return;
        }

        const { data, error } = await supabase
          .from('prompt_blocks')
          .select('*');
        
        if (error) {
          console.error('Erro ao carregar prompts:', error);
          toast({
            title: "Erro",
            description: "Não foi possível carregar os prompts. Por favor, tente novamente.",
            variant: "destructive",
          });
          return;
        }

        if (data) {
          setPrompts(data);
          console.log('Prompts carregados:', data);
        }
      } catch (error) {
        console.error('Erro ao carregar prompts:', error);
        toast({
          title: "Erro",
          description: "Ocorreu um erro ao carregar os prompts. Por favor, tente novamente.",
          variant: "destructive",
        });
      }
    };

    loadPrompts();

    // Subscribe to changes
    const channel = supabase
      .channel('prompt_blocks_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'prompt_blocks'
        },
        () => {
          loadPrompts();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [toast]);

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
      const systemMessage = `Você acionou a assistente de ${category}`;
      onSelectPrompt(systemMessage, category);
      console.log('Prompt selecionado:', selectedPrompt.prompt, 'Categoria:', category);
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
    { icon: <Settings className="h-4 w-4 text-gray-400" />, label: "Personalizar ChatGPT", category: "personalizar_chatgpt" },
  ];

  return (
    <div className="flex gap-2 flex-wrap justify-center mb-4">
      {actions.map((action) => (
        <button 
          key={action.label} 
          onClick={() => handlePromptSelect(action.category)}
          className={`relative flex h-[42px] items-center gap-1.5 rounded-full border px-3 py-2 text-start text-[13px] text-white transition enabled:hover:bg-chatgpt-secondary disabled:cursor-not-allowed xl:gap-2 xl:text-[14px] cursor-pointer ${
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