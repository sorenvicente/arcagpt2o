import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import CreateActionButtonDialog from "@/components/admin/action-buttons/CreateActionButtonDialog";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ActionButton {
  id: string;
  name: string;
  icon: string;
  label: string;
  category: string;
  color: string;
}

interface PromptBlock {
  id: string;
  name: string;
  description: string;
  category: string;
  parent_category: string | null;
}

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
  const [prompts, setPrompts] = useState<PromptBlock[]>([]);
  const { toast } = useToast();

  // Carregar prompts do Supabase
  const loadPrompts = async () => {
    try {
      const { data, error } = await supabase
        .from('prompt_blocks')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      setPrompts(data || []);
    } catch (error) {
      console.error('Erro ao carregar prompts:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os prompts.",
        variant: "destructive",
      });
    }
  };

  // Carregar prompts ao montar o componente
  useState(() => {
    loadPrompts();
  }, []);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Função para renderizar os sub-prompts de uma categoria
  const renderSubPrompts = (category: string, level: number = 0) => {
    const subPrompts = prompts.filter(p => p.parent_category === category);
    
    if (subPrompts.length === 0) return null;

    return (
      <div className={`ml-${level * 4} space-y-2`}>
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
              renderSubPrompts(prompt.category, level + 1)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-chatgpt-main">
      <div className="container mx-auto p-6">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Gerenciar Botões de Ação</h1>
          <div className="flex gap-4">
            <Link to="/app">
              <Button variant="outline" className="bg-chatgpt-secondary border-chatgpt-border hover:bg-chatgpt-hover rounded-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar à Interface
              </Button>
            </Link>
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-chatgpt-secondary border-chatgpt-border hover:bg-chatgpt-hover rounded-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Novo Botão
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Botões Principais */}
          <div className="col-span-full mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Botões Principais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mainButtons.map((button) => (
                <div
                  key={button.id}
                  className="bg-chatgpt-secondary rounded-2xl p-6 border border-chatgpt-border hover:border-gray-600 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium text-white">{button.name}</h3>
                    <button
                      onClick={() => toggleCategory(button.category)}
                      className="text-gray-400 hover:text-white"
                    >
                      {expandedCategories.includes(button.category) 
                        ? <ChevronUp className="h-4 w-4" />
                        : <ChevronDown className="h-4 w-4" />
                      }
                    </button>
                  </div>
                  {expandedCategories.includes(button.category) && (
                    <div className="mt-4">
                      {renderSubPrompts(button.category)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Botões de Produtos */}
          <div className="col-span-full">
            <h2 className="text-xl font-semibold text-white mb-4">Botões de Produtos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Aqui virão os botões de produtos criados dinamicamente */}
            </div>
          </div>
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