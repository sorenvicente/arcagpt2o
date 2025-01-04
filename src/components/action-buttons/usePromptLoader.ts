import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const usePromptLoader = () => {
  const [prompts, setPrompts] = useState<any[]>([]);
  const { toast } = useToast();

  const loadPrompts = async () => {
    try {
      console.log('Iniciando carregamento dos prompts...');
      
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
        console.log('Nenhuma chave API encontrada');
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
        console.log('Prompts carregados com sucesso:', data);
        setPrompts(data);
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

  useEffect(() => {
    loadPrompts();

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
          console.log('Mudança detectada na tabela prompt_blocks, recarregando...');
          loadPrompts();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [toast]);

  return { prompts };
};