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
  let controller: AbortController | null = null;

  const stopGeneration = () => {
    if (controller) {
      controller.abort();
      setIsLoading(false);
      toast({
        title: "Geração interrompida",
        description: "A geração da resposta foi interrompida.",
      });
    }
  };

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
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.access_token) {
          throw new Error('No authentication token available');
        }

        controller = new AbortController();

        const { data, error } = await supabase.functions.invoke('chat', {
          body: { 
            messages: updatedMessages,
            signal: controller.signal // This will be handled by the Edge Function
          },
          headers: {
            Authorization: `Bearer ${session.access_token}`
          }
        });

        if (error) {
          console.error('Error from chat function:', error);
          throw new Error(error.message || 'Failed to send message');
        }

        if (!data?.content) {
          throw new Error('No response content received');
        }

        const botMessage: Message = {
          role: 'assistant',
          content: data.content,
        };

        setMessages([...updatedMessages, botMessage]);
      }

    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Request aborted');
        return;
      }
      console.error('Error sending message:', error);
      toast({
        title: "Erro",
        description: error.message || "Não foi possível enviar a mensagem. Por favor, verifique suas chaves API.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      controller = null;
    }
  };

  return { sendMessage, stopGeneration };
};