import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ActionButtonFormData {
  name: string;
  icon: string;
  label: string;
  category: string;
  color: string;
}

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
  const { register, handleSubmit, reset, setValue } = useForm<ActionButtonFormData>();

  useEffect(() => {
    if (editingButton) {
      setValue("name", editingButton.name);
      setValue("icon", editingButton.icon);
      setValue("label", editingButton.label);
      setValue("category", editingButton.category);
      setValue("color", editingButton.color);
    }
  }, [editingButton, setValue]);

  const onSubmit = async (data: ActionButtonFormData) => {
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
      
      reset();
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingButton ? "Editar Botão" : "Criar Novo Botão"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              {...register("name")}
              readOnly={!!editingButton}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="icon">Ícone</Label>
            <Input
              id="icon"
              {...register("icon")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="label">Label</Label>
            <Input
              id="label"
              {...register("label")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Input
              id="category"
              {...register("category")}
              readOnly={!!editingButton}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="color">Cor</Label>
            <Input
              id="color"
              {...register("color")}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">
              {editingButton ? "Salvar" : "Criar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateActionButtonDialog;