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
          description: "Você precisa estar logado como administrador para acessar as chaves API.",
          variant: "destructive",
        });
        return;
      }

      console.log("Fetching API keys for user:", session.user.email);

      const { data, error } = await supabase
        .from("api_keys")
        .select("*")
        .limit(1)
        .single();

      if (error) {
        console.error("Error fetching API keys:", error);
        
        if (error.code === "42501") {
          toast({
            title: "Acesso Negado",
            description: "Você não tem permissão de administrador para acessar as chaves API.",
            variant: "destructive",
          });
          return;
        }
        
        if (error.code !== "PGRST116") {
          toast({
            title: "Erro",
            description: "Não foi possível carregar as chaves API. Verifique se você está logado como administrador.",
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
        description: "Erro ao carregar chaves API. Verifique sua conexão e permissões.",
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
          description: "Você precisa estar logado como administrador para salvar as chaves API.",
          variant: "destructive",
        });
        return;
      }

      console.log("Saving API keys for user:", session.user.email);

      const { error } = await supabase
        .from("api_keys")
        .upsert({
          openai_key: keys.openai_key,
          openrouter_key: keys.openrouter_key,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        console.error("Error saving keys:", error);
        if (error.code === "42501") {
          toast({
            title: "Acesso Negado",
            description: "Você não tem permissão de administrador para salvar chaves API.",
            variant: "destructive",
          });
          return;
        }
        toast({
          title: "Erro ao salvar",
          description: "Não foi possível salvar as chaves de API. Verifique suas permissões.",
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