import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { IconSelect } from "@/components/action-buttons/ActionButton";

interface CreateActionButtonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateActionButtonDialog({
  open,
  onOpenChange,
}: CreateActionButtonDialogProps) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("Target");
  const [label, setLabel] = useState("");
  const [category, setCategory] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [color, setColor] = useState("blue");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !icon || !label || !category || !color) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error: buttonError } = await supabase
        .from('action_buttons')
        .insert([
          {
            name,
            icon,
            label,
            category,
            color,
          }
        ]);

      if (buttonError) throw buttonError;

      const { error: promptError } = await supabase
        .from('prompt_blocks')
        .insert([
          {
            name,
            description: `Prompt para ${name}`,
            prompt: `Você é um assistente especializado em ${label}`,
            category,
            parent_category: parentCategory || null,
          }
        ]);

      if (promptError) throw promptError;

      toast({
        title: "Sucesso",
        description: "Botão de ação criado com sucesso!",
      });

      onOpenChange(false);
      setName("");
      setIcon("Target");
      setLabel("");
      setCategory("");
      setParentCategory("");
      setColor("blue");
    } catch (error) {
      console.error('Erro ao criar botão:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o botão de ação.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1F2C] border border-[#2A2F3C] text-white rounded-xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Criar Novo Botão de Ação</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Nome</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#2A2F3C] border-[#3A3F4C] text-white placeholder-gray-400 focus:border-[#9b87f5] focus:ring-[#9b87f5] rounded-xl"
              placeholder="Ex: VSL"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Ícone</label>
            <IconSelect value={icon} onValueChange={setIcon} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Label</label>
            <Input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="bg-[#2A2F3C] border-[#3A3F4C] text-white placeholder-gray-400 focus:border-[#9b87f5] focus:ring-[#9b87f5] rounded-xl"
              placeholder="Ex: Video de Vendas"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Categoria</label>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-[#2A2F3C] border-[#3A3F4C] text-white placeholder-gray-400 focus:border-[#9b87f5] focus:ring-[#9b87f5] rounded-xl"
              placeholder="Ex: vsl"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Categoria Pai (opcional)</label>
            <Input
              value={parentCategory}
              onChange={(e) => setParentCategory(e.target.value)}
              className="bg-[#2A2F3C] border-[#3A3F4C] text-white placeholder-gray-400 focus:border-[#9b87f5] focus:ring-[#9b87f5] rounded-xl"
              placeholder="Ex: vsl_roteiro"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white transition-colors rounded-xl"
          >
            {isSubmitting ? "Criando..." : "Criar Botão"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}