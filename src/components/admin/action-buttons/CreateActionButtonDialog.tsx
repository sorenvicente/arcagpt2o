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
      <DialogContent className="bg-chatgpt-secondary border border-chatgpt-border rounded-3xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-white text-xl font-semibold px-2">
            {editingButton ? "Editar Botão" : "Criar Novo Botão"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-300">Nome</Label>
            <Input
              id="name"
              {...register("name")}
              readOnly={!!editingButton}
              className="bg-chatgpt-main border-chatgpt-border text-white rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="icon" className="text-gray-300">Ícone</Label>
            <Input
              id="icon"
              {...register("icon")}
              className="bg-chatgpt-main border-chatgpt-border text-white rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="label" className="text-gray-300">Label</Label>
            <Input
              id="label"
              {...register("label")}
              className="bg-chatgpt-main border-chatgpt-border text-white rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category" className="text-gray-300">Categoria</Label>
            <Input
              id="category"
              {...register("category")}
              readOnly={!!editingButton}
              className="bg-chatgpt-main border-chatgpt-border text-white rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="color" className="text-gray-300">Cor</Label>
            <Input
              id="color"
              {...register("color")}
              className="bg-chatgpt-main border-chatgpt-border text-white rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="bg-chatgpt-main border-chatgpt-border hover:bg-chatgpt-hover text-white rounded-full px-6"
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6"
            >
              {editingButton ? "Salvar" : "Criar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateActionButtonDialog;