import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import ActionButtonForm, { ActionButtonFormData } from "./ActionButtonForm";
import ActionButtonDialogHeader from "./ActionButtonDialogHeader";

interface CreateActionButtonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingButton?: {
    id: string;
    name: string;
    icon: string;
    label: string;
    category: string;
    color: string;
  };
  onUpdate?: (button: { id: string } & ActionButtonFormData) => void;
}

const CreateActionButtonDialog = ({
  open,
  onOpenChange,
  editingButton,
  onUpdate,
}: CreateActionButtonDialogProps) => {
  const { toast } = useToast();

  const handleSubmit = async (data: ActionButtonFormData) => {
    try {
      if (editingButton && onUpdate) {
        await onUpdate({ ...data, id: editingButton.id });
      } else {
        const { error } = await supabase.from("action_buttons").insert([data]);
        if (error) throw error;
        
        toast({
          title: "Botão criado",
          description: "O novo botão foi criado com sucesso",
        });
      }
      
      onOpenChange(false);
    } catch (error) {
      console.error("Erro ao salvar botão:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o botão",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-chatgpt-secondary border border-chatgpt-border rounded-3xl shadow-lg">
        <ActionButtonDialogHeader isEditing={!!editingButton} />
        <ActionButtonForm
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          editingButton={editingButton}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateActionButtonDialog;