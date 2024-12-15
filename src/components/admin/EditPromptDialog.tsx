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

interface EditPromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prompt: {
    id: number;
    name: string;
    description: string;
    prompt: string;
    category: string;
  };
}

export function EditPromptDialog({ open, onOpenChange, prompt }: EditPromptDialogProps) {
  const { toast } = useToast();
  const [name, setName] = useState(prompt.name);
  const [description, setDescription] = useState(prompt.description);
  const [promptText, setPromptText] = useState(prompt.prompt);
  const [category, setCategory] = useState(prompt.category);

  const handleSave = () => {
    if (!name || !description || !promptText || !category) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    const savedPrompts = localStorage.getItem('prompts');
    const prompts = savedPrompts ? JSON.parse(savedPrompts) : [];
    
    const updatedPrompts = prompts.map((p: any) => 
      p.id === prompt.id 
        ? { ...p, name, description, prompt: promptText, category }
        : p
    );

    localStorage.setItem('prompts', JSON.stringify(updatedPrompts));
    window.dispatchEvent(new Event('storage'));

    toast({
      title: "Sucesso",
      description: "Prompt atualizado com sucesso!",
    });

    onOpenChange(false);
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

          <Button 
            onClick={handleSave} 
            className="w-full bg-chatgpt-input hover:bg-chatgpt-hover text-white border border-chatgpt-border"
          >
            Salvar Alterações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}