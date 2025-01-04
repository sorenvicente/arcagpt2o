import { SystemSettings } from "@/components/admin/SystemSettings";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const SystemSettingsPage = () => {
  useAuth("admin");
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-chatgpt-secondary p-4 rounded-lg shadow-lg border border-chatgpt-border">
        <h1 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Configurações do Sistema
        </h1>
        <Button 
          onClick={() => navigate("/admin")}
          variant="outline"
          className="flex items-center gap-2 w-full sm:w-auto justify-center bg-chatgpt-main hover:bg-chatgpt-hover text-white transition-all duration-200 border-chatgpt-border shadow-md hover:shadow-lg"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
      </div>
      
      <SystemSettings />
    </div>
  );
};

export default SystemSettingsPage;