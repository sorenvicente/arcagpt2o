import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import ApiKeyForm from "./ApiKeyForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield } from "lucide-react";
import { useApiKeys } from "./hooks/useApiKeys";

const ApiKeysManager = () => {
  const { keys, setKeys, fetchApiKeys, handleSaveKeys } = useApiKeys();
  const { toast } = useToast();

  useEffect(() => {
    const loadKeys = async () => {
      await fetchApiKeys();
      if (!keys.openai_key && !keys.openrouter_key) {
        toast({
          title: "Atenção",
          description: "Configure pelo menos uma chave API (OpenAI ou OpenRouter) para usar o chat.",
          variant: "destructive",
          duration: 5000,
        });
      }
    };

    loadKeys();
  }, []);

  return (
    <Card className="w-full max-w-2xl mx-auto bg-chatgpt-main border-chatgpt-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Shield className="h-5 w-5" />
          API Key Management
        </CardTitle>
        <CardDescription className="text-gray-400">
          Configure your OpenAI and OpenRouter API keys
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