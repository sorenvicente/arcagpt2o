import { usePrompts } from '../hooks/usePrompts';

interface PromptMenuProps {
  onPromptSelect: (prompt: any) => void;
  activeTab: string;
}

export const PromptMenu = ({ onPromptSelect, activeTab }: PromptMenuProps) => {
  const { prompts } = usePrompts();

  const filteredPrompts = prompts?.filter(prompt => prompt.category === activeTab);

  if (!filteredPrompts?.length) {
    return (
      <div className="p-4 text-gray-400 text-center">
        Nenhum prompt encontrado para esta categoria
      </div>
    );
  }

  return (
    <div className="p-2 space-y-1">
      {filteredPrompts.map((prompt) => (
        <button
          key={prompt.id}
          onClick={() => onPromptSelect(prompt)}
          className="w-full text-left px-3 py-2 text-white hover:bg-chatgpt-hover hover:shadow-lg rounded-lg transition-all duration-200"
        >
          <div className="font-medium">{prompt.name}</div>
          {prompt.description && (
            <div className="text-sm text-gray-400">{prompt.description}</div>
          )}
        </button>
      ))}
    </div>
  );
};