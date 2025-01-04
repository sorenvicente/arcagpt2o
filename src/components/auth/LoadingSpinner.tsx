import { Loader2 } from "lucide-react";

export const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-chatgpt-main flex items-center justify-center p-4">
      <div className="flex items-center gap-2 text-white">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span>Carregando...</span>
      </div>
    </div>
  );
};