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

      // Remove a última resposta do assistente
      const newMessages = [...messages];
      newMessages.pop();
      setMessages(newMessages);

      // Pega a última mensagem do usuário
      const lastUserMessage = newMessages[newMessages.length - 1];
      
      // Envia a mensagem novamente
      await sendMessage(lastUserMessage.content);
      
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