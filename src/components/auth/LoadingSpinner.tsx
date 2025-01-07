import { Loader2 } from "lucide-react";

export const LoadingSpinner = () => {
  return (
    <div className="auth-container bg-chatgpt-main">
      <div className="flex items-center gap-2 text-white">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span>Carregando...</span>
      </div>
    </div>
  );
};