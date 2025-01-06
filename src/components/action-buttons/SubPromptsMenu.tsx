import { useToast } from "@/hooks/use-toast";

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
    <div className="space-y-2">
      {subPrompts.map((subPrompt) => (
        <button
          key={subPrompt.id}
          onClick={() => onSelect(subPrompt)}
          className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          {subPrompt.name}
        </button>
      ))}
    </div>
  );
}