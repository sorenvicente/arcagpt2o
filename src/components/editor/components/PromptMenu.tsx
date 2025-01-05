import { ChevronUp, ArrowBigUp, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface PromptMenuProps {
  promptInput: string;
  showPromptMenu: boolean;
  prompts: any[];
  onPromptInputChange: (value: string) => void;
  onPromptSelect: (prompt: any) => void;
  onGenerateText: () => void;
  isGenerating?: boolean;
}

export const PromptMenu = ({
  promptInput,
  showPromptMenu,
  prompts,
  onPromptInputChange,
  onPromptSelect,
  onGenerateText,
  isGenerating = false,
}: PromptMenuProps) => {
  return (
    <div className="relative">
      <div className="relative">
        <Input
          value={promptInput}
          onChange={(e) => onPromptInputChange(e.target.value)}
          placeholder="Digite // para acionar agentes..."
          className="w-full bg-chatgpt-secondary text-white/70 border-none rounded-xl px-6 py-10 placeholder-gray-400 text-lg pr-16"
        />
        <button 
          onClick={onGenerateText}
          disabled={isGenerating}
          className="absolute right-3 top-[50%] -translate-y-[50%] p-2 
            bg-chatgpt-secondary hover:bg-chatgpt-hover rounded-lg transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <Loader2 className="h-6 w-6 text-white animate-spin" />
          ) : (
            <ArrowBigUp className="h-6 w-6 text-white" />
          )}
        </button>
      </div>
      
      {showPromptMenu && (
        <div className="absolute bottom-full mb-4 w-full bg-chatgpt-secondary rounded-xl shadow-lg border border-chatgpt-border">
          <div className="p-2">
            <div className="flex items-center justify-between text-gray-400 text-sm mb-1">
              <span>Prompts Disponíveis</span>
              <ChevronUp className="h-4 w-4" />
            </div>
            {prompts.map((prompt) => (
              <button
                key={prompt.id}
                onClick={() => onPromptSelect(prompt)}
                className="w-full text-left px-3 py-2 text-white hover:bg-chatgpt-hover rounded-lg transition-colors"
              >
                {prompt.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};