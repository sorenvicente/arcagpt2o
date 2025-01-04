import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

interface CreateUserFormProps {
  onSuccess: () => void;
}

export const CreateUserForm = ({ onSuccess }: CreateUserFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const createUser = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.access_token) {
          throw new Error('Não autorizado: Faça login novamente');
        }

        // Verificar se o usuário atual é admin
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          throw new Error('Erro ao verificar permissões');
        }

        if (profile?.role !== 'admin') {
          throw new Error('Apenas administradores podem criar novos usuários');
        }

        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/manage-users`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.access_token}`,
            },
            body: JSON.stringify({
              action: "create",
              email: values.email,
              password: values.password,
              role: "user",
            }),
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Erro ao criar usuário");
        }

        return response.json();
      } catch (error) {
        if (error.name === 'AbortError') {
          throw new Error('A operação demorou muito tempo. Por favor, tente novamente.');
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Sucesso",
        description: "Usuário criado com sucesso",
        className: "bg-[#40414F] border border-[#4E4F60] text-white",
      });
      form.reset();
      onSuccess();
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
        className: "bg-red-900 border border-red-700 text-white",
      });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createUser.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#9b87f5]">Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="email@exemplo.com" 
                  {...field} 
                  disabled={createUser.isPending}
                  className="bg-[#40414F] border-[#4E4F60] text-white placeholder:text-gray-400 focus:ring-[#9b87f5] focus:border-[#9b87f5]"
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#9b87f5]">Senha</FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  placeholder="******" 
                  {...field} 
                  disabled={createUser.isPending}
                  className="bg-[#40414F] border-[#4E4F60] text-white placeholder:text-gray-400 focus:ring-[#9b87f5] focus:border-[#9b87f5]"
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={createUser.isPending}
        >
          {createUser.isPending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Criando usuário...
            </span>
          ) : (
            "Criar Usuário"
          )}
        </Button>
      </form>
    </Form>
  );
};