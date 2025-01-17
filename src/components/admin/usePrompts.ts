import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Prompt {
  id: string;
  name: string;
  description: string;
  prompt: string;
  category: string;
  created_at: string;
}

export function usePrompts() {
  const { toast } = useToast();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPrompts = async () => {
    try {
      const { data, error } = await supabase
        .from('prompt_blocks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPrompts(data || []);
    } catch (error) {
      console.error('Error loading prompts:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os prompts.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('prompt_blocks')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Prompt excluído",
        description: "O prompt foi removido com sucesso.",
      });
      
      loadPrompts();
    } catch (error) {
      console.error('Error deleting prompt:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o prompt.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    loadPrompts();

    const handlePromptCreated = () => {
      loadPrompts();
    };
    window.addEventListener('promptCreated', handlePromptCreated);

    const channel = supabase
      .channel('prompt_blocks_changes')
      .on('postgres_changes', 
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
      window.removeEventListener('promptCreated', handlePromptCreated);
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    prompts,
    isLoading,
    handleDelete,
    loadPrompts
  };
}