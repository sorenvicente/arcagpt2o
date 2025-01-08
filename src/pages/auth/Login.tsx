import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LoadingSpinner } from "@/components/auth/LoadingSpinner";
import { LoginForm } from "@/components/auth/LoginForm";

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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <LoginForm />;
};

export default LoginPage;