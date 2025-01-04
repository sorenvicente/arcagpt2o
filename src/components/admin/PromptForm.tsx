import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CategorySelect } from "./CategorySelect";

interface PromptFormProps {
  onSuccess: (promptId: string) => void;
}

export function PromptForm({ onSuccess }: PromptFormProps) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [prompt, setPrompt] = useState("");
  const [category, setCategory] = useState("");
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

      onSuccess(data.id);
      
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
      
      <CategorySelect value={category} onValueChange={setCategory} />

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