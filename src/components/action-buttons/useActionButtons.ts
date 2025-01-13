import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ActionButton {
  id: string;
  name: string;
  icon: string;
  label: string;
  category: string;
  color: string;
}

export const useActionButtons = () => {
  const [customButtons, setCustomButtons] = useState<ActionButton[]>([]);
  const { toast } = useToast();

  const loadCustomButtons = async () => {
    try {
      const { data, error } = await supabase
        .from('action_buttons')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) {
        console.error('Error loading custom buttons:', error);
        return;
      }
      
      setCustomButtons(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os botões personalizados.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    loadCustomButtons();

    const channel = supabase
      .channel('action_buttons_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'action_buttons' },
        () => {
          loadCustomButtons();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [toast]);

  return { customButtons };
};