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
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const ApiKeysManager = () => {
  const { keys, setKeys, fetchApiKeys, handleSaveKeys } = useApiKeys();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Sessão expirada",
          description: "Por favor, faça login novamente.",
          variant: "destructive",
        });
        navigate('/login');
        return;
      }
    };

    const loadKeys = async () => {
      await checkSession();
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

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate('/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
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