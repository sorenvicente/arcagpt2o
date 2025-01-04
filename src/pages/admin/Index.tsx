import { PromptCreator } from "@/components/admin/PromptCreator";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminIndex = () => {
  useAuth("admin");
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-6">
        <h1 className="text-2xl font-bold">Gerenciamento de Prompts</h1>
        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
          <Button 
            onClick={() => navigate("/admin/settings")}
            variant="outline"
            className="flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Settings className="h-4 w-4" />
            <span className="whitespace-nowrap">Configurações</span>
          </Button>
          <Button 
            onClick={() => navigate("/")}
            variant="ghost"
            className="flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="whitespace-nowrap">Voltar ao Chat</span>
          </Button>
        </div>
      </div>
      
      <PromptCreator />
    </div>
  );
};

export default AdminIndex;