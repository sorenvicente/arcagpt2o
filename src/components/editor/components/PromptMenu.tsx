import { ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Prompt {
  id: string;
  name: string;
  description?: string;
  prompt: string;
  category: string;
}

interface PromptMenuProps {
  promptInput: string;
  showPromptMenu: boolean;
  prompts: Prompt[];
  activeTab: string;
  onPromptInputChange: (value: string) => void;
  onPromptSelect: (prompt: Prompt) => void;
}

export const PromptMenu = ({
  promptInput,
  showPromptMenu,
  prompts,
  activeTab,
  onPromptInputChange,
  onPromptSelect,
}: PromptMenuProps) => {
  const getCategoryForTab = (tab: string) => {
    switch (tab.toLowerCase()) {
      case 'eixos':
        return 'eixos';
      case 'blocos':
        return 'blocos';
      case 'prompts':
        return 'proposito';
      default:
        return '';
    }
  };

  const filteredPrompts = prompts.filter(prompt => {
    const categoryForTab = getCategoryForTab(activeTab);
    return prompt.category.toLowerCase() === categoryForTab;
  });

  return (
    <div className="relative w-3/4 mx-auto">
      <Input
        value={promptInput}
        onChange={(e) => onPromptInputChange(e.target.value)}
        placeholder="Digite // para acionar agentes..."
        className="w-full bg-[#343541] text-white/70 border-none rounded-xl px-6 py-6 placeholder-gray-400 text-lg font-medium"
      />
      
      {showPromptMenu && (
        <div className="absolute bottom-full mb-0.5 w-full bg-[#343541] rounded-xl shadow-lg">
          <div className="p-2">
            <div className="flex items-center justify-between text-gray-400 text-sm mb-1">
              <span>Prompts {activeTab}</span>
              <ChevronUp className="h-4 w-4" />
            </div>
            {filteredPrompts.length > 0 ? (
              filteredPrompts.map((prompt) => (
                <button
                  key={prompt.id}
                  onClick={() => onPromptSelect(prompt)}
                  className="w-full text-left px-3 py-2 text-white hover:bg-[#343541] transition-all duration-200 rounded-lg"
                >
                  <div className="font-medium">{prompt.name}</div>
                  {prompt.description && (
                    <div className="text-sm text-gray-400">{prompt.description}</div>
                  )}
                </button>
              ))
            ) : (
              <div className="text-gray-400 text-sm px-3 py-2">
                Nenhum prompt disponível para {activeTab}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};