import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
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
import { supabase } from "@/integrations/supabase/client";

const promptSchema = z.object({
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  description: z.string().min(10, {
    message: "Descrição deve ter pelo menos 10 caracteres.",
  }),
  prompt: z.string().min(20, {
    message: "Prompt deve ter pelo menos 20 caracteres.",
  }),
  category: z.string().min(2, {
    message: "Categoria deve ter pelo menos 2 caracteres.",
  }),
});

export function PromptCreator() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof promptSchema>>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      name: "",
      description: "",
      prompt: "",
      category: "",
    },
  });

  async function onSubmit(values: z.infer<typeof promptSchema>) {
    try {
      const { data, error } = await supabase
        .from("prompt_blocks")
        .insert([{
          name: values.name,
          description: values.description,
          prompt: values.prompt,
          category: values.category,
        }]);

      if (error) throw error;

      toast({
        title: "Prompt criado com sucesso!",
        description: "O prompt foi salvo e já pode ser utilizado.",
      });

      form.reset();
    } catch (error) {
      console.error("Erro ao criar prompt:", error);
      toast({
        variant: "destructive",
        title: "Erro ao criar prompt",
        description: "Ocorreu um erro ao salvar o prompt. Tente novamente.",
      });
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do prompt" {...field} />
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
                <FormLabel>Categoria</FormLabel>
                <FormControl>
                  <Input placeholder="Categoria do prompt" {...field} />
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
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Breve descrição do prompt"
                    className="resize-none"
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
                <FormLabel>Prompt</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Conteúdo do prompt"
                    className="min-h-[100px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Criar Prompt
          </Button>
        </form>
      </Form>
    </div>
  );
}