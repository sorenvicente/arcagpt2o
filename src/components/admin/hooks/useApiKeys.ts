import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { OpenAIModel, OpenRouterModel } from "@/config/aiModels";

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

  const fetchApiKeys = async () => {
    try {
      // Changed from .single() to .limit(1) to get the most recent API key
      const { data, error } = await supabase
        .from("api_keys")
        .select("*")
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error("Error fetching API keys:", error);
        toast({
          title: "Erro",
          description: "Falha ao buscar as chaves API",
          variant: "destructive",
        });
        return;
      }

      if (data && data.length > 0) {
        console.log("Fetched API keys:", data[0]); // Debug log
        setKeys({
          openai_key: data[0].openai_key || "",
          openrouter_key: data[0].openrouter_key || "",
          selected_openai_model: data[0].selected_openai_model as OpenAIModel,
          selected_openrouter_model: data[0].selected_openrouter_model as OpenRouterModel,
        });
      }
    } catch (error: any) {
      console.error("Error fetching API keys:", error);
      toast({
        title: "Erro",
        description: "Falha ao buscar as chaves API",
        variant: "destructive",
      });
    }
  };

  const handleSaveKeys = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Saving keys:", keys); // Debug log

      const { data: existingKeys } = await supabase
        .from("api_keys")
        .select("*")
        .order('created_at', { ascending: false })
        .limit(1);

      const dataToSave = {
        openai_key: keys.openai_key.trim(),
        openrouter_key: keys.openrouter_key.trim(),
        selected_openai_model: keys.selected_openai_model,
        selected_openrouter_model: keys.selected_openrouter_model,
        updated_at: new Date().toISOString(),
      };

      console.log("Data to save:", dataToSave); // Debug log

      if (existingKeys && existingKeys.length > 0) {
        const { error } = await supabase
          .from("api_keys")
          .update(dataToSave)
          .eq("id", existingKeys[0].id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("api_keys")
          .insert([dataToSave]);

        if (error) throw error;
      }

      toast({
        title: "Sucesso",
        description: "Chaves API salvas com sucesso",
      });
    } catch (error: any) {
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
    fetchApiKeys,
    handleSaveKeys,
  };
};