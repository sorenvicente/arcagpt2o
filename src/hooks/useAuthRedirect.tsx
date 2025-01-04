import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export const useAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        return;
      }

      // Buscar o perfil do usuário para verificar o role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      // Se for admin, redireciona para o painel admin
      if (profile?.role === 'admin') {
        navigate('/admin');
      } else {
        // Se for usuário comum, redireciona para a interface principal
        navigate('/app');
      }
    };

    checkUserRole();
  }, [navigate]);

  return null;
};

export default useAuthRedirect;