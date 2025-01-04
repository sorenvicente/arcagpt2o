import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ApiKeyInput from "./ApiKeyInput";
import ModelSelector from "./ModelSelector";
import ModelList from "./ModelList";
import { ModelOption } from "@/config/aiModels";

interface ApiKeySectionProps {
  title: string;
  description: string;
  apiKey: string;
  onApiKeyChange: (value: string) => void;
  selectedModel: string;
  onModelChange: (value: string) => void;
  models: ModelOption[];
  modelSelectorLabel: string;
  modelListTitle: string;
  showModelSelector?: boolean;
  extraContent?: React.ReactNode;
}

const ApiKeySection = ({
  title,
  description,
  apiKey,
  onApiKeyChange,
  selectedModel,
  onModelChange,
  models,
  modelSelectorLabel,
  modelListTitle,
  showModelSelector = true,
  extraContent,
}: ApiKeySectionProps) => {
  return (
    <Card className="bg-chatgpt-secondary border-chatgpt-border">
      <CardHeader>
        <CardTitle className="text-white text-lg">{title}</CardTitle>
        <CardDescription className="text-gray-400">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ApiKeyInput value={apiKey} onChange={onApiKeyChange} />
          {showModelSelector && apiKey && (
            <ModelSelector
              value={selectedModel}
              onChange={onModelChange}
              models={models}
              label={modelSelectorLabel}
            />
          )}
          <ModelList models={models} title={modelListTitle} />
          {extraContent}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiKeySection;