import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { PromptCreator } from "@/components/admin/PromptCreator";
import { PromptList } from "@/components/admin/PromptList";

const AdminPage = () => {
  const navigate = useNavigate();
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="h-8 w-48 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-10 w-40 bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div className="space-y-4">
          <div className="h-64 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Gerenciar Prompts</h1>
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-xl border-chatgpt-border hover:bg-chatgpt-hover text-white"
            onClick={() => navigate("/app")}
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar à Interface
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <div className="space-y-8 bg-[#2A2F3C] p-6 rounded-xl border border-chatgpt-border">
            <h2 className="text-xl font-semibold">Criar Novo Prompt</h2>
            <PromptCreator />
          </div>
          <div className="space-y-4 bg-[#2A2F3C] p-6 rounded-xl border border-chatgpt-border">
            <h2 className="text-xl font-semibold">Prompts Criados</h2>
            <PromptList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;