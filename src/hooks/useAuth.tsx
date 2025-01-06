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
    const checkAuth = async () => {
      try {
        console.log('🔄 Checking authentication...');
        setIsLoading(true);
        
        const currentSession = await getActiveSession();
        
        if (!currentSession) {
          console.log('⚠️ No active session found');
          navigate('/login');
          return;
        }

        setUser(currentSession.user);

        if (requiredRole === 'admin') {
          console.log('🔍 Checking admin role...');
          const isAdmin = await checkAdminRole(currentSession.user.id);
          
          if (!isAdmin) {
            console.log('🚫 User is not an admin');
            toast({
              title: "Acesso negado",
              description: "Você não tem permissão para acessar esta área.",
              variant: "destructive"
            });
            navigate('/');
            return;
          }
          console.log('✅ Admin role confirmed');
        }
      } catch (error) {
        console.error('❌ Auth error:', error);
        toast({
          title: "Erro de autenticação",
          description: "Por favor, faça login novamente.",
          variant: "destructive"
        });
        await handleSignOut();
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate, requiredRole, toast, getActiveSession]);

  useEffect(() => {
    setUser(session?.user ?? null);
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