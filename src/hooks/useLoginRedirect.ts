import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useLoginRedirect = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      
      if (event === 'SIGNED_IN' && session && mounted) {
        try {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (profileError) {
            console.error('Error fetching profile:', profileError);
            throw profileError;
          }

          navigate('/app');
          
          toast({
            title: "Login realizado com sucesso",
            description: "Bem-vindo de volta! Estamos felizes em ter você aqui."
          });
        } catch (error) {
          console.error('Error during login:', error);
          if (mounted) {
            toast({
              title: "Erro ao fazer login",
              description: "Por favor, verifique suas credenciais e tente novamente.",
              variant: "destructive"
            });
          }
        }
      } else if (event === 'SIGNED_OUT' && mounted) {
        navigate('/login');
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, toast]);
};