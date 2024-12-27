import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import ModelSelector from "./ModelSelector";
import ModelInfo from "./ModelInfo";

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
  { value: "meta-llama-3.2-11b", label: "Meta Llama 3.2 11B Vision" },
  { value: "google-gemini-2.9b", label: "Google Gemini 2.9B" },
  { value: "google-gemini-flash-1.5", label: "Google Gemini Flash 1.5" },
  { value: "meta-llama-3.1-70b", label: "Meta Llama 3.1 70B" },
  { value: "meta-llama-3.1-8b", label: "Meta Llama 3.1 8B" },
  { value: "meta-llama-3.1-405b", label: "Meta Llama 3.1 405B" },
  { value: "nous-hermes-3-405b", label: "Nous Hermes 3 405B" },
];

const openAiMarkdown = `
### Informações do Modelo Selecionado:

O modelo selecionado oferece as seguintes características:

- Processamento avançado de linguagem natural
- Compreensão contextual aprimorada
- Respostas precisas e relevantes
- Suporte a diferentes tipos de tarefas
`;

const openRouterMarkdown = `
### Informações do Modelo Selecionado:

O modelo selecionado oferece as seguintes características:

- Alta performance em processamento de linguagem
- Capacidade de análise contextual
- Suporte a diferentes tipos de entrada
- Otimizado para diferentes casos de uso
`;

const ApiKeyForm = ({ keys, setKeys, onSubmit }: ApiKeyFormProps) => {
  const [showOpenAI, setShowOpenAI] = useState(false);
  const [showOpenRouter, setShowOpenRouter] = useState(false);
  const [selectedOpenAIModel, setSelectedOpenAIModel] = useState("gpt-4-turbo");
  const [selectedOpenRouterModel, setSelectedOpenRouterModel] = useState("meta-llama-3.2-11b");
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
            <ModelSelector
              value={selectedOpenAIModel}
              onChange={setSelectedOpenAIModel}
              models={openAiModels}
              label="Selecione o Modelo OpenAI"
            />
            <ModelInfo markdown={openAiMarkdown} />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-chatgpt-secondary border-chatgpt-border">
        <CardHeader>
          <CardTitle className="text-white text-lg">OpenRouter API Key</CardTitle>
          <CardDescription className="text-gray-400">
            Opcional - Acesso aos modelos Llama, Gemini e outros
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
            <ModelSelector
              value={selectedOpenRouterModel}
              onChange={setSelectedOpenRouterModel}
              models={openRouterModels}
              label="Selecione o Modelo OpenRouter"
            />
            <ModelInfo markdown={openRouterMarkdown} />
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