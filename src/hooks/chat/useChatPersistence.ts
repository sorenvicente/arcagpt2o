import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Message } from '@/types/chat';
import { useToast } from '@/components/ui/use-toast';
import { Json } from '@/integrations/supabase/types';

export const useChatPersistence = (
  messages: Message[],
  setMessages: (messages: Message[]) => void,
  chatId: string | null,
  setChatId: (id: string | null) => void
) => {
  const { toast } = useToast();

  const saveChat = useCallback(async () => {
    if (messages.length === 0) return;

    try {
      const title = messages[0].content.substring(0, 50) + '...';
      
      if (chatId) {
        const { error } = await supabase
          .from('saved_chats')
          .update({
            title,
            messages: messages as unknown as Json,
            updated_at: new Date().toISOString()
          })
          .eq('id', chatId);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('saved_chats')
          .insert({
            title,
            category: 'Geral',
            messages: messages as unknown as Json
          })
          .select('id')
          .single();

        if (error) throw error;
        if (data) setChatId(data.id);
      }
    } catch (error) {
      console.error('Error saving chat:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o chat.",
        variant: "destructive"
      });
    }
  }, [messages, chatId, setChatId, toast]);

  const loadChat = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('saved_chats')
        .select('messages')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setMessages(data.messages as Message[]);
        setChatId(id);
      } else {
        toast({
          title: "Erro",
          description: "Chat não encontrado.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error loading chat:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar o chat.",
        variant: "destructive"
      });
    }
  };

  return { saveChat, loadChat };
};