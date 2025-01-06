interface SubPrompt {
  id: string;
  name: string;
  prompt: string;
  category: string;
}

interface SubPromptsMenuProps {
  subPrompts: SubPrompt[];
  onSelect: (subPrompt: SubPrompt) => void;
}

export function SubPromptsMenu({ subPrompts, onSelect }: SubPromptsMenuProps) {
  return (
    <div className="space-y-2 bg-chatgpt-secondary p-2 rounded-lg">
      <p className="text-sm text-gray-400 mb-2">Selecione uma opção:</p>
      {subPrompts.map((subPrompt) => (
        <button
          key={subPrompt.id}
          onClick={() => onSelect(subPrompt)}
          className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-white"
        >
          {subPrompt.name}
        </button>
      ))}
    </div>
  );
}