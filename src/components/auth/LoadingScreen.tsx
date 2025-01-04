import { Loader2 } from "lucide-react";

export const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-chatgpt-main flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
        <div className="text-white text-sm">Verificando autenticação...</div>
      </div>
    </div>
  );
};