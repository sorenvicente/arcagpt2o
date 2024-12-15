import { useState } from "react";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ApiKeysManager = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  const handleSaveKeys = async (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Chaves salvas",
      description: "As chaves de API foram atualizadas com sucesso.",
    });
  };

  if (!isVisible) return null;

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Gerenciamento de APIs
        </CardTitle>
        <CardDescription>
          Configure as chaves de API para OpenAI e OpenRouter
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSaveKeys} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="openai" className="text-sm font-medium">
              OpenAI API Key
            </label>
            <Input
              id="openai"
              type="password"
              placeholder="sk-..."
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="openrouter" className="text-sm font-medium">
              OpenRouter API Key
            </label>
            <Input
              id="openrouter"
              type="password"
              placeholder="sk-..."
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">
            Salvar Chaves
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ApiKeysManager;