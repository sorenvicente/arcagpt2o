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
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Erro de Autenticação",
          description: "Você precisa estar logado para acessar as chaves API.",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from("api_keys")
        .select("*")
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          return;
        }
        console.error("Error fetching API keys:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar as chaves API.",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        setKeys({
          openai_key: data.openai_key || "",
          openrouter_key: data.openrouter_key || "",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Erro",
        description: "Erro ao carregar chaves API.",
        variant: "destructive",
      });
    }
  };

  const handleSaveKeys = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Erro de Autenticação",
          description: "Você precisa estar logado para salvar as chaves API.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from("api_keys")
        .upsert({
          id: crypto.randomUUID(),
          openai_key: keys.openai_key,
          openrouter_key: keys.openrouter_key,
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
    } catch (error) {
      console.error("Error saving keys:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar as chaves.",
        variant: "destructive",
      });
    }
  };

  return { keys, setKeys, fetchApiKeys, handleSaveKeys };
};