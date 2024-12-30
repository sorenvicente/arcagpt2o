import { useState } from 'react';
import { Message } from '@/types/chat';

export const useChatCore = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeAssistant, setActiveAssistant] = useState<string | null>(null);

  return {
    messages,
    setMessages,
    isLoading,
    setIsLoading,
    activeAssistant,
    setActiveAssistant
  };
};