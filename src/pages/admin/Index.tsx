import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { PromptCreator } from "@/components/admin/PromptCreator";
import { PromptGrid } from "@/components/admin/PromptGrid";

const AdminPage = () => {
  const navigate = useNavigate();
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);
  const { isLoading } = useAuth("admin");

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Gerenciar Prompts</h1>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => navigate("/app")}
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar à Interface
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
        <PromptCreator selectedPromptId={selectedPromptId} />
        <PromptGrid onPromptSelect={setSelectedPromptId} />
      </div>
    </div>
  );
};

export default AdminPage;