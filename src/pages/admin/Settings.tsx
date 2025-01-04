import { SystemSettings } from "@/components/admin/SystemSettings";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const SystemSettingsPage = () => {
  useAuth("admin");
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-2 space-y-2">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-[#444654] p-2 rounded-xl shadow-lg border border-[#4E4F60]">
        <h1 className="text-xl font-semibold text-white">
          Configurações do Sistema
        </h1>
        <Button 
          onClick={() => navigate("/admin")}
          variant="outline"
          className="flex items-center gap-2 w-full sm:w-auto justify-center bg-[#40414F] hover:bg-[#2A2B32] text-white transition-all duration-200 border-[#4E4F60] shadow-md hover:shadow-lg text-sm rounded-xl"
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