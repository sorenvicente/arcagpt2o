import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const usePrompts = () => {
  const [prompts, setPrompts] = useState<any[]>([]);
  const { toast } = useToast();

  const loadPrompts = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        console.log('No active session, refreshing...');
        const { data: { session: refreshedSession }, error: refreshError } = await supabase.auth.refreshSession();
        if (refreshError) {
          throw refreshError;
        }
        if (!refreshedSession) {
          throw new Error('Failed to refresh session');
        }
      }

      const { data, error } = await supabase
        .from('prompt_blocks')
        .select('*');
      
      if (error) {
        console.error('Error loading prompts:', error);
        throw error;
      }

      if (data) {
        console.log('Prompts carregados:', data);
        setPrompts(data);
      }
    } catch (error) {
      console.error('Error loading prompts:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os prompts.",
        variant: "destructive",
      });
    }
  };

  return {
    prompts,
    loadPrompts
  };
};