import React, { useState } from "react";
import { Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { EditPromptDialog } from "./EditPromptDialog";

interface Prompt {
  id: number;
  name: string;
  description: string;
  prompt: string;
  category: string;
  createdAt: string;
}

export function PromptList() {
  const { toast } = useToast();
  const [prompts, setPrompts] = React.useState<Prompt[]>([]);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);

  React.useEffect(() => {
    const loadPrompts = () => {
      const savedPrompts = localStorage.getItem('prompts');
      if (savedPrompts) {
        setPrompts(JSON.parse(savedPrompts));
      }
    };

    loadPrompts();
    window.addEventListener('storage', loadPrompts);
    return () => window.removeEventListener('storage', loadPrompts);
  }, []);

  const handleDelete = (id: number) => {
    const updatedPrompts = prompts.filter(prompt => prompt.id !== id);
    localStorage.setItem('prompts', JSON.stringify(updatedPrompts));
    setPrompts(updatedPrompts);
    toast({
      title: "Prompt excluído",
      description: "O prompt foi removido com sucesso.",
    });
  };

  if (prompts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhum prompt criado ainda.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {prompts.map((prompt) => (
        <div
          key={prompt.id}
          className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
        >
          <span className="font-medium">{prompt.name}</span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setEditingPrompt(prompt)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(prompt.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      
      {editingPrompt && (
        <EditPromptDialog
          open={!!editingPrompt}
          onOpenChange={(open) => !open && setEditingPrompt(null)}
          prompt={editingPrompt}
        />
      )}
    </div>
  );
}