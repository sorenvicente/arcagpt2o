import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

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

const ApiKeyForm = ({ keys, setKeys, onSubmit }: ApiKeyFormProps) => {
  const [showOpenAI, setShowOpenAI] = useState(false);
  const [showOpenRouter, setShowOpenRouter] = useState(false);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="openai" className="text-sm font-medium text-white">
          OpenAI API Key
        </label>
        <div className="relative">
          <Input
            id="openai"
            type={showOpenAI ? "text" : "password"}
            value={keys.openai_key}
            onChange={(e) => setKeys({ ...keys, openai_key: e.target.value })}
            placeholder="sk-..."
            className="w-full bg-chatgpt-secondary border-chatgpt-border text-white pr-10"
          />
          <button
            type="button"
            onClick={() => setShowOpenAI(!showOpenAI)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showOpenAI ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="openrouter" className="text-sm font-medium text-white">
          OpenRouter API Key
        </label>
        <div className="relative">
          <Input
            id="openrouter"
            type={showOpenRouter ? "text" : "password"}
            value={keys.openrouter_key}
            onChange={(e) => setKeys({ ...keys, openrouter_key: e.target.value })}
            placeholder="sk-..."
            className="w-full bg-chatgpt-secondary border-chatgpt-border text-white pr-10"
          />
          <button
            type="button"
            onClick={() => setShowOpenRouter(!showOpenRouter)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showOpenRouter ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
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