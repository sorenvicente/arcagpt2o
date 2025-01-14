import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

const mainButtons = [
  { id: "proposito", name: "Propósito", icon: "Target", label: "Propósito", category: "proposito", color: "purple" },
  { id: "metodo", name: "Método", icon: "Brain", label: "Método", category: "metodo", color: "blue" },
  { id: "mentoria", name: "Mentoria", icon: "School", label: "Mentoria", category: "mentoria", color: "green" },
  { id: "curso", name: "Curso", icon: "GraduationCap", label: "Curso", category: "curso", color: "yellow" },
  { id: "conteudo", name: "Conteúdo", icon: "Book", label: "Conteúdo", category: "conteudo", color: "red" }
];

const ActionButtons = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState<ActionButton | null>(null);
  const { toast } = useToast();

  const handleEdit = (button: ActionButton) => {
    setSelectedButton(button);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async (updatedButton: ActionButton) => {
    try {
      const { error } = await supabase
        .from('action_buttons')
        .update({
          icon: updatedButton.icon,
          label: updatedButton.label,
          color: updatedButton.color
        })
        .eq('category', updatedButton.category);

      if (error) throw error;

      toast({
        title: "Botão atualizado",
        description: "As alterações foram salvas com sucesso",
      });
      
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error('Erro ao atualizar botão:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o botão",
        variant: "destructive",
      });
    }
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
          {mainButtons.map((button) => (
            <div
              key={button.id}
              className="bg-chatgpt-secondary rounded-2xl p-6 border border-chatgpt-border hover:border-gray-600 transition-colors shadow-lg hover:shadow-xl"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-white">{button.name}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(button)}
                  className="hover:bg-chatgpt-hover rounded-full"
                >
                  <Pencil className="h-4 w-4 text-gray-400 hover:text-white" />
                </Button>
              </div>
              <div className="space-y-2 text-gray-400">
                <p>Categoria: {button.category}</p>
                <p>Ícone: {button.icon}</p>
                <div className={`w-4 h-4 rounded-full bg-${button.color}-400`} />
              </div>
            </div>
          ))}
        </div>

        <CreateActionButtonDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
        />

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-chatgpt-secondary border-chatgpt-border rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">Editar Botão</DialogTitle>
            </DialogHeader>
            {selectedButton && (
              <CreateActionButtonDialog
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
                editingButton={selectedButton}
                onUpdate={handleUpdate}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ActionButtons;