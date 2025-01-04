import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

export const useAuth = (requiredRole?: 'admin' | 'user') => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const refreshSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      return session;
    } catch (error) {
      console.error('Error refreshing session:', error);
      return null;
    }
  };

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

        // Check if token is expired or will expire in the next 5 minutes
        const tokenExpiryTime = new Date(session.expires_at! * 1000);
        const now = new Date();
        const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60000);
        
        if (tokenExpiryTime < fiveMinutesFromNow) {
          console.log('Token expired or expiring soon, refreshing...');
          const refreshedSession = await refreshSession();
          
          if (!refreshedSession) {
            throw new Error('Failed to refresh session');
          }
          
          setUser(refreshedSession.user);
          console.log('Session refreshed successfully');
        } else {
          setUser(session.user);
        }

        if (requiredRole === 'admin') {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (profileError) {
            console.error('Error fetching profile:', profileError);
            throw profileError;
          }

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

    // Initial check
    checkAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      
      if (event === 'SIGNED_OUT') {
        setUser(null);
        navigate('/login');
      } else if (event === 'TOKEN_REFRESHED') {
        if (session) {
          console.log('Token refreshed, updating user');
          setUser(session.user);
        }
      } else if (event === 'SIGNED_IN') {
        if (session) {
          setUser(session.user);
          // Check admin role if required
          if (requiredRole === 'admin') {
            const { data: profile } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', session.user.id)
              .single();

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
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
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