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
    <div className="flex flex-col justify-between p-1 bg-chatgpt-secondary rounded-xl border border-chatgpt-border hover:bg-chatgpt-hover transition-colors">
      <div className="flex-1 min-w-0 space-y-0.5">
        <h3 className="font-medium text-white text-xs truncate">{prompt.name}</h3>
        {prompt.description && (
          <p className="text-[10px] text-gray-400 truncate">{prompt.description}</p>
        )}
        <span className="text-[10px] text-gray-500 block truncate">
          {prompt.category}
        </span>
      </div>
      <div className="flex gap-0.5 justify-end mt-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(prompt)}
          className="h-4 w-4 text-gray-400 hover:text-white hover:bg-chatgpt-hover rounded-lg"
        >
          <Edit className="h-2.5 w-2.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(prompt.id)}
          className="h-4 w-4 text-gray-400 hover:text-red-400 hover:bg-chatgpt-hover rounded-lg"
        >
          <Trash2 className="h-2.5 w-2.5" />
        </Button>
      </div>
    </div>
  );
}