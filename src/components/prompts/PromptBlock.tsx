import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export type Category = "proposito" | "metodo" | "mentoria" | "curso" | "conteudo";

export interface PromptBlock {
  id: string;
  name: string;
  description: string | null;
  prompt: string;
  category: Category;
  created_at?: string;
  updated_at?: string;
}

const PromptBlock = () => {
  const [promptData, setPromptData] = useState<Omit<PromptBlock, "id">>({
    name: "",
    description: "",
    prompt: "",
    category: "proposito",
  });
  const { toast } = useToast();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!promptData.name || !promptData.prompt || !promptData.category) {
        toast({
          title: "Campos obrigatórios",
          description: "Por favor, preencha todos os campos obrigatórios.",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from("prompt_blocks")
        .insert([promptData])
        .select();

      if (error) {
        console.error("Erro ao salvar prompt:", error);
        toast({
          title: "Erro ao salvar",
          description: "Não foi possível salvar o prompt. Tente novamente.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Sucesso!",
        description: "Prompt salvo com sucesso.",
      });

      setPromptData({
        name: "",
        description: "",
        prompt: "",
        category: "proposito",
      });
    } catch (error) {
      console.error("Erro inesperado:", error);
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro ao tentar salvar o prompt.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-[#1A1F2C] border-[#7E69AB] shadow-lg">
      <CardHeader>
        <CardTitle className="text-[#D6BCFA]">Criar Novo Prompt</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[#D6BCFA] text-sm font-medium">
              Nome do Prompt *
            </label>
            <Input
              value={promptData.name}
              onChange={(e) => setPromptData({ ...promptData, name: e.target.value })}
              className="bg-[#2A2B32] border-[#7E69AB] text-white placeholder:text-[#8E9196]"
              placeholder="Digite o nome do prompt"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[#D6BCFA] text-sm font-medium">
              Descrição
            </label>
            <Input
              value={promptData.description}
              onChange={(e) => setPromptData({ ...promptData, description: e.target.value })}
              className="bg-[#2A2B32] border-[#7E69AB] text-white placeholder:text-[#8E9196]"
              placeholder="Digite uma breve descrição"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[#D6BCFA] text-sm font-medium">
              Prompt *
            </label>
            <Textarea
              value={promptData.prompt}
              onChange={(e) => setPromptData({ ...promptData, prompt: e.target.value })}
              className="bg-[#2A2B32] border-[#7E69AB] text-white placeholder:text-[#8E9196] min-h-[150px]"
              placeholder="Digite o prompt"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[#D6BCFA] text-sm font-medium">
              Categoria *
            </label>
            <Select
              value={promptData.category}
              onValueChange={(value) => setPromptData({ ...promptData, category: value as Category })}
            >
              <SelectTrigger className="bg-[#2A2B32] border-[#7E69AB] text-white">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1F2C] border-[#7E69AB]">
                <SelectItem value="proposito" className="text-white hover:bg-[#2A2B32]">Propósito</SelectItem>
                <SelectItem value="metodo" className="text-white hover:bg-[#2A2B32]">Método</SelectItem>
                <SelectItem value="mentoria" className="text-white hover:bg-[#2A2B32]">Mentoria</SelectItem>
                <SelectItem value="curso" className="text-white hover:bg-[#2A2B32]">Curso</SelectItem>
                <SelectItem value="conteudo" className="text-white hover:bg-[#2A2B32]">Conteúdo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white transition-colors"
          >
            Salvar Prompt
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PromptBlock;