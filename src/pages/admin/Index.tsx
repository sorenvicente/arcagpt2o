import { PromptCreator } from "@/components/admin/PromptCreator";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminIndex = () => {
  const { isLoading } = useAuth("admin");
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-6">
        <h1 className="text-2xl font-bold">Gerenciamento de Prompts</h1>
        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
          <Button 
            onClick={() => navigate("/admin/settings")}
            variant="outline"
            className="flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl transition-all duration-200 hover:bg-[#2A2B32]/70"
          >
            <Settings className="h-4 w-4" />
            <span className="whitespace-nowrap">Configurações</span>
          </Button>
          <Button 
            onClick={() => navigate("/admin/dashboard")}
            variant="ghost"
            className="flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="whitespace-nowrap">Voltar ao Dashboard</span>
          </Button>
        </div>
      </div>
      
      <PromptCreator />
    </div>
  );
};

export default AdminIndex;