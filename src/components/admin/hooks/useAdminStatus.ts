import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useAdminStatus = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      
      if (authError || !session) {
        console.error("Auth error:", authError);
        toast({
          title: "Erro de Autenticação",
          description: "Para acessar esta área, faça login em https://chat.openai.com",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
        toast({
          title: "Erro",
          description: "Erro ao verificar perfil de administrador. Entre em contato com o suporte.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      setIsAdmin(profile?.role === 'admin');
      
      if (profile?.role !== 'admin') {
        toast({
          title: "Acesso Negado",
          description: "Você não tem permissão de administrador. Entre em contato com o suporte para solicitar acesso.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
      toast({
        title: "Erro",
        description: "Erro ao verificar status de administrador. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { isAdmin, isLoading };
};