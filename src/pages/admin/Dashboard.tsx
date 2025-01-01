import { SystemSettings } from "@/components/admin/SystemSettings";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const DashboardPage = () => {
  const navigate = useNavigate();
  useAuthRedirect();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => navigate("/")}
        >
          <Home className="h-4 w-4" />
          Home
        </Button>
      </div>

      <SystemSettings />
    </div>
  );
};

export default DashboardPage;