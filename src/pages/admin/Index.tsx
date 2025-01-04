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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciamento de Prompts</h1>
        <div className="flex gap-2">
          <Button 
            onClick={() => navigate("/admin/settings")}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Configurações
          </Button>
          <Button 
            onClick={() => navigate("/")}
            variant="ghost"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Chat
          </Button>
        </div>
      </div>
      
      <PromptCreator />
    </div>
  );
};

export default AdminIndex;