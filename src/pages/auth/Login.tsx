import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LoadingSpinner } from "@/components/auth/LoadingSpinner";
import { LoginForm } from "@/components/auth/LoginForm";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const LoginPage = () => {
  const { toast } = useToast();
  const { isLoading } = useAuthRedirect();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso."
      });
    } catch (error) {
      console.error('Error signing out:', error);
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