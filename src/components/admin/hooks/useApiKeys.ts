import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ApiKeys {
  openai_key: string;
  openrouter_key: string;
}

export const useApiKeys = () => {
  const [keys, setKeys] = useState<ApiKeys>({
    openai_key: "",
    openrouter_key: "",
  });
  const { toast } = useToast();

  const fetchApiKeys = async () => {
    try {
      const { data, error } = await supabase
        .from("api_keys")
        .select("*")
        .limit(1)
        .single();

      if (error) {
        console.error("Error fetching API keys:", error);
        // Don't show error toast for empty results
        if (error.code !== "PGRST116") {
          toast({
            title: "Erro",
            description: "Não foi possível carregar as chaves API.",
            variant: "destructive",
          });
        }
        return;
      }

      if (data) {
        setKeys({
          openai_key: data.openai_key || "",
          openrouter_key: data.openrouter_key || "",
        });
        console.log("API keys loaded successfully");
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Erro",
        description: "Erro ao carregar chaves API. Verifique sua conexão.",
        variant: "destructive",
      });
    }
  };

  const handleSaveKeys = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from("api_keys")
        .upsert({
          openai_key: keys.openai_key,
          openrouter_key: keys.openrouter_key,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        console.error("Error saving keys:", error);
        toast({
          title: "Erro ao salvar",
          description: "Não foi possível salvar as chaves de API.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Chaves salvas",
        description: "As chaves de API foram atualizadas com sucesso.",
      });
      console.log("API keys saved successfully");
    } catch (error) {
      console.error("Error saving keys:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar as chaves. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return { keys, setKeys, fetchApiKeys, handleSaveKeys };
};