import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";
import PromptNameInput from "./form/PromptNameInput";
import PromptDescriptionInput from "./form/PromptDescriptionInput";
import PromptTextArea from "./form/PromptTextArea";
import CategorySelect from "./form/CategorySelect";
import SaveButton from "./form/SaveButton";

export type Category = "proposito" | "metodo" | "mentoria" | "curso" | "conteudo";

interface PromptFormData {
  name: string;
  description: string;
  prompt: string;
  category: Category;
}

export interface PromptBlockType {
  id: string;
  name: string;
  description: string | null;
  prompt: string;
  category: Category;
  created_at: string;
  updated_at: string;
}

export const PromptBlock = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<PromptFormData>({
    defaultValues: {
      name: "",
      description: "",
      prompt: "",
      category: "proposito",
    },
  });

  const handleSave = async (data: PromptFormData) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from("prompt_blocks")
        .insert([data])
        .select();

      if (error) throw error;

      toast({
        title: "Prompt salvo com sucesso!",
        description: "O prompt foi adicionado à lista.",
      });

      form.reset();
    } catch (error: any) {
      console.error("Erro ao salvar prompt:", error);
      toast({
        title: "Erro ao salvar prompt",
        description: error.message || "Não foi possível salvar o prompt.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6 bg-[#1A1F2C] p-6 rounded-lg">
        <PromptNameInput 
          value={form.watch("name")}
          onChange={(value) => form.setValue("name", value)}
        />
        
        <PromptDescriptionInput 
          value={form.watch("description")}
          onChange={(value) => form.setValue("description", value)}
        />
        
        <PromptTextArea 
          value={form.watch("prompt")}
          onChange={(value) => form.setValue("prompt", value)}
        />
        
        <CategorySelect 
          value={form.watch("category")}
          onChange={(value) => form.setValue("category", value)}
        />
        
        <SaveButton onClick={form.handleSubmit(handleSave)} />
      </form>
    </Form>
  );
};