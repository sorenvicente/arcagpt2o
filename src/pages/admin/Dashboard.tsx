import { SystemSettings } from "@/components/admin/SystemSettings";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { isLoading } = useAuth("admin");

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => navigate("/admin")}
        >
          <Home className="h-4 w-4" />
          Gerenciar Prompts
        </Button>
      </div>

      <SystemSettings />
    </div>
  );
};

export default DashboardPage;