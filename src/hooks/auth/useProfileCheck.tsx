import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const useProfileCheck = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const checkUserProfile = async (userId: string) => {
    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .maybeSingle();

      if (profileError) {
        console.error('Erro ao buscar perfil:', profileError);
        throw new Error('Falha ao verificar permissões');
      }

      return profile?.role === 'admin';
    } catch (error) {
      console.error('Erro ao verificar perfil:', error);
      toast({
        title: "Erro ao verificar perfil",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive"
      });
      return false;
    }
  };

  return { checkUserProfile };
};