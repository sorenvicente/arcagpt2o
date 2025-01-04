import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { PromptForm } from "./PromptForm";
import { FileSection } from "./FileSection";

export function PromptCreator() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [createdPromptId, setCreatedPromptId] = useState<string | null>(null);

  // If not authenticated, redirect to login
  if (!isLoading && !user) {
    navigate('/login');
    return null;
  }

  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-400">
        Carregando...
      </div>
    );
  }

  return (
    <div>
      <PromptForm onSuccess={setCreatedPromptId} />
      {createdPromptId && <FileSection promptId={createdPromptId} />}
    </div>
  );
}