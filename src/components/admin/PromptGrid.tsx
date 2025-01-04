import { PromptCard } from "./PromptCard";

interface Prompt {
  id: string;
  name: string;
  description: string;
  prompt: string;
  category: string;
  created_at: string;
}

interface PromptGridProps {
  prompts: Prompt[];
  onEdit: (prompt: Prompt) => void;
  onDelete: (id: string) => void;
}

export function PromptGrid({ prompts, onEdit, onDelete }: PromptGridProps) {
  return (
    <div className="grid grid-cols-3 gap-1.5 max-w-6xl mx-auto px-4">
      {prompts.map((prompt) => (
        <PromptCard
          key={prompt.id}
          prompt={prompt}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}