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
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function PromptCreator() {
  useAuth(); // This will ensure the user is authenticated
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [prompt, setPrompt] = useState("");
  const [category, setCategory] = useState("");
  const [createdPromptId, setCreatedPromptId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!name || !description || !prompt || !category) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('prompt_blocks')
        .insert({
          name,
          description,
          prompt,
          category,
        })
        .select()
        .single();

      if (error) throw error;

      setCreatedPromptId(data.id);
      
      toast({
        title: "Sucesso",
        description: "Prompt criado com sucesso!",
      });

      // Reset form
      setName("");
      setDescription("");
      setPrompt("");
      setCategory("");
    } catch (error) {
      console.error('Error creating prompt:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o prompt.",
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          placeholder="Nome do Prompt"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-chatgpt-input border-chatgpt-border text-white"
        />
      </div>
      
      <div>
        <Input
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-chatgpt-input border-chatgpt-border text-white"
        />
      </div>
      
      <div>
        <Textarea
          placeholder="Prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[100px] bg-chatgpt-input border-chatgpt-border text-white"
        />
      </div>
      
      <div>
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
      </div>

      {createdPromptId && (
        <div className="border-t border-chatgpt-border pt-4">
          <h3 className="text-sm font-medium text-white mb-2">Arquivos de Treinamento</h3>
          <FileUpload promptId={createdPromptId} />
          <FileList promptId={createdPromptId} />
        </div>
      )}

      <Button 
        type="submit" 
        className="w-full bg-chatgpt-input hover:bg-chatgpt-hover text-white border border-chatgpt-border"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Criando..." : "Criar Prompt"}
      </Button>
    </form>
  );
}