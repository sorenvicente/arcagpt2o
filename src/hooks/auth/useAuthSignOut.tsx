import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { handleSignOut } from "@/utils/auth";

export const useAuthSignOut = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const signOut = async () => {
    const { success, error } = await handleSignOut();
    
    navigate('/login');
    
    toast({
      title: success ? "Logout realizado" : "Aviso no logout",
      description: success 
        ? "Você foi desconectado com sucesso."
        : "Houve um problema ao desconectar sua conta, mas você foi deslogado localmente.",
      variant: success ? "default" : "destructive"
    });
  };

  return { signOut };
};