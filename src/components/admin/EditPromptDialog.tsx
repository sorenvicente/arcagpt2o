import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
  const [name, setName] = useState(prompt.name);
  const [description, setDescription] = useState(prompt.description);
  const [promptText, setPromptText] = useState(prompt.prompt);
  const [category, setCategory] = useState(prompt.category);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    if (!name || !description || !promptText || !category) {
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
          name,
          description,
          prompt: promptText,
          category,
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

  const categories = [
    { value: "proposito", label: "Propósito" },
    { value: "metodo", label: "Método" },
    { value: "mentoria", label: "Mentoria" },
    { value: "curso", label: "Curso" },
    { value: "conteudo", label: "Conteúdo" },
    { value: "personalizar_chatgpt", label: "Personalizar ChatGPT" },
    { value: "eixos", label: "Eixos" },
    { value: "blocos", label: "Blocos" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-[#1A1F2C] border border-[#2A2F3C] text-white rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">Editar Prompt</DialogTitle>
          <DialogDescription className="text-gray-400">
            Faça as alterações necessárias no prompt abaixo.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Nome do Prompt</label>
            <Input
              placeholder="Nome do Prompt"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#2A2F3C] border-[#3A3F4C] text-white placeholder-gray-400 focus:border-[#9b87f5] focus:ring-[#9b87f5] rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Descrição</label>
            <Input
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-[#2A2F3C] border-[#3A3F4C] text-white placeholder-gray-400 focus:border-[#9b87f5] focus:ring-[#9b87f5] rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Prompt</label>
            <Textarea
              placeholder="Prompt"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              className="min-h-[100px] bg-[#2A2F3C] border-[#3A3F4C] text-white placeholder-gray-400 focus:border-[#9b87f5] focus:ring-[#9b87f5] rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Categoria</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-[#2A2F3C] border-[#3A2F3C] text-white rounded-xl">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1F2C] border-[#2A2F3C] rounded-xl">
                {categories.map((cat) => (
                  <SelectItem 
                    key={cat.value} 
                    value={cat.value}
                    className="text-white hover:bg-[#2A2F3C] cursor-pointer rounded-lg mx-1"
                  >
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleSave} 
            className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white transition-colors rounded-xl"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}