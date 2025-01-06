import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LoadingSpinner } from "@/components/auth/LoadingSpinner";
import { LoginForm } from "@/components/auth/LoginForm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('🔍 Verificando autenticação...');
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          console.log('✅ Usuário autenticado:', session.user.email);
          // Buscar o perfil do usuário
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .maybeSingle();

          if (profileError) {
            console.error('❌ Erro ao buscar perfil:', profileError);
            throw profileError;
          }

          // Redirecionar baseado no role
          if (profile?.role === 'admin') {
            console.log('👑 Usuário é admin, redirecionando...');
            navigate('/admin');
          } else {
            console.log('👤 Usuário comum, redirecionando...');
            navigate('/app');
          }
        }
      } catch (error) {
        console.error('❌ Erro ao verificar autenticação:', error);
        toast({
          title: "Erro ao verificar autenticação",
          description: "Por favor, tente novamente.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate, toast]);

  const handleLogout = async () => {
    try {
      console.log('🔄 Fazendo logout...');
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      console.log('✅ Logout realizado com sucesso');
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso."
      });
    } catch (error) {
      console.error('❌ Erro ao fazer logout:', error);
      toast({
        title: "Erro ao fazer logout",
        description: "Por favor, tente novamente.",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <LoginForm onLogout={handleLogout} />;
};

export default LoginPage;