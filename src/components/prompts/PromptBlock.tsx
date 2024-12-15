import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import PromptNameInput from "./form/PromptNameInput";
import PromptDescriptionInput from "./form/PromptDescriptionInput";
import PromptTextArea from "./form/PromptTextArea";
import CategorySelect from "./form/CategorySelect";
import SaveButton from "./form/SaveButton";

export type Category = "proposito" | "metodo" | "mentoria" | "curso" | "conteudo";

export interface PromptBlock {
  id: string;
  name: string;
  description: string | null;
  prompt: string;
  category: Category;
  created_at?: string;
  updated_at?: string;
}

const PromptBlock = () => {
  const [promptData, setPromptData] = useState<Omit<PromptBlock, "id">>({
    name: "",
    description: "",
    prompt: "",
    category: "proposito",
  });
  const { toast } = useToast();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!promptData.name || !promptData.prompt || !promptData.category) {
        toast({
          title: "Erro ao salvar",
          description: "Por favor, preencha todos os campos obrigatórios.",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from("prompt_blocks")
        .insert(promptData);

      if (error) {
        console.error("Erro ao salvar no Supabase:", error);
        toast({
          title: "Erro ao salvar",
          description: "Não foi possível salvar o bloco de prompt.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Prompt salvo",
        description: "O bloco de prompt foi salvo com sucesso.",
      });

      setPromptData({
        name: "",
        description: "",
        prompt: "",
        category: "proposito",
      });
    } catch (error) {
      console.error("Erro inesperado:", error);
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro ao tentar salvar o prompt.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-4 p-4 bg-[#2F2F2F] rounded-lg border border-gray-700">
      <PromptNameInput
        value={promptData.name}
        onChange={(value) => setPromptData({ ...promptData, name: value })}
      />
      
      <PromptDescriptionInput
        value={promptData.description}
        onChange={(value) => setPromptData({ ...promptData, description: value })}
      />
      
      <PromptTextArea
        value={promptData.prompt}
        onChange={(value) => setPromptData({ ...promptData, prompt: value })}
      />
      
      <CategorySelect
        value={promptData.category}
        onChange={(value) => setPromptData({ ...promptData, category: value })}
      />
      
      <SaveButton onClick={() => {}} />
    </form>
  );
};

export default PromptBlock;