import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useLoginSession = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!mounted) return;

        if (session) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (profileError) {
            console.error('Error fetching profile:', profileError);
            throw profileError;
          }

          if (profile?.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/');
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
        if (mounted) {
          toast({
            title: "Erro ao verificar sessão",
            description: "Por favor, tente fazer login novamente.",
            variant: "destructive"
          });
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      if (event === 'SIGNED_OUT') {
        setIsLoading(false);
      } else if (session) {
        try {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (profileError) throw profileError;

          if (profile?.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/');
          }
        } catch (error) {
          console.error('Error checking profile:', error);
          toast({
            title: "Erro ao verificar perfil",
            description: "Por favor, tente fazer login novamente.",
            variant: "destructive"
          });
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso."
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Erro ao fazer logout",
        description: "Por favor, tente novamente.",
        variant: "destructive"
      });
    }
  };

  return { isLoading, handleLogout };
};