import { useState, useEffect } from 'react';
import { useChatCore } from './chat/useChatCore';
import { useChatMessages } from './chat/useChatMessages';
import { useChatPersistence } from './chat/useChatPersistence';
import { useChatRegeneration } from './chat/useChatRegeneration';

export const useChat = () => {
  const [chatId, setChatId] = useState<string | null>(null);
  
  const {
    messages,
    setMessages,
    isLoading,
    setIsLoading,
    activeAssistant,
    setActiveAssistant
  } = useChatCore();

  const { sendMessage, stopGeneration } = useChatMessages(
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

  const { regenerateResponse } = useChatRegeneration(
    messages,
    setMessages,
    setIsLoading
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

  return {
    messages,
    isLoading,
    sendMessage,
    handleNewChat,
    loadChat,
    chatId,
    activeAssistant,
    regenerateResponse,
    stopGeneration
  };
};