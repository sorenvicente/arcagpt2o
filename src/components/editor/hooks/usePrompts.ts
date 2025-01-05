import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const usePrompts = () => {
  const [prompts, setPrompts] = useState<any[]>([]);
  const { toast } = useToast();

  const loadPrompts = async () => {
    try {
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        setPrompts(data);
      }
    } catch (error) {
      console.error('Error loading prompts:', error);
      toast({
        title: "Error",
        description: "Could not load prompts. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    loadPrompts();
  }, []);

  return {
    prompts,
    loadPrompts
  };
};