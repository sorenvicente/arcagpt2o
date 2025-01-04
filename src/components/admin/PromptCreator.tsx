import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { PromptForm } from "./PromptForm";

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
    <div>
      <PromptForm />
    </div>
  );
}