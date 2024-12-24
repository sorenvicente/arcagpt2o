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
        if (error.code === 'PGRST116') {
          // No records found, this is fine for new installations
          return;
        }
        throw error;
      }

      if (data) {
        setKeys({
          openai_key: data.openai_key || "",
          openrouter_key: data.openrouter_key || "",
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
      const { data: existingKeys } = await supabase
        .from("api_keys")
        .select("*")
        .limit(1)
        .single();

      if (existingKeys) {
        const { error } = await supabase
          .from("api_keys")
          .update({
            openai_key: keys.openai_key.trim(),
            openrouter_key: keys.openrouter_key.trim(),
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingKeys.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("api_keys").insert([
          {
            openai_key: keys.openai_key.trim(),
            openrouter_key: keys.openrouter_key.trim(),
          },
        ]);

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