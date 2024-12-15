import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PromptFormData {
  name: string;
  description: string;
  prompt: string;
  category: string;
}

export const PromptBlock = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<PromptFormData>({
    defaultValues: {
      name: "",
      description: "",
      prompt: "",
      category: "",
    },
  });

  const handleSave = async (data: PromptFormData) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from("prompt_blocks")
        .insert([data])
        .select();

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#D6BCFA]">Nome do Prompt</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Digite o nome do prompt" 
                  className="bg-[#1A1F2C] border-[#7E69AB] text-white"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#D6BCFA]">Descrição</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Digite uma descrição" 
                  className="bg-[#1A1F2C] border-[#7E69AB] text-white"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#D6BCFA]">Prompt</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Digite o prompt" 
                  className="bg-[#1A1F2C] border-[#7E69AB] text-white min-h-[200px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#D6BCFA]">Categoria</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-[#1A1F2C] border-[#7E69AB] text-white">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-[#1A1F2C] border-[#7E69AB]">
                  <SelectItem value="proposito" className="text-white hover:bg-[#2A2B32]">Propósito</SelectItem>
                  <SelectItem value="metodo" className="text-white hover:bg-[#2A2B32]">Método</SelectItem>
                  <SelectItem value="mentoria" className="text-white hover:bg-[#2A2B32]">Mentoria</SelectItem>
                  <SelectItem value="curso" className="text-white hover:bg-[#2A2B32]">Curso</SelectItem>
                  <SelectItem value="conteudo" className="text-white hover:bg-[#2A2B32]">Conteúdo</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-[#9b87f5] hover:bg-[#8B5CF6] text-white"
        >
          {isLoading ? "Salvando..." : "Salvar Prompt"}
        </Button>
      </form>
    </Form>
  );
};