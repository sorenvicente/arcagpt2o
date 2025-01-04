import { useState, useEffect } from 'react';
import { useChatCore } from './chat/useChatCore';
import { useChatMessages } from './chat/useChatMessages';
import { useChatPersistence } from './chat/useChatPersistence';
import { useToast } from '@/components/ui/use-toast';

export const useChat = () => {
  const [chatId, setChatId] = useState<string | null>(null);
  const { toast } = useToast();
  
  const {
    messages,
    setMessages,
    isLoading,
    setIsLoading,
    activeAssistant,
    setActiveAssistant
  } = useChatCore();

  const { sendMessage } = useChatMessages(
    messages,
    setMessages,
    setIsLoading,
    setActiveAssistant
  );

  const { saveChat, loadChat } = useChatPersistence(
    messages,
    setMessages,
    chatId,
    setChatId
  );

  useEffect(() => {
    if (messages.length > 0) {
      saveChat();
    }
  }, [messages, saveChat]);

  const handleNewChat = async () => {
    if (messages.length > 0) {
      await saveChat();
    }
    setMessages([]);
    setChatId(null);
    setActiveAssistant(null);
  };

  const regenerateResponse = async () => {
    try {
      if (messages.length < 2) {
        toast({
          title: "Erro",
          description: "Não há mensagem anterior para regenerar.",
          variant: "destructive"
        });
        return;
      }

      // Mantém todo o histórico de mensagens exceto a última resposta do assistente
      const conversationHistory = [...messages];
      const lastMessage = conversationHistory.pop(); // Remove temporariamente a última mensagem

      if (lastMessage?.role !== 'assistant') {
        toast({
          title: "Erro",
          description: "Não há resposta do assistente para regenerar.",
          variant: "destructive"
        });
        return;
      }

      // Atualiza o estado removendo apenas a última resposta
      setMessages(conversationHistory);
      setIsLoading(true);

      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.access_token) {
          throw new Error('No authentication token available');
        }

        // Envia todas as mensagens anteriores para manter o contexto
        const { data, error } = await supabase.functions.invoke('chat', {
          body: { messages: conversationHistory },
          headers: {
            Authorization: `Bearer ${session.access_token}`
          }
        });

        if (error) {
          throw new Error(error.message || 'Failed to regenerate response');
        }

        if (!data?.content) {
          throw new Error('No response content received');
        }

        // Adiciona a nova resposta do assistente
        const newAssistantMessage = {
          role: 'assistant',
          content: data.content,
        };

        setMessages([...conversationHistory, newAssistantMessage]);
      } catch (error) {
        // Se houver erro, restaura a mensagem anterior do assistente
        setMessages([...conversationHistory, lastMessage]);
        throw error;
      }
      
    } catch (error) {
      console.error('Error regenerating response:', error);
      toast({
        title: "Erro",
        description: "Não foi possível regenerar a resposta.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
    handleNewChat,
    loadChat,
    chatId,
    activeAssistant,
    regenerateResponse
  };
};