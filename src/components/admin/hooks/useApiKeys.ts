import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { OpenAIModel, OpenRouterModel } from "@/config/aiModels";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleAuthError = () => {
    toast({
      title: "Sessão expirada",
      description: "Por favor, faça login novamente.",
      variant: "destructive",
    });
    navigate('/login');
  };

  const fetchApiKeys = async () => {
    try {
      console.log('Fetching API keys...');
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        handleAuthError();
        return;
      }

      const { data, error } = await supabase
        .from("api_keys")
        .select("*")
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        if (error.message.includes('jwt expired') || error.code === '401') {
          handleAuthError();
          return;
        }
        console.error("Error fetching API keys:", error);
        toast({
          title: "Erro",
          description: "Falha ao buscar as chaves API",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        console.log("Fetched API key:", data);
        setKeys({
          openai_key: data.openai_key || "",
          openrouter_key: data.openrouter_key || "",
          selected_openai_model: data.selected_openai_model as OpenAIModel,
          selected_openrouter_model: data.selected_openrouter_model as OpenRouterModel,
        });
      } else {
        console.log("No API keys found");
        setKeys({
          openai_key: "",
          openrouter_key: "",
        });
      }
    } catch (error: any) {
      console.error("Error fetching API keys:", error);
      if (error.message?.includes('jwt expired') || error.status === 401) {
        handleAuthError();
        return;
      }
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
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        handleAuthError();
        return;
      }

      console.log("Saving keys:", keys);

      const { data: existingKeys, error: fetchError } = await supabase
        .from("api_keys")
        .select("*")
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (fetchError) {
        if (fetchError.message.includes('jwt expired') || fetchError.code === '401') {
          handleAuthError();
          return;
        }
        console.error("Error fetching existing keys:", fetchError);
        throw fetchError;
      }

      const dataToSave = {
        openai_key: keys.openai_key.trim(),
        openrouter_key: keys.openrouter_key.trim(),
        selected_openai_model: keys.selected_openai_model,
        selected_openrouter_model: keys.selected_openrouter_model,
        updated_at: new Date().toISOString(),
      };

      console.log("Data to save:", dataToSave);

      let saveError;
      if (existingKeys) {
        const { error } = await supabase
          .from("api_keys")
          .update(dataToSave)
          .eq("id", existingKeys.id);
        saveError = error;
      } else {
        const { error } = await supabase
          .from("api_keys")
          .insert([dataToSave]);
        saveError = error;
      }

      if (saveError) {
        if (saveError.message.includes('jwt expired') || saveError.code === '401') {
          handleAuthError();
          return;
        }
        throw saveError;
      }

      toast({
        title: "Sucesso",
        description: "Chaves API salvas com sucesso",
      });
    } catch (error: any) {
      console.error("Error saving API keys:", error);
      if (error.message?.includes('jwt expired') || error.status === 401) {
        handleAuthError();
        return;
      }
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