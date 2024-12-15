import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const ApiKeysPage = () => {
  const { toast } = useToast();
  const [keys, setKeys] = useState({
    openai_key: "",
    openrouter_key: "",
  });

  useEffect(() => {
    const savedKeys = localStorage.getItem("api_keys");
    if (savedKeys) {
      setKeys(JSON.parse(savedKeys));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("api_keys", JSON.stringify(keys));
    toast({
      title: "Sucesso!",
      description: "Chaves API salvas com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-chatgpt-main p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-white">Gerenciar Chaves API</h1>
        
        <div className="bg-chatgpt-secondary rounded-lg p-6 border border-chatgpt-border">
          <form onSubmit={handleSubmit} className="space-y-4">
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
              className="w-full bg-chatgpt-secondary hover:bg-chatgpt-hover text-white border border-chatgpt-border"
            >
              Salvar Chaves
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApiKeysPage;