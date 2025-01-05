import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { PromptCreator } from "@/components/admin/PromptCreator";
import { PromptList } from "@/components/admin/PromptList";

const AdminPage = () => {
  const navigate = useNavigate();
  const { isLoading } = useAuth("admin");

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Gerenciar Prompts</h1>
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-xl border-chatgpt-border hover:bg-chatgpt-hover text-white"
          onClick={() => navigate("/app")}
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar à Interface
        </Button>
      </div>

      <div className="space-y-8">
        <PromptCreator />
        <PromptList />
      </div>
    </div>
  );
};

export default AdminPage;