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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CreateActionButtonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateActionButtonDialog({
  open,
  onOpenChange,
}: CreateActionButtonDialogProps) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [label, setLabel] = useState("");
  const [category, setCategory] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [color, setColor] = useState("");
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
      // Criar o botão de ação
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

      // Criar o prompt correspondente
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
      // Limpar o formulário
      setName("");
      setIcon("");
      setLabel("");
      setCategory("");
      setParentCategory("");
      setColor("");
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
      <DialogContent className="bg-chatgpt-secondary border-chatgpt-border text-white">
        <DialogHeader>
          <DialogTitle>Criar Novo Botão de Ação</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Nome</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-chatgpt-main border-chatgpt-border"
              placeholder="Ex: VSL"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Ícone</label>
            <Input
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="bg-chatgpt-main border-chatgpt-border"
              placeholder="Ex: Video"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Label</label>
            <Input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="bg-chatgpt-main border-chatgpt-border"
              placeholder="Ex: Video de Vendas"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Categoria</label>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-chatgpt-main border-chatgpt-border"
              placeholder="Ex: vsl"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Categoria Pai (opcional)</label>
            <Input
              value={parentCategory}
              onChange={(e) => setParentCategory(e.target.value)}
              className="bg-chatgpt-main border-chatgpt-border"
              placeholder="Ex: vsl_roteiro"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Cor</label>
            <Input
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="bg-chatgpt-main border-chatgpt-border"
              placeholder="Ex: blue"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? "Criando..." : "Criar Botão"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}