import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
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
import { FileUpload } from "./FileUpload";
import { FileList } from "./FileList";
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
    { value: "propósito", label: "Propósito" },
    { value: "método", label: "Método" },
    { value: "mentoria", label: "Mentoria" },
    { value: "curso", label: "Curso" },
    { value: "conteudo", label: "Conteúdo" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-chatgpt-secondary border-chatgpt-border">
        <DialogHeader>
          <DialogTitle className="text-white">Editar Prompt</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Nome do Prompt"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-chatgpt-input border-chatgpt-border text-white"
          />
          
          <Input
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-chatgpt-input border-chatgpt-border text-white"
          />
          
          <Textarea
            placeholder="Prompt"
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            className="min-h-[100px] bg-chatgpt-input border-chatgpt-border text-white"
          />
          
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="bg-chatgpt-input border-chatgpt-border text-white">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent className="bg-chatgpt-secondary border-chatgpt-border">
              {categories.map((cat) => (
                <SelectItem 
                  key={cat.value} 
                  value={cat.value}
                  className="text-white hover:bg-chatgpt-hover cursor-pointer"
                >
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="border-t border-chatgpt-border pt-4">
            <h3 className="text-sm font-medium text-white mb-2">Arquivos de Treinamento</h3>
            <FileUpload promptId={prompt.id} />
            <FileList promptId={prompt.id} />
          </div>

          <Button 
            onClick={handleSave} 
            className="w-full bg-chatgpt-input hover:bg-chatgpt-hover text-white border border-chatgpt-border"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}