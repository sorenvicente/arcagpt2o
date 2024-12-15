import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { PromptBlockType } from "./PromptBlock";

const PromptList = () => {
  const [prompts, setPrompts] = useState<PromptBlockType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from("prompt_blocks")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Erro ao carregar prompts:", error);
          toast({
            title: "Erro ao carregar prompts",
            description: error.message,
            variant: "destructive",
          });
          return;
        }

        if (data) {
          const typedPrompts = data as PromptBlockType[];
          setPrompts(typedPrompts);
        }
      } catch (error) {
        console.error("Erro:", error);
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

  const getCategoryColor = (category: string) => {
    const colors = {
      proposito: "bg-[#F2FCE2] text-[#1A1F2C]",
      metodo: "bg-[#FEF7CD] text-[#1A1F2C]",
      mentoria: "bg-[#FEC6A1] text-[#1A1F2C]",
      curso: "bg-[#E5DEFF] text-[#1A1F2C]",
      conteudo: "bg-[#FFDEE2] text-[#1A1F2C]",
    };
    return colors[category as keyof typeof colors] || "bg-[#D6BCFA] text-[#1A1F2C]";
  };

  if (isLoading) {
    return <div className="p-4 text-[#D6BCFA]">Carregando prompts...</div>;
  }

  if (prompts.length === 0) {
    return <div className="p-4 text-[#D6BCFA]">Nenhum prompt encontrado.</div>;
  }

  return (
    <div className="space-y-4">
      {prompts.map((prompt) => (
        <Card key={prompt.id} className="bg-[#1A1F2C] border-[#7E69AB]">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-[#D6BCFA]">{prompt.name}</CardTitle>
                <CardDescription className="text-[#8E9196]">
                  {prompt.description}
                </CardDescription>
              </div>
              <Badge className={`${getCategoryColor(prompt.category)}`}>
                {prompt.category}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-white text-sm whitespace-pre-wrap">{prompt.prompt}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PromptList;