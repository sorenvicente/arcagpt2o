import React, { useState } from "react";
import { EditPromptDialog } from "./EditPromptDialog";
import { PromptGrid } from "./PromptGrid";
import { PromptListLoading } from "./PromptListLoading";
import { PromptListEmpty } from "./PromptListEmpty";
import { usePrompts } from "./usePrompts";

interface Prompt {
  id: string;
  name: string;
  description: string;
  prompt: string;
  category: string;
  created_at: string;
}

export function PromptList() {
  const { prompts, isLoading, handleDelete, loadPrompts } = usePrompts();
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);

  if (isLoading) {
    return <PromptListLoading />;
  }

  if (prompts.length === 0) {
    return <PromptListEmpty />;
  }

  return (
    <>
      <PromptGrid
        prompts={prompts}
        onEdit={setEditingPrompt}
        onDelete={handleDelete}
      />
      
      {editingPrompt && (
        <EditPromptDialog
          open={!!editingPrompt}
          onOpenChange={(open) => !open && setEditingPrompt(null)}
          prompt={editingPrompt}
          onUpdate={loadPrompts}
        />
      )}
    </>
  );
}