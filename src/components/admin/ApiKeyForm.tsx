import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ApiKeySection from "./ApiKeySection";

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
  { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
  { value: "gpt-3.5-turbo-16k", label: "GPT-3.5 Turbo 16K" },
];

const openRouterModels = [
  // Modelos Gratuitos
  { value: "meta-llama/llama-3.1-405b-instruct:free", label: "Meta Llama 3.1 405B (Free)" },
  { value: "meta-llama/llama-2-70b-chat", label: "Meta Llama 2 70B (Free)" },
  { value: "meta-llama/llama-2-13b-chat", label: "Meta Llama 2 13B (Free)" },
  { value: "meta-llama/llama-2-7b-chat", label: "Meta Llama 2 7B (Free)" },
  { value: "meta-llama/codellama-34b-instruct", label: "Code Llama 34B (Free)" },
  { value: "meta-llama/codellama-70b-instruct", label: "Code Llama 70B (Free)" },
  { value: "meta-llama/llama-2-13b-code-instruct", label: "Llama 2 13B Code (Free)" },
  { value: "google/gemini-pro", label: "Google Gemini Pro (Free)" },
  { value: "anthropic/claude-2", label: "Anthropic Claude 2 (Free)" },
  { value: "mistral/mistral-7b", label: "Mistral 7B (Free)" },
  { value: "mistral/mixtral-8x7b", label: "Mixtral 8x7B (Free)" },
  
  // Modelos Pagos - OpenAI via OpenRouter
  { value: "openai/gpt-4-1106-preview", label: "GPT-4 Turbo (OpenRouter)" },
  { value: "openai/gpt-4-vision-preview", label: "GPT-4 Vision (OpenRouter)" },
  { value: "openai/gpt-4", label: "GPT-4 (OpenRouter)" },
  { value: "openai/gpt-3.5-turbo", label: "GPT-3.5 Turbo (OpenRouter)" },
  
  // Outros Modelos Pagos Populares
  { value: "anthropic/claude-3-opus", label: "Claude 3 Opus (Paid)" },
  { value: "anthropic/claude-3-sonnet", label: "Claude 3 Sonnet (Paid)" },
  { value: "anthropic/claude-3-haiku", label: "Claude 3 Haiku (Paid)" },
  { value: "google/gemini-pro-vision", label: "Gemini Pro Vision (Paid)" },
  { value: "google/gemini-ultra", label: "Gemini Ultra (Paid)" },
  { value: "mistral/mistral-large", label: "Mistral Large (Paid)" },
  { value: "mistral/mistral-medium", label: "Mistral Medium (Paid)" },
  { value: "mistral/mistral-small", label: "Mistral Small (Paid)" },
];

const ApiKeyForm = ({ keys, setKeys, onSubmit }: ApiKeyFormProps) => {
  const [selectedOpenAIModel, setSelectedOpenAIModel] = useState("gpt-4-turbo");
  const [selectedOpenRouterModel, setSelectedOpenRouterModel] = useState("meta-llama/llama-3.1-405b-instruct:free");
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

  const openRouterExtraContent = (
    <div className="text-sm text-gray-400 mt-2">
      <p>Observação: OpenRouter oferece créditos gratuitos para testar vários modelos de IA.</p>
      <p>Você pode obter sua chave API gratuita em <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">openrouter.ai/keys</a></p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ApiKeySection
        title="OpenAI API Key"
        description="Opcional - Acesso ao GPT-4, GPT-4 Turbo, GPT-4 Vision e GPT-3.5 Turbo"
        apiKey={keys.openai_key}
        onApiKeyChange={(value) => setKeys({ ...keys, openai_key: value })}
        selectedModel={selectedOpenAIModel}
        onModelChange={setSelectedOpenAIModel}
        models={openAiModels}
        modelSelectorLabel="Selecione o Modelo OpenAI"
        modelListTitle="Modelos Disponíveis"
      />

      <ApiKeySection
        title="OpenRouter API Key"
        description="Opcional - Acesso a modelos gratuitos e pagos: Llama, Claude, Gemini, Mistral e outros"
        apiKey={keys.openrouter_key}
        onApiKeyChange={(value) => setKeys({ ...keys, openrouter_key: value })}
        selectedModel={selectedOpenRouterModel}
        onModelChange={setSelectedOpenRouterModel}
        models={openRouterModels}
        modelSelectorLabel="Selecione o Modelo OpenRouter"
        modelListTitle="Modelos Disponíveis (Gratuitos e Pagos)"
        extraContent={openRouterExtraContent}
      />

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