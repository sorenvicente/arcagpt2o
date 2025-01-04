import { Button } from "@/components/ui/button";
import ApiKeySection from "./ApiKeySection";
import { openAiModels, openRouterModels, OpenAIModel, OpenRouterModel, ModelOption } from "@/config/aiModels";
import { useApiKeyForm } from "./hooks/useApiKeyForm";
import { OpenRouterInfo } from "./OpenRouterInfo";

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
  const {
    selectedOpenAIModel,
    selectedOpenRouterModel,
    handleSubmit,
    handleOpenAIModelChange,
    handleOpenRouterModelChange,
    handleApiKeyChange,
  } = useApiKeyForm({ keys, setKeys, onSubmit });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ApiKeySection
        title="OpenAI API Key"
        description="Opcional - Acesso ao GPT-4, GPT-4 Turbo, GPT-4 Vision e GPT-3.5 Turbo"
        apiKey={keys.openai_key}
        onApiKeyChange={(value) => handleApiKeyChange('openai', value)}
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
        onApiKeyChange={(value) => handleApiKeyChange('openrouter', value)}
        selectedModel={selectedOpenRouterModel}
        onModelChange={handleOpenRouterModelChange}
        models={[...openRouterModels] as ModelOption[]}
        modelSelectorLabel="Selecione o Modelo OpenRouter"
        modelListTitle="Modelos Disponíveis (Gratuitos e Pagos)"
        extraContent={<OpenRouterInfo />}
      />

      <Button 
        type="submit" 
        className="w-full bg-chatgpt-secondary hover:bg-chatgpt-hover text-white border border-chatgpt-border rounded-xl"
      >
        Salvar Chaves
      </Button>
    </form>
  );
};

export default ApiKeyForm;