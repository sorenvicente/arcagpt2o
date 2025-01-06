import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "./useSession";
import { checkAdminRole, handleSignOut } from "@/utils/auth";

export const useAuth = (requiredRole?: 'admin' | 'user') => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const { session, getActiveSession } = useSession();

  useEffect(() => {
    let mounted = true;
    let checkTimeout: NodeJS.Timeout;

    const checkAuth = async () => {
      try {
        const currentSession = await getActiveSession();
        
        if (!currentSession) {
          if (mounted) {
            setUser(null);
            navigate('/login');
          }
          return;
        }

        if (mounted) {
          setUser(currentSession.user);
        }

        if (requiredRole === 'admin' && mounted) {
          const isAdmin = await checkAdminRole(currentSession.user.id);
          
          if (!isAdmin) {
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
        if (mounted) {
          toast({
            title: "Erro de autenticação",
            description: "Por favor, faça login novamente.",
            variant: "destructive"
          });
          await handleSignOut();
          navigate('/login');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    checkAuth();

    // Schedule periodic checks less frequently
    checkTimeout = setInterval(checkAuth, 5 * 60 * 1000); // Check every 5 minutes

    return () => {
      mounted = false;
      clearInterval(checkTimeout);
    };
  }, [navigate, requiredRole, toast, getActiveSession]);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    } else {
      setUser(null);
    }
  }, [session]);

  const signOut = async () => {
    const { success, error } = await handleSignOut();
    
    setUser(null);
    navigate('/login');
    
    toast({
      title: success ? "Logout realizado" : "Aviso no logout",
      description: success 
        ? "Você foi desconectado com sucesso."
        : "Houve um problema ao desconectar sua conta, mas você foi deslogado localmente.",
      variant: success ? "default" : "destructive"
    });
  };

  return { isLoading, user, signOut };
};