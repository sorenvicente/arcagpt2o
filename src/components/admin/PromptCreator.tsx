import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { PromptForm } from "./PromptForm";
import { PromptList } from "./PromptList";

export function PromptCreator() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

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
    <div className="space-y-8">
      <PromptForm />
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Prompts Criados</h2>
        <PromptList />
      </div>
    </div>
  );
}