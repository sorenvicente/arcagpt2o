import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "./useSession";
import { useAuthState } from "./auth/useAuthState";
import { useProfileCheck } from "./auth/useProfileCheck";
import { useAuthSignOut } from "./auth/useAuthSignOut";

export const useAuth = (requiredRole?: 'admin' | 'user') => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getActiveSession } = useSession();
  const { isLoading, setIsLoading, user, setUser, isAdmin, setIsAdmin } = useAuthState();
  const { checkUserProfile } = useProfileCheck();
  const { signOut } = useAuthSignOut();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('🔄 Verificando autenticação...');
        setIsLoading(true);
        
        const currentSession = await getActiveSession();
        
        if (!currentSession) {
          console.log('⚠️ Nenhuma sessão ativa encontrada');
          setIsLoading(false);
          if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
            toast({
              title: "Sessão expirada",
              description: "Por favor, faça login novamente.",
              variant: "destructive"
            });
            navigate('/login');
          }
          return;
        }

        setUser(currentSession.user);
        const userIsAdmin = await checkUserProfile(currentSession.user.id);
        setIsAdmin(userIsAdmin);

        if (requiredRole === 'admin' && !userIsAdmin) {
          console.log('🚫 Usuário não é administrador');
          toast({
            title: "Acesso negado",
            description: "Você não tem permissão para acessar esta área.",
            variant: "destructive"
          });
          navigate('/app');
          setIsLoading(false);
          return;
        }

        console.log('✅ Autenticação verificada com sucesso');
        setIsLoading(false);
      } catch (error) {
        console.error('❌ Erro de autenticação:', error);
        toast({
          title: "Erro de autenticação",
          description: "Por favor, faça login novamente.",
          variant: "destructive"
        });
        await signOut();
        navigate('/login');
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate, requiredRole, toast, getActiveSession, setIsLoading, setUser, setIsAdmin, checkUserProfile, signOut]);

  return { isLoading, user, signOut, isAdmin };
};