import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useLoginRedirect = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    console.log('🔄 Setting up login redirect...');
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("🔔 Auth state changed:", event, session?.user?.email);
      
      if (event === 'SIGNED_IN' && session) {
        try {
          console.log('🔍 Fetching user profile...');
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (profileError) {
            console.error('❌ Error fetching profile:', profileError);
            if (profileError.code === 'PGRST116') {
              console.log('⚠️ Profile not found, might need to wait for creation');
              // Wait a bit and retry once
              await new Promise(resolve => setTimeout(resolve, 1000));
              const { error: retryError } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', session.user.id)
                .single();
              
              if (retryError) {
                throw retryError;
              }
            } else {
              throw profileError;
            }
          }

          console.log('✅ Login successful, redirecting to app');
          navigate('/app');
          
          toast({
            title: "Login realizado com sucesso",
            description: "Bem-vindo de volta! Estamos felizes em ter você aqui."
          });
        } catch (error) {
          console.error('❌ Error during login:', error);
          toast({
            title: "Erro ao fazer login",
            description: "Por favor, verifique suas credenciais e tente novamente.",
            variant: "destructive"
          });
        }
      } else if (event === 'SIGNED_OUT') {
        console.log('👋 User signed out, redirecting to login');
        navigate('/login');
      }
    });

    return () => {
      console.log('🧹 Cleaning up login redirect subscription');
      subscription.unsubscribe();
    };
  }, [navigate, toast]);
};