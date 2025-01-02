import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { useToast } from "@/components/ui/use-toast";

export const useAuth = (requiredRole?: 'admin' | 'user') => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate('/login');
          return;
        }

        setUser(session.user);

        if (requiredRole === 'admin') {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (!profile || profile.role !== 'admin') {
            navigate('/');
            return;
          }
        }
      } catch (error) {
        console.error('Auth error:', error);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
        navigate('/login');
      } else if (session) {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, requiredRole]);

  const signOut = async () => {
    try {
      // Primeiro limpa o estado local
      setUser(null);
      
      // Tenta fazer o logout no Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Logout error:', error);
        toast({
          title: "Erro ao fazer logout",
          description: "Houve um problema ao desconectar sua conta.",
          variant: "destructive"
        });
      } else {
        // Limpa qualquer dado local se necessário
        localStorage.clear();
        
        // Redireciona para a página de login
        navigate('/login');
        
        toast({
          title: "Logout realizado",
          description: "Você foi desconectado com sucesso."
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Erro ao fazer logout",
        description: "Houve um problema ao desconectar sua conta.",
        variant: "destructive"
      });
    }
  };

  return { isLoading, user, signOut };
};