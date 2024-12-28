import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import ModelSelector from "./ModelSelector";

interface ApiKeyFormProps {
  keys: {
    openai_key: string;
    openrouter_key: string;
  };
  setKeys: React.Dispatch<React.SetStateAction<{
    openai_key: string;
    openrouter_key: string;
  }>>;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

const openAiModels = [
  { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
  { value: "gpt-4", label: "GPT-4" },
  { value: "gpt-4-vision", label: "GPT-4 Vision" },
];

const openRouterModels = [
  { value: "meta-llama/llama-2-70b-chat", label: "Meta Llama 2 70B (Free)" },
  { value: "meta-llama/llama-2-13b-chat", label: "Meta Llama 2 13B (Free)" },
  { value: "meta-llama/llama-2-7b-chat", label: "Meta Llama 2 7B (Free)" },
  { value: "google/gemini-pro", label: "Google Gemini Pro (Free)" },
  { value: "anthropic/claude-2", label: "Anthropic Claude 2 (Free)" },
  { value: "mistral/mistral-7b", label: "Mistral 7B (Free)" },
  { value: "mistral/mixtral-8x7b", label: "Mixtral 8x7B (Free)" },
];

const ApiKeyForm = ({ keys, setKeys, onSubmit }: ApiKeyFormProps) => {
  const [showOpenAI, setShowOpenAI] = useState(false);
  const [showOpenRouter, setShowOpenRouter] = useState(false);
  const [selectedOpenAIModel, setSelectedOpenAIModel] = useState("gpt-4-turbo");
  const [selectedOpenRouterModel, setSelectedOpenRouterModel] = useState("meta-llama/llama-2-70b-chat");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!keys.openai_key && !keys.openrouter_key) {
      toast({
        title: "Erro",
        description: "Por favor, forneça pelo menos uma chave API (OpenAI ou OpenRouter)",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="bg-chatgpt-secondary border-chatgpt-border">
        <CardHeader>
          <CardTitle className="text-white text-lg">OpenAI API Key</CardTitle>
          <CardDescription className="text-gray-400">
            Opcional - Acesso ao GPT-4, GPT-4 Turbo e GPT-4 Vision
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Input
                type={showOpenAI ? "text" : "password"}
                value={keys.openai_key}
                onChange={(e) => setKeys({ ...keys, openai_key: e.target.value })}
                placeholder="sk-..."
                className="w-full bg-chatgpt-main border-chatgpt-border text-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowOpenAI(!showOpenAI)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showOpenAI ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-chatgpt-secondary border-chatgpt-border">
        <CardHeader>
          <CardTitle className="text-white text-lg">OpenRouter API Key</CardTitle>
          <CardDescription className="text-gray-400">
            Opcional - Acesso gratuito aos modelos Llama 2 (70B, 13B, 7B), Gemini Pro, Claude 2, Mistral e outros
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Input
                type={showOpenRouter ? "text" : "password"}
                value={keys.openrouter_key}
                onChange={(e) => setKeys({ ...keys, openrouter_key: e.target.value })}
                placeholder="sk-..."
                className="w-full bg-chatgpt-main border-chatgpt-border text-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowOpenRouter(!showOpenRouter)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showOpenRouter ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <div className="text-sm text-gray-400 mt-2">
              <p>Observação: OpenRouter oferece créditos gratuitos para testar vários modelos de IA.</p>
              <p>Você pode obter sua chave API gratuita em <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">openrouter.ai/keys</a></p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button 
        type="submit" 
        className="w-full bg-chatgpt-secondary hover:bg-chatgpt-hover text-white border border-chatgpt-border"
      >
        Salvar Chaves
      </Button>
    </form>
  );
};

export default ApiKeyForm;