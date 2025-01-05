import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { EditPromptForm } from "./EditPromptForm";

interface EditPromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prompt: {
    id: string;
    name: string;
    description: string;
    prompt: string;
    category: string;
  };
  onUpdate: () => void;
}

export function EditPromptDialog({ open, onOpenChange, prompt, onUpdate }: EditPromptDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: {
    name: string;
    description: string;
    prompt: string;
    category: string;
  }) => {
    if (!values.name || !values.description || !values.prompt || !values.category) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('prompt_blocks')
        .update({
          name: values.name,
          description: values.description,
          prompt: values.prompt,
          category: values.category,
        })
        .eq('id', prompt.id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Prompt atualizado com sucesso!",
      });

      onUpdate();
      onOpenChange(false);
    } catch (error) {
      console.error('Error updating prompt:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o prompt.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-[#1A1F2C] border border-[#2A2F3C] text-white rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">Editar Prompt</DialogTitle>
          <DialogDescription className="text-gray-400">
            Faça as alterações necessárias no prompt abaixo.
          </DialogDescription>
        </DialogHeader>
        <EditPromptForm
          initialValues={prompt}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}