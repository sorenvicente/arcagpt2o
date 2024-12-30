import { supabase } from '@/integrations/supabase/client';
import { Message } from '@/types/chat';
import { useToast } from '@/components/ui/use-toast';

export const useChatMessages = (
  messages: Message[],
  setMessages: (messages: Message[]) => void,
  setIsLoading: (loading: boolean) => void,
  setActiveAssistant: (assistant: string | null) => void
) => {
  const { toast } = useToast();

  const sendMessage = async (content: string, category?: string) => {
    try {
      setIsLoading(true);
      
      let updatedMessages = [...messages];

      if (category) {
        setActiveAssistant(category);
        updatedMessages = [{ role: 'system', content }];
        toast({
          title: "Assistente Ativado",
          description: `Você pode começar a conversar com o assistente de ${category}`,
        });
      } else {
        const userMessage: Message = {
          role: 'user',
          content
        };
        updatedMessages.push(userMessage);
      }
      
      setMessages(updatedMessages);

      if (!category) {
        const { data, error } = await supabase.functions.invoke('chat', {
          body: { 
            messages: updatedMessages
          }
        });

        if (error) {
          throw error;
        }

        const botMessage: Message = {
          role: 'assistant',
          content: data.content,
        };

        setMessages(prev => [...prev, botMessage]);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar a mensagem.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage };
};