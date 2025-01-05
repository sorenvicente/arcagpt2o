import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CategorySelect } from "./CategorySelect";

export function PromptForm() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [prompt, setPrompt] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingCategories, setExistingCategories] = useState<string[]>([]);

  useEffect(() => {
    const loadExistingCategories = async () => {
      const { data, error } = await supabase
        .from('prompt_blocks')
        .select('category');
      
      if (!error && data) {
        const categories = data.map(item => item.category);
        setExistingCategories(categories);
      }
    };

    loadExistingCategories();
  }, []);

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

    // Check if trying to create a second "Personalizar ChatGPT" prompt
    if (category === "personalizar_chatgpt" && existingCategories.includes("personalizar_chatgpt")) {
      toast({
        title: "Erro",
        description: "Já existe um prompt de Personalização do ChatGPT. Você pode editá-lo, mas não criar outro.",
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
        .select();

      if (error) throw error;
      
      toast({
        title: "Sucesso",
        description: "Prompt criado com sucesso!",
      });

      // Reset form
      setName("");
      setDescription("");
      setPrompt("");
      setCategory("");

      // Force a reload of the prompts list by triggering a DOM event
      const event = new CustomEvent('promptCreated', { detail: data?.[0] });
      window.dispatchEvent(event);
      
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
          className="bg-chatgpt-input border-chatgpt-border text-white rounded-xl"
        />
      </div>
      
      <div>
        <Input
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-chatgpt-input border-chatgpt-border text-white rounded-xl"
        />
      </div>
      
      <div>
        <Textarea
          placeholder="Prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[100px] bg-chatgpt-input border-chatgpt-border text-white rounded-xl"
        />
      </div>
      
      <CategorySelect 
        value={category} 
        onValueChange={setCategory} 
        existingCategories={existingCategories}
      />

      <Button 
        type="submit" 
        className="w-full bg-chatgpt-input hover:bg-chatgpt-hover text-white border border-chatgpt-border rounded-xl"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Criando..." : "Criar Prompt"}
      </Button>
    </form>
  );
}