import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUpload } from "./FileUpload";
import { FileList } from "./FileList";

export function PromptCreator() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [prompt, setPrompt] = useState("");
  const [category, setCategory] = useState("");
  const [createdPromptId, setCreatedPromptId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !prompt || !category) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    const savedPrompts = localStorage.getItem('prompts');
    const prompts = savedPrompts ? JSON.parse(savedPrompts) : [];
    
    const newPrompt = {
      id: Date.now(),
      name,
      description,
      prompt,
      category,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('prompts', JSON.stringify([...prompts, newPrompt]));
    
    // Dispatch storage event para atualizar outros componentes
    window.dispatchEvent(new Event('storage'));

    toast({
      title: "Sucesso",
      description: "Prompt criado com sucesso!",
    });

    setCreatedPromptId(newPrompt.id.toString());
  };

  const categories = [
    { value: "propósito", label: "Propósito" },
    { value: "método", label: "Método" },
    { value: "mentoria", label: "Mentoria" },
    { value: "curso", label: "Curso" },
    { value: "conteudo", label: "Conteúdo" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          placeholder="Nome do Prompt"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      
      <div>
        <Input
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      
      <div>
        <Textarea
          placeholder="Prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[100px]"
        />
      </div>
      
      <div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {createdPromptId && (
        <div className="border-t pt-4">
          <h3 className="text-sm font-medium mb-2">Arquivos de Treinamento</h3>
          <FileUpload promptId={createdPromptId} />
          <FileList promptId={createdPromptId} />
        </div>
      )}

      <Button type="submit" className="w-full">
        Criar Prompt
      </Button>
    </form>
  );
}