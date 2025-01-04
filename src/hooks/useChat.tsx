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

      // Encontra a última mensagem do usuário e a última do assistente
      const lastMessages = [...messages];
      const assistantMessage = lastMessages.pop(); // Remove a última mensagem (do assistente)
      const userMessage = lastMessages[lastMessages.length - 1];

      if (assistantMessage?.role !== 'assistant' || userMessage?.role !== 'user') {
        toast({
          title: "Erro",
          description: "Não foi possível regenerar a resposta.",
          variant: "destructive"
        });
        return;
      }

      // Remove a última resposta do assistente do estado
      setMessages(lastMessages);
      
      // Faz uma nova solicitação com a mesma mensagem do usuário
      await sendMessage(userMessage.content);
      
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível regenerar a resposta.",
        variant: "destructive"
      });
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