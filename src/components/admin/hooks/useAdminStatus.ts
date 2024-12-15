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
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        console.error("Auth error:", authError);
        toast({
          title: "Erro de Autenticação",
          description: "Erro ao verificar status de administrador.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (!user) {
        toast({
          title: "Acesso Negado",
          description: "Você precisa estar logado como administrador.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
        toast({
          title: "Erro",
          description: "Erro ao verificar perfil de administrador.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (profile?.role === 'admin') {
        setIsAdmin(true);
      } else {
        toast({
          title: "Acesso Negado",
          description: "Você não tem permissão de administrador.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
      toast({
        title: "Erro",
        description: "Erro ao verificar status de administrador.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { isAdmin, isLoading };
};