import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import CreateActionButtonDialog from "@/components/admin/action-buttons/CreateActionButtonDialog";
import Header from "@/components/admin/action-buttons/Header";
import MainButtonsSection from "@/components/admin/action-buttons/MainButtonsSection";
import CustomButtonsSection from "@/components/admin/action-buttons/CustomButtonsSection";

const mainButtons = [
  { id: "proposito", name: "Propósito", icon: "Target", label: "Propósito", category: "proposito", color: "purple" },
  { id: "metodo", name: "Método", icon: "Brain", label: "Método", category: "metodo", color: "blue" },
  { id: "mentoria", name: "Mentoria", icon: "School", label: "Mentoria", category: "mentoria", color: "green" },
  { id: "curso", name: "Curso", icon: "GraduationCap", label: "Curso", category: "curso", color: "yellow" },
  { id: "conteudo", name: "Conteúdo", icon: "Book", label: "Conteúdo", category: "conteudo", color: "red" }
];

const ActionButtons = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [customButtons, setCustomButtons] = useState<any[]>([]);
  const [prompts, setPrompts] = useState<any[]>([]);
  const { toast } = useToast();

  const loadData = async () => {
    try {
      const { data: buttonsData, error: buttonsError } = await supabase
        .from('action_buttons')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (buttonsError) throw buttonsError;
      setCustomButtons(buttonsData || []);

      const { data: promptsData, error: promptsError } = await supabase
        .from('prompt_blocks')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (promptsError) throw promptsError;
      setPrompts(promptsData || []);
      
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    loadData();

    const channel = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'action_buttons'
        },
        () => {
          loadData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const renderSubPrompts = (category: string, visitedCategories: Set<string> = new Set()) => {
    visitedCategories.add(category);
    
    const subPrompts = prompts.filter(p => 
      p.parent_category === category && !visitedCategories.has(p.category)
    );
    
    if (subPrompts.length === 0) return null;

    return (
      <div className="ml-4 space-y-2">
        {subPrompts.map(prompt => (
          <div key={prompt.id} className="flex flex-col">
            <div className="flex items-center justify-between bg-chatgpt-secondary p-3 rounded-lg">
              <span className="text-white">{prompt.name}</span>
              {prompts.some(p => p.parent_category === prompt.category) && (
                <button
                  onClick={() => toggleCategory(prompt.category)}
                  className="text-gray-400 hover:text-white"
                >
                  {expandedCategories.includes(prompt.category) 
                    ? <ChevronUp className="h-4 w-4" />
                    : <ChevronDown className="h-4 w-4" />
                  }
                </button>
              )}
            </div>
            {expandedCategories.includes(prompt.category) && 
              renderSubPrompts(prompt.category, new Set(visitedCategories))}
          </div>
        ))}
      </div>
    );
  };

  const handleEdit = async (id: string) => {
    console.log('Editar botão:', id);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('action_buttons')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Botão removido com sucesso.",
      });

      loadData();
    } catch (error) {
      console.error('Erro ao deletar botão:', error);
      toast({
        title: "Erro",
        description: "Não foi possível remover o botão.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-chatgpt-main">
      <div className="container mx-auto p-6">
        <Header onCreateClick={() => setIsCreateDialogOpen(true)} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MainButtonsSection
            mainButtons={mainButtons}
            expandedCategories={expandedCategories}
            toggleCategory={toggleCategory}
            renderSubPrompts={renderSubPrompts}
            prompts={prompts}
          />

          <CustomButtonsSection
            customButtons={customButtons}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        <CreateActionButtonDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
        />
      </div>
    </div>
  );
};

export default ActionButtons;