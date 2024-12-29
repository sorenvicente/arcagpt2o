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
];

const openRouterModels = [
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
];

const ApiKeyForm = ({ keys, setKeys, onSubmit }: ApiKeyFormProps) => {
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
        description="Opcional - Acesso ao GPT-4, GPT-4 Turbo e GPT-4 Vision"
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
        description="Opcional - Acesso gratuito aos modelos Llama 2 (70B, 13B, 7B), Code Llama (70B, 34B, 13B), Gemini Pro, Claude 2, Mistral e outros"
        apiKey={keys.openrouter_key}
        onApiKeyChange={(value) => setKeys({ ...keys, openrouter_key: value })}
        selectedModel={selectedOpenRouterModel}
        onModelChange={setSelectedOpenRouterModel}
        models={openRouterModels}
        modelSelectorLabel="Selecione o Modelo OpenRouter"
        modelListTitle="Modelos Gratuitos Disponíveis"
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