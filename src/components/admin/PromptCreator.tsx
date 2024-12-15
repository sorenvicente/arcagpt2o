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

export function PromptCreator() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [prompt, setPrompt] = useState("");
  const [category, setCategory] = useState("");

  const generatePromptName = (description: string) => {
    // Generate a name based on the first few words of the description
    const words = description.split(' ').slice(0, 3);
    return words.join(' ') + '...';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!description || !prompt || !category) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    // Generate a name if not provided
    const promptName = name || generatePromptName(description);

    const savedPrompts = localStorage.getItem('prompts');
    const prompts = savedPrompts ? JSON.parse(savedPrompts) : [];
    
    const newPrompt = {
      id: Date.now(),
      name: promptName,
      description,
      prompt,
      category: category.toLowerCase(),
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('prompts', JSON.stringify([...prompts, newPrompt]));
    
    // Dispatch storage event para atualizar outros componentes
    window.dispatchEvent(new Event('storage'));

    toast({
      title: "Sucesso",
      description: "Prompt criado e salvo na barra lateral!",
    });

    // Limpar formulário
    setName("");
    setDescription("");
    setPrompt("");
    setCategory("");
  };

  const categories = [
    { value: "propósito", label: "Propósito" },
    { value: "método", label: "Método" },
    { value: "mentoria", label: "Mentoria" },
    { value: "curso", label: "Curso" },
    { value: "conteudo", label: "Conteúdo" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Input
          placeholder="Nome do Prompt (opcional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Input
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Textarea
          placeholder="Prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[100px]"
        />
      </div>
      
      <div className="space-y-2">
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

      <Button type="submit" className="w-full">
        Criar Prompt
      </Button>
    </form>
  );
}