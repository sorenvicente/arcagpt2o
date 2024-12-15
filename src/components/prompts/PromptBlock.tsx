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
    console.log("Tentando salvar prompt:", promptData);

    if (!promptData.name || !promptData.prompt || !promptData.category) {
      toast({
        title: "Erro ao salvar",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const { data, error } = await supabase
      .from("prompt_blocks")
      .insert(promptData)
      .select();

    console.log("Resposta do Supabase:", { data, error });

    if (error) {
      console.error("Erro ao salvar no Supabase:", error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar o bloco de prompt. " + error.message,
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
  };

  return (
    <form onSubmit={handleSave} className="space-y-4 p-4 border border-chatgpt-border rounded-lg bg-chatgpt-main">
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
          className="bg-chatgpt-secondary border-chatgpt-border text-white"
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
          className="bg-chatgpt-secondary border-chatgpt-border text-white"
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
          className="bg-chatgpt-secondary border-chatgpt-border text-white"
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
          <SelectTrigger className="bg-chatgpt-secondary border-chatgpt-border text-white">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent className="bg-chatgpt-secondary border-chatgpt-border text-white">
            <SelectItem value="proposito">Propósito</SelectItem>
            <SelectItem value="metodo">Método</SelectItem>
            <SelectItem value="mentoria">Mentoria</SelectItem>
            <SelectItem value="curso">Curso</SelectItem>
            <SelectItem value="conteudo">Conteúdo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
        Salvar Prompt
      </Button>
    </form>
  );
};

export default PromptBlock;