import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

type Category = "proposito" | "metodo" | "mentoria" | "curso" | "conteudo";

interface PromptFormData {
  name: string;
  description: string;
  prompt: string;
  category: Category;
}

const PromptManager = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<PromptFormData>({
    defaultValues: {
      name: "",
      description: "",
      prompt: "",
      category: "proposito",
    },
  });

  const handleSubmit = async (data: PromptFormData) => {
    try {
      setIsLoading(true);

      const { data: insertedData, error } = await supabase
        .from("prompt_blocks")
        .insert([
          {
            name: data.name,
            description: data.description || null,
            prompt: data.prompt,
            category: data.category,
          }
        ])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Prompt salvo com sucesso!",
        description: "O prompt foi adicionado à lista.",
      });

      form.reset();
    } catch (error: any) {
      console.error("Erro ao salvar prompt:", error);
      toast({
        title: "Erro ao salvar prompt",
        description: error.message || "Não foi possível salvar o prompt.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6 text-white">Gerenciar Prompts</h2>
      
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-[#D6BCFA]">
            Nome do Prompt
          </label>
          <Input
            id="name"
            {...form.register("name", { required: true })}
            placeholder="Digite o nome do prompt"
            className="bg-[#2F2F2F] border-[#7E69AB] text-white placeholder:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium text-[#D6BCFA]">
            Descrição
          </label>
          <Input
            id="description"
            {...form.register("description")}
            placeholder="Digite uma breve descrição"
            className="bg-[#2F2F2F] border-[#7E69AB] text-white placeholder:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="prompt" className="text-sm font-medium text-[#D6BCFA]">
            Prompt
          </label>
          <Textarea
            id="prompt"
            {...form.register("prompt", { required: true })}
            placeholder="Digite o prompt"
            rows={4}
            className="bg-[#2F2F2F] border-[#7E69AB] text-white placeholder:text-gray-400 min-h-[200px]"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium text-[#D6BCFA]">
            Categoria
          </label>
          <Select
            value={form.watch("category")}
            onValueChange={(value) => form.setValue("category", value as Category)}
          >
            <SelectTrigger className="bg-[#2F2F2F] border-[#7E69AB] text-white">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent className="bg-[#2F2F2F] border-[#7E69AB]">
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
          disabled={isLoading}
          className="w-full bg-[#9b87f5] hover:bg-[#8B5CF6] text-white"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            'Salvar Prompt'
          )}
        </Button>
      </form>
    </Card>
  );
};

export default PromptManager;