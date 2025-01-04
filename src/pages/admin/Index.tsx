import { SystemSettings } from "@/components/admin/SystemSettings";
import { PromptCreator } from "@/components/admin/PromptCreator";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminIndex = () => {
  useAuth("admin");
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Configurações do Sistema</h1>
        <Button 
          onClick={() => navigate("/")}
          variant="ghost"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao Chat
        </Button>
      </div>
      
      <div className="grid gap-6">
        <SystemSettings />
        <PromptCreator />
      </div>
    </div>
  );
};

export default AdminIndex;