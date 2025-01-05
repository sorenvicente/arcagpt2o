import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { SystemSettings } from "@/components/admin/SystemSettings";

const SystemSettingsPage = () => {
  const navigate = useNavigate();
  const { isLoading } = useAuth("admin");

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Configurações do Sistema</h1>
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-xl border-chatgpt-border hover:bg-chatgpt-hover text-white"
          onClick={() => navigate("/admin")}
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para Prompts
        </Button>
      </div>

      <SystemSettings />
    </div>
  );
};

export default SystemSettingsPage;