import React, { useState, useEffect } from "react";
import { Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { EditPromptDialog } from "./EditPromptDialog";
import { supabase } from "@/integrations/supabase/client";

interface Prompt {
  id: string;
  name: string;
  description: string;
  prompt: string;
  category: string;
  created_at: string;
}

export function PromptList() {
  const { toast } = useToast();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
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

  useEffect(() => {
    loadPrompts();

    // Listen for prompt creation events
    const handlePromptCreated = () => {
      loadPrompts();
    };
    window.addEventListener('promptCreated', handlePromptCreated);

    // Subscribe to Supabase changes
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

  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-400">
        Carregando prompts...
      </div>
    );
  }

  if (prompts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        Nenhum prompt criado ainda.
      </div>
    );
  }

  return (
    <div className="space-y-2 max-w-3xl mx-auto">
      {prompts.map((prompt) => (
        <div
          key={prompt.id}
          className="flex items-center justify-between p-3 bg-chatgpt-secondary rounded-lg border border-chatgpt-border hover:bg-chatgpt-hover transition-colors"
        >
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-white truncate">{prompt.name}</h3>
            {prompt.description && (
              <p className="text-sm text-gray-400 mt-1 truncate">{prompt.description}</p>
            )}
            <span className="text-xs text-gray-500 mt-1 block">
              Categoria: {prompt.category}
            </span>
          </div>
          <div className="flex gap-2 ml-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setEditingPrompt(prompt)}
              className="text-gray-400 hover:text-white hover:bg-chatgpt-hover"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(prompt.id)}
              className="text-gray-400 hover:text-red-400 hover:bg-chatgpt-hover"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      
      {editingPrompt && (
        <EditPromptDialog
          open={!!editingPrompt}
          onOpenChange={(open) => !open && setEditingPrompt(null)}
          prompt={editingPrompt}
          onUpdate={loadPrompts}
        />
      )}
    </div>
  );
}