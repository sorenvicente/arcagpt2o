import { useState, useEffect } from "react";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ApiKeysManager = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [keys, setKeys] = useState({
    openai_key: "",
    openrouter_key: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    checkAdminStatus();
    if (isAdmin) {
      fetchApiKeys();
    }
  }, [isAdmin]);

  const checkAdminStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.email === "admin@example.com") {
      setIsAdmin(true);
    }
  };

  const fetchApiKeys = async () => {
    const { data, error } = await supabase
      .from("api_keys")
      .select("*")
      .single();

    if (error) {
      console.error("Error fetching API keys:", error);
      return;
    }

    if (data) {
      setKeys({
        openai_key: data.openai_key || "",
        openrouter_key: data.openrouter_key || "",
      });
    }
  };

  const handleSaveKeys = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase
      .from("api_keys")
      .upsert({
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
  };

  if (!isAdmin) return null;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Gerenciamento de APIs
        </CardTitle>
        <CardDescription>
          Configure as chaves de API para OpenAI e OpenRouter
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSaveKeys} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="openai" className="text-sm font-medium">
              OpenAI API Key
            </label>
            <Input
              id="openai"
              type="password"
              value={keys.openai_key}
              onChange={(e) => setKeys({ ...keys, openai_key: e.target.value })}
              placeholder="sk-..."
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="openrouter" className="text-sm font-medium">
              OpenRouter API Key
            </label>
            <Input
              id="openrouter"
              type="password"
              value={keys.openrouter_key}
              onChange={(e) => setKeys({ ...keys, openrouter_key: e.target.value })}
              placeholder="sk-..."
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">
            Salvar Chaves
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ApiKeysManager;