import { Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Prompt {
  id: string;
  name: string;
  description: string;
  prompt: string;
  category: string;
  created_at: string;
}

interface PromptCardProps {
  prompt: Prompt;
  onEdit: (prompt: Prompt) => void;
  onDelete: (id: string) => void;
}

export function PromptCard({ prompt, onEdit, onDelete }: PromptCardProps) {
  return (
    <div className="flex flex-col justify-between p-2 bg-chatgpt-secondary rounded-lg border border-chatgpt-border hover:bg-chatgpt-hover transition-colors">
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-white text-sm truncate">{prompt.name}</h3>
        {prompt.description && (
          <p className="text-xs text-gray-400 truncate">{prompt.description}</p>
        )}
        <span className="text-xs text-gray-500 block truncate">
          Categoria: {prompt.category}
        </span>
      </div>
      <div className="flex gap-1 justify-end mt-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(prompt)}
          className="h-7 w-7 text-gray-400 hover:text-white hover:bg-chatgpt-hover"
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(prompt.id)}
          className="h-7 w-7 text-gray-400 hover:text-red-400 hover:bg-chatgpt-hover"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}