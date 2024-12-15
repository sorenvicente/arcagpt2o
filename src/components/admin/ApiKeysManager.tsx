import { useEffect } from "react";
import { Shield } from "lucide-react";
import { useAdminStatus } from "./hooks/useAdminStatus";
import { useApiKeys } from "./hooks/useApiKeys";
import ApiKeyForm from "./ApiKeyForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ApiKeysManager = () => {
  const { isAdmin, isLoading } = useAdminStatus();
  const { keys, setKeys, fetchApiKeys, handleSaveKeys } = useApiKeys();

  useEffect(() => {
    if (isAdmin) {
      fetchApiKeys();
    }
  }, [isAdmin]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-white">Carregando...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-chatgpt-main border-chatgpt-border">
        <CardHeader>
          <CardTitle className="text-white">Acesso Restrito</CardTitle>
          <CardDescription className="text-gray-400">
            Esta área é restrita a administradores.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-chatgpt-main border-chatgpt-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Shield className="h-5 w-5" />
          Gerenciamento de APIs
        </CardTitle>
        <CardDescription className="text-gray-400">
          Configure as chaves de API para OpenAI e OpenRouter
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ApiKeyForm 
          keys={keys} 
          setKeys={setKeys} 
          onSubmit={handleSaveKeys} 
        />
      </CardContent>
    </Card>
  );
};

export default ApiKeysManager;