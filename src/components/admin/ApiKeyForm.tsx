import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import ApiKeySection from "./ApiKeySection";
import { openAiModels, openRouterModels, OpenAIModel, OpenRouterModel, ModelOption } from "@/config/aiModels";
import { supabase } from "@/integrations/supabase/client";

interface ApiKeyFormProps {
  keys: {
    openai_key: string;
    openrouter_key: string;
    selected_openai_model?: OpenAIModel;
    selected_openrouter_model?: OpenRouterModel;
  };
  setKeys: React.Dispatch<React.SetStateAction<{
    openai_key: string;
    openrouter_key: string;
    selected_openai_model?: OpenAIModel;
    selected_openrouter_model?: OpenRouterModel;
  }>>;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

const ApiKeyForm = ({ keys, setKeys, onSubmit }: ApiKeyFormProps) => {
  const [selectedOpenAIModel, setSelectedOpenAIModel] = useState<OpenAIModel>(
    keys.selected_openai_model || openAiModels[0].value
  );
  const [selectedOpenRouterModel, setSelectedOpenRouterModel] = useState<OpenRouterModel>(
    keys.selected_openrouter_model || openRouterModels[0].value
  );
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!keys.openai_key && !keys.openrouter_key) {
      toast({
        title: "Erro",
        description: "Por favor, forneça pelo menos uma chave API (OpenAI ou OpenRouter)",
        variant: "destructive",
      });
      return;
    }

    try {
      // Atualiza os modelos selecionados antes de salvar
      const updatedKeys = {
        ...keys,
        selected_openai_model: selectedOpenAIModel,
        selected_openrouter_model: selectedOpenRouterModel,
      };
      setKeys(updatedKeys);
      
      await onSubmit(e);

      toast({
        title: "Sucesso",
        description: "Configurações salvas com sucesso",
      });
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      toast({
        title: "Erro",
        description: "Falha ao salvar as configurações",
        variant: "destructive",
      });
    }
  };

  const handleOpenAIModelChange = (value: string) => {
    setSelectedOpenAIModel(value as OpenAIModel);
  };

  const handleOpenRouterModelChange = (value: string) => {
    setSelectedOpenRouterModel(value as OpenRouterModel);
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
        onModelChange={handleOpenAIModelChange}
        models={[...openAiModels] as ModelOption[]}
        modelSelectorLabel="Selecione o Modelo OpenAI"
        modelListTitle="Modelos Disponíveis"
      />

      <ApiKeySection
        title="OpenRouter API Key"
        description="Opcional - Acesso a modelos gratuitos e pagos: Llama, Claude, Gemini, Mistral e outros"
        apiKey={keys.openrouter_key}
        onApiKeyChange={(value) => setKeys({ ...keys, openrouter_key: value })}
        selectedModel={selectedOpenRouterModel}
        onModelChange={handleOpenRouterModelChange}
        models={[...openRouterModels] as ModelOption[]}
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