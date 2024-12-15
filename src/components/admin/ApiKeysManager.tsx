import { useState, useEffect } from "react";
import { Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ApiKeyForm from "./ApiKeyForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ApiKeysManager = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [keys, setKeys] = useState({
    openai_key: "",
    openrouter_key: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    checkAdminStatus();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchApiKeys();
    }
  }, [isAdmin]);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Acesso Negado",
          description: "Você precisa estar logado como administrador.",
          variant: "destructive",
        });
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
        return;
      }

      if (profile?.role === 'admin') {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchApiKeys = async () => {
    try {
      const { data, error } = await supabase
        .from("api_keys")
        .select("*")
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // No data found, this is fine for new installations
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
    }
  };

  const handleSaveKeys = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from("api_keys")
        .upsert({
          id: "1", // Changed from number to string
          openai_key: keys.openai_key,
          openrouter_key: keys.openrouter_key,
        });

      if (error) {
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-white">Carregando...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-chatgpt-main border-chatgpt-border">
        <CardHeader>
          <CardTitle className="text-white">Acesso Restrito</CardTitle>
          <CardDescription className="text-gray-400">
            Esta área é restrita a administradores.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-chatgpt-main border-chatgpt-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Shield className="h-5 w-5" />
          Gerenciamento de APIs
        </CardTitle>
        <CardDescription className="text-gray-400">
          Configure as chaves de API para OpenAI e OpenRouter
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ApiKeyForm 
          keys={keys} 
          setKeys={setKeys} 
          onSubmit={handleSaveKeys} 
        />
      </CardContent>
    </Card>
  );
};

export default ApiKeysManager;