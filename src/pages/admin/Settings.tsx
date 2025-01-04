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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-[#1A1F2C] p-4 rounded-lg shadow-md border border-[#2A2F3C]">
        <h1 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
          Configurações do Sistema
        </h1>
        <Button 
          onClick={() => navigate("/admin")}
          variant="ghost"
          className="flex items-center gap-2 w-full sm:w-auto justify-center hover:bg-[#9b87f5]/10 text-[#9b87f5] hover:text-[#9b87f5] transition-colors duration-200 border border-transparent hover:border-[#2A2F3C]"
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