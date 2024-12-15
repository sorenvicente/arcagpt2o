import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
  );
};

export default ApiKeyForm;