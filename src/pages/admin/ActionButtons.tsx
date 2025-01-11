import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { CreateActionButtonDialog } from "@/components/admin/action-buttons/CreateActionButtonDialog";

interface ActionButton {
  id: string;
  name: string;
  icon: string;
  label: string;
  category: string;
  color: string;
}

const ActionButtonsPage = () => {
  const navigate = useNavigate();
  const { isLoading, isAdmin } = useAuth();
  const { toast } = useToast();
  const [buttons, setButtons] = useState<ActionButton[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadButtons();

    const channel = supabase
      .channel('action_buttons_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'action_buttons' },
        () => {
          loadButtons();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const loadButtons = async () => {
    try {
      const { data, error } = await supabase
        .from('action_buttons')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setButtons(data || []);
    } catch (error) {
      console.error('Error loading buttons:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os botões.",
        variant: "destructive",
      });
    }
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
    } catch (error) {
      console.error('Error deleting button:', error);
      toast({
        title: "Erro",
        description: "Não foi possível remover o botão.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!isAdmin) {
    navigate('/app');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-chatgpt-main to-chatgpt-secondary p-6">
      <Card className="w-full max-w-4xl mx-auto bg-[#343541]/90 border-0 shadow-lg hover:shadow-xl backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-white">Gerenciar Botões de Ação</h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex items-center gap-2 rounded-xl border-chatgpt-border hover:bg-chatgpt-hover text-white"
                onClick={() => navigate("/app")}
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar à Interface
              </Button>
              <Button
                className="flex items-center gap-2 rounded-xl bg-chatgpt-secondary hover:bg-chatgpt-hover text-white"
                onClick={() => setIsDialogOpen(true)}
              >
                <Plus className="h-4 w-4" />
                Novo Botão
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {buttons.map((button) => (
              <Card 
                key={button.id}
                className="p-4 bg-[#40414F]/50 border border-chatgpt-border rounded-xl backdrop-blur-sm transition-all duration-300 hover:shadow-md"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{button.label}</h3>
                    <p className="text-sm text-gray-400">Categoria: {button.category}</p>
                    <p className="text-sm text-gray-400">Ícone: {button.icon}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(button.id)}
                    className="text-gray-400 hover:text-red-400 hover:bg-red-400/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>

      <CreateActionButtonDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
};

export default ActionButtonsPage;