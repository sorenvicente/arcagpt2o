import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "./useSession";
import { checkAdminRole, handleSignOut } from "@/utils/auth";
import { supabase } from "@/integrations/supabase/client";

export const useAuth = (requiredRole?: 'admin' | 'user') => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const { session, getActiveSession } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);

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

        // Verificar perfil do usuário
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', currentSession.user.id)
          .single();

        if (profileError) {
          console.error('Erro ao buscar perfil:', profileError);
          throw new Error('Falha ao verificar permissões');
        }

        const userIsAdmin = profile?.role === 'admin';
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
        await handleSignOut();
        navigate('/login');
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

  return { isLoading, user, signOut, isAdmin };
};