import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useAuthCheck = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuthError = () => {
    toast({
      title: "Sessão expirada",
      description: "Por favor, faça login novamente.",
      variant: "destructive",
    });
    navigate('/login');
  };

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      handleAuthError();
      return false;
    }
    return true;
  };

  return {
    checkSession,
    handleAuthError,
  };
};