import { useState, useEffect } from "react";
import { PromptBlock } from "./PromptBlock";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const PromptList = () => {
  const [prompts, setPrompts] = useState<PromptBlock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        setIsLoading(true);
        
        // First check if we have an authenticated session
        const { data: sessionData } = await supabase.auth.getSession();
        if (!sessionData.session) {
          toast({
            title: "Não autorizado",
            description: "Você precisa estar logado para ver os prompts.",
            variant: "destructive",
          });
          return;
        }

        const { data, error } = await supabase
          .from("prompt_blocks")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching prompts:", error);
          toast({
            title: "Erro ao carregar prompts",
            description: error.message,
            variant: "destructive",
          });
          return;
        }

        if (data) {
          const typedPrompts = data.map(prompt => ({
            ...prompt,
            category: prompt.category as PromptBlock["category"]
          }));
          setPrompts(typedPrompts);
        }
      } catch (error) {
        console.error("Error:", error);
        toast({
          title: "Erro inesperado",
          description: "Não foi possível carregar os prompts.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrompts();
  }, [toast]);

  if (isLoading) {
    return <div className="p-4">Carregando prompts...</div>;
  }

  if (prompts.length === 0) {
    return <div className="p-4">Nenhum prompt encontrado.</div>;
  }

  return (
    <div className="space-y-4">
      {prompts.map((prompt) => (
        <Card key={prompt.id}>
          <CardHeader>
            <CardTitle>{prompt.name}</CardTitle>
            <CardDescription>{prompt.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{prompt.prompt}</p>
            <div className="mt-2">
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                {prompt.category}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PromptList;