import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useAuthCheck = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuthError = () => {
    console.log('🚫 Authentication error detected');
    toast({
      title: "Sessão expirada",
      description: "Por favor, faça login novamente.",
      variant: "destructive",
    });
    navigate('/login');
  };

  const checkSession = async () => {
    try {
      console.log('🔍 Checking session...');
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('❌ Session error:', sessionError);
        handleAuthError();
        return false;
      }

      if (!session) {
        console.log('⚠️ No active session found');
        handleAuthError();
        return false;
      }

      console.log('✅ Valid session found');
      return true;
    } catch (error) {
      console.error('❌ Error checking session:', error);
      handleAuthError();
      return false;
    }
  };

  return {
    checkSession,
    handleAuthError,
  };
};