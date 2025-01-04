import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { OpenAIModel, OpenRouterModel } from "@/config/aiModels";

interface UseApiKeyFormProps {
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

export const useApiKeyForm = ({ keys, setKeys, onSubmit }: UseApiKeyFormProps) => {
  const [selectedOpenAIModel, setSelectedOpenAIModel] = useState<OpenAIModel>(
    keys.selected_openai_model || "gpt-4"
  );
  const [selectedOpenRouterModel, setSelectedOpenRouterModel] = useState<OpenRouterModel>(
    keys.selected_openrouter_model || "openai/gpt-4"
  );
  const { toast } = useToast();

  useEffect(() => {
    if (keys.selected_openai_model) {
      setSelectedOpenAIModel(keys.selected_openai_model);
    }
    if (keys.selected_openrouter_model) {
      setSelectedOpenRouterModel(keys.selected_openrouter_model);
    }
  }, [keys.selected_openai_model, keys.selected_openrouter_model]);

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
    setKeys(prev => ({
      ...prev,
      selected_openai_model: value as OpenAIModel
    }));
  };

  const handleOpenRouterModelChange = (value: string) => {
    setSelectedOpenRouterModel(value as OpenRouterModel);
    setKeys(prev => ({
      ...prev,
      selected_openrouter_model: value as OpenRouterModel
    }));
  };

  const handleApiKeyChange = (type: 'openai' | 'openrouter', value: string) => {
    setKeys(prev => ({
      ...prev,
      [type === 'openai' ? 'openai_key' : 'openrouter_key']: value
    }));
  };

  return {
    selectedOpenAIModel,
    selectedOpenRouterModel,
    handleSubmit,
    handleOpenAIModelChange,
    handleOpenRouterModelChange,
    handleApiKeyChange,
  };
};