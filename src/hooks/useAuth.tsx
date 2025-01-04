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
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }

        if (!session) {
          navigate('/login');
          return;
        }

        // Check if token is expired
        const tokenExpiryTime = new Date(session.expires_at! * 1000);
        const now = new Date();
        
        if (tokenExpiryTime < now) {
          const { data: { session: refreshedSession }, error: refreshError } = 
            await supabase.auth.refreshSession();
          
          if (refreshError || !refreshedSession) {
            throw new Error('Failed to refresh session');
          }
          
          setUser(refreshedSession.user);
        } else {
          setUser(session.user);
        }

        if (requiredRole === 'admin') {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (profileError) throw profileError;

          if (!profile || profile.role !== 'admin') {
            toast({
              title: "Acesso negado",
              description: "Você não tem permissão para acessar esta área.",
              variant: "destructive"
            });
            navigate('/');
            return;
          }
        }
      } catch (error) {
        console.error('Auth error:', error);
        toast({
          title: "Erro de autenticação",
          description: "Por favor, faça login novamente.",
          variant: "destructive"
        });
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
        if (!session) {
          setUser(null);
          navigate('/login');
        } else {
          setUser(session.user);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, requiredRole, toast]);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      localStorage.clear();
      navigate('/login');
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso."
      });
    } catch (error) {
      console.error('Logout error:', error);
      // Even if there's an error, ensure the user is logged out locally
      setUser(null);
      localStorage.clear();
      navigate('/login');
      toast({
        title: "Aviso no logout",
        description: "Houve um problema ao desconectar sua conta, mas você foi deslogado localmente.",
        variant: "destructive"
      });
    }
  };

  return { isLoading, user, signOut };
};