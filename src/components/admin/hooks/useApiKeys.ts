import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { OpenAIModel, OpenRouterModel } from "@/config/aiModels";
import { useApiOperations } from "./useApiOperations";

interface ApiKeys {
  openai_key: string;
  openrouter_key: string;
  selected_openai_model?: OpenAIModel;
  selected_openrouter_model?: OpenRouterModel;
}

export const useApiKeys = () => {
  const [keys, setKeys] = useState<ApiKeys>({
    openai_key: "",
    openrouter_key: "",
  });
  
  const { toast } = useToast();
  const { fetchApiKeys, saveApiKeys } = useApiOperations();

  const fetchKeys = async () => {
    const data = await fetchApiKeys();
    if (data) {
      setKeys({
        openai_key: data.openai_key || "",
        openrouter_key: data.openrouter_key || "",
        selected_openai_model: data.selected_openai_model as OpenAIModel,
        selected_openrouter_model: data.selected_openrouter_model as OpenRouterModel,
      });
    }
  };

  const handleSaveKeys = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!keys.openai_key && !keys.openrouter_key) {
        toast({
          title: "Erro",
          description: "Por favor, forneça pelo menos uma chave API (OpenAI ou OpenRouter)",
          variant: "destructive",
        });
        return;
      }

      const success = await saveApiKeys(keys);
      if (success) {
        toast({
          title: "Sucesso",
          description: "Chaves API salvas com sucesso",
        });
      }
    } catch (error) {
      console.error("Error saving API keys:", error);
      toast({
        title: "Erro",
        description: "Falha ao salvar as chaves API",
        variant: "destructive",
      });
    }
  };

  return {
    keys,
    setKeys,
    fetchApiKeys: fetchKeys,
    handleSaveKeys,
  };
};