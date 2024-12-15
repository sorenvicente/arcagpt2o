import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export type Category = "proposito" | "metodo" | "mentoria" | "curso" | "conteudo";

export interface PromptBlock {
  id: string;
  name: string;
  description: string;
  prompt: string;
  category: Category;
}

const PromptBlock = () => {
  const [promptData, setPromptData] = useState<Partial<PromptBlock>>({
    name: "",
    description: "",
    prompt: "",
    category: "proposito",
  });
  const { toast } = useToast();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Prompt salvo",
      description: "O bloco de prompt foi salvo com sucesso.",
    });
  };

  return (
    <form onSubmit={handleSave} className="space-y-4 p-4 border rounded-lg">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Nome do Prompt
        </label>
        <Input
          id="name"
          value={promptData.name}
          onChange={(e) =>
            setPromptData({ ...promptData, name: e.target.value })
          }
          placeholder="Digite o nome do prompt"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Descrição
        </label>
        <Input
          id="description"
          value={promptData.description}
          onChange={(e) =>
            setPromptData({ ...promptData, description: e.target.value })
          }
          placeholder="Digite uma breve descrição"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="prompt" className="text-sm font-medium">
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
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="category" className="text-sm font-medium">
          Categoria
        </label>
        <Select
          value={promptData.category}
          onValueChange={(value) =>
            setPromptData({ ...promptData, category: value as Category })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="proposito">Propósito</SelectItem>
            <SelectItem value="metodo">Método</SelectItem>
            <SelectItem value="mentoria">Mentoria</SelectItem>
            <SelectItem value="curso">Curso</SelectItem>
            <SelectItem value="conteudo">Conteúdo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full">
        Salvar Prompt
      </Button>
    </form>
  );
};

export default PromptBlock;