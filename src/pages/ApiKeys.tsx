import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ApiKeysPage = () => {
  const { toast } = useToast();
  const [keys, setKeys] = useState({
    openai_key: "",
    openrouter_key: "",
  });
  const [selectedModel, setSelectedModel] = useState("openai");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("api_keys")
        .upsert({
          openai_key: keys.openai_key,
          openrouter_key: keys.openrouter_key,
        });

      if (error) throw error;

      localStorage.setItem("selectedModel", selectedModel);

      toast({
        title: "Sucesso!",
        description: "Chaves API e preferências salvas com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Erro ao salvar as chaves API.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-chatgpt-main p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-white">Gerenciar Chaves API</h1>
        
        <div className="bg-chatgpt-secondary rounded-lg p-6 border border-chatgpt-border">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="model" className="text-sm font-medium text-white">
                Modelo Padrão
              </label>
              <Select
                value={selectedModel}
                onValueChange={setSelectedModel}
              >
                <SelectTrigger className="w-full bg-chatgpt-secondary border-chatgpt-border text-white">
                  <SelectValue placeholder="Selecione o modelo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openai">OpenAI (GPT-4)</SelectItem>
                  <SelectItem value="openrouter">OpenRouter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="openai" className="text-sm font-medium text-white">
                OpenAI API Key
              </label>
              <Input
                id="openai"
                type="password"
                value={keys.openai_key}
                onChange={(e) => setKeys({ ...keys, openai_key: e.target.value })}
                placeholder="sk-..."
                className="w-full bg-chatgpt-secondary border-chatgpt-border text-white"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="openrouter" className="text-sm font-medium text-white">
                OpenRouter API Key
              </label>
              <Input
                id="openrouter"
                type="password"
                value={keys.openrouter_key}
                onChange={(e) => setKeys({ ...keys, openrouter_key: e.target.value })}
                placeholder="sk-..."
                className="w-full bg-chatgpt-secondary border-chatgpt-border text-white"
              />
            </div>
            
            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-chatgpt-secondary hover:bg-chatgpt-hover text-white border border-chatgpt-border"
            >
              {isLoading ? "Salvando..." : "Salvar Chaves"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApiKeysPage;