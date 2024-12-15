import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
          title: "Erro ao salvar",
          description: "Por favor, preencha todos os campos obrigatórios.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from("prompt_blocks")
        .insert(promptData)
        .select();

      if (error) {
        console.error("Erro ao salvar no Supabase:", error);
        toast({
          title: "Erro ao salvar",
          description: "Não foi possível salvar o bloco de prompt.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Prompt salvo",
        description: "O bloco de prompt foi salvo com sucesso.",
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
    <form onSubmit={handleSave} className="space-y-4 p-4 bg-[#2F2F2F] rounded-lg border border-gray-700">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-white">
          Nome do Prompt
        </label>
        <Input
          id="name"
          value={promptData.name}
          onChange={(e) =>
            setPromptData({ ...promptData, name: e.target.value })
          }
          placeholder="Digite o nome do prompt"
          required
          className="bg-[#2F2F2F] border-gray-700 text-white placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium text-white">
          Descrição
        </label>
        <Input
          id="description"
          value={promptData.description}
          onChange={(e) =>
            setPromptData({ ...promptData, description: e.target.value })
          }
          placeholder="Digite uma breve descrição"
          className="bg-[#2F2F2F] border-gray-700 text-white placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="prompt" className="text-sm font-medium text-white">
          Prompt
        </label>
        <Textarea
          id="prompt"
          value={promptData.prompt}
          onChange={(e) =>
            setPromptData({ ...promptData, prompt: e.target.value })
          }
          placeholder="Digite o prompt"
          rows={4}
          required
          className="bg-[#2F2F2F] border-gray-700 text-white placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="category" className="text-sm font-medium text-white">
          Categoria
        </label>
        <Select
          value={promptData.category}
          onValueChange={(value) =>
            setPromptData({ ...promptData, category: value as Category })
          }
          required
        >
          <SelectTrigger className="bg-[#2F2F2F] border-gray-700 text-white">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent className="bg-[#2F2F2F] border-gray-700">
            <SelectItem value="proposito" className="text-white hover:bg-gray-700">Propósito</SelectItem>
            <SelectItem value="metodo" className="text-white hover:bg-gray-700">Método</SelectItem>
            <SelectItem value="mentoria" className="text-white hover:bg-gray-700">Mentoria</SelectItem>
            <SelectItem value="curso" className="text-white hover:bg-gray-700">Curso</SelectItem>
            <SelectItem value="conteudo" className="text-white hover:bg-gray-700">Conteúdo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full bg-gray-700 hover:bg-gray-600 text-white border-gray-600">
        Salvar Prompt
      </Button>
    </form>
  );
};

export default PromptBlock;