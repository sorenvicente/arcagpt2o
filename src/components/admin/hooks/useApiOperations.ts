import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { OpenAIModel, OpenRouterModel } from "@/config/aiModels";
import { useAuthCheck } from "./useAuthCheck";

interface ApiKeys {
  openai_key: string;
  openrouter_key: string;
  selected_openai_model?: OpenAIModel;
  selected_openrouter_model?: OpenRouterModel;
}

export const useApiOperations = () => {
  const { toast } = useToast();
  const { checkSession, handleAuthError } = useAuthCheck();

  const fetchApiKeys = async () => {
    try {
      console.log('Fetching API keys...');
      if (!await checkSession()) return null;

      const { data, error } = await supabase
        .from("api_keys")
        .select("*")
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        if (error.message.includes('jwt expired') || error.code === '401') {
          handleAuthError();
          return null;
        }
        console.error("Error fetching API keys:", error);
        toast({
          title: "Erro",
          description: "Falha ao buscar as chaves API",
          variant: "destructive",
        });
        return null;
      }

      console.log("Fetched API key:", data);
      return data;
    } catch (error: any) {
      console.error("Error fetching API keys:", error);
      if (error.message?.includes('jwt expired') || error.status === 401) {
        handleAuthError();
        return null;
      }
      toast({
        title: "Erro",
        description: "Falha ao buscar as chaves API",
        variant: "destructive",
      });
      return null;
    }
  };

  const saveApiKeys = async (keys: ApiKeys) => {
    try {
      if (!await checkSession()) return false;

      const { data: existingKeys, error: fetchError } = await supabase
        .from("api_keys")
        .select("*")
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (fetchError) {
        if (fetchError.message.includes('jwt expired') || fetchError.code === '401') {
          handleAuthError();
          return false;
        }
        throw fetchError;
      }

      const dataToSave = {
        openai_key: keys.openai_key.trim(),
        openrouter_key: keys.openrouter_key.trim(),
        selected_openai_model: keys.selected_openai_model,
        selected_openrouter_model: keys.selected_openrouter_model,
        updated_at: new Date().toISOString(),
      };

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
          return false;
        }
        throw saveError;
      }

      return true;
    } catch (error: any) {
      console.error("Error saving API keys:", error);
      if (error.message?.includes('jwt expired') || error.status === 401) {
        handleAuthError();
        return false;
      }
      throw error;
    }
  };

  return {
    fetchApiKeys,
    saveApiKeys,
  };
};