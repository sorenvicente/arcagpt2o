import { useState, useEffect } from "react";
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
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email === 'admin@example.com') {
        setIsAdmin(true);
      }
    };
    
    checkAdminStatus();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Não autorizado",
          description: "Você precisa estar logado para criar prompts.",
          variant: "destructive",
        });
        return;
      }

      if (!isAdmin) {
        toast({
          title: "Acesso negado",
          description: "Apenas administradores podem criar prompts.",
          variant: "destructive",
        });
        return;
      }

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
    <form onSubmit={handleSave} className="space-y-4 p-4 bg-chatgpt-secondary rounded-lg border border-chatgpt-border">
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
          className="bg-chatgpt-input border-chatgpt-border text-white placeholder:text-gray-400"
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
          className="bg-chatgpt-input border-chatgpt-border text-white placeholder:text-gray-400"
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
          className="bg-chatgpt-input border-chatgpt-border text-white placeholder:text-gray-400"
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
          <SelectTrigger className="bg-chatgpt-input border-chatgpt-border text-white">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent className="bg-chatgpt-secondary border-chatgpt-border">
            <SelectItem value="proposito" className="text-white hover:bg-chatgpt-hover">Propósito</SelectItem>
            <SelectItem value="metodo" className="text-white hover:bg-chatgpt-hover">Método</SelectItem>
            <SelectItem value="mentoria" className="text-white hover:bg-chatgpt-hover">Mentoria</SelectItem>
            <SelectItem value="curso" className="text-white hover:bg-chatgpt-hover">Curso</SelectItem>
            <SelectItem value="conteudo" className="text-white hover:bg-chatgpt-hover">Conteúdo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full bg-chatgpt-hover hover:bg-chatgpt-secondary border border-chatgpt-border text-white">
        Salvar Prompt
      </Button>
    </form>
  );
};

export default PromptBlock;