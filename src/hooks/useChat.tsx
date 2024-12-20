import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Message } from '@/types/chat';
import { useToast } from '@/components/ui/use-toast';
import { Json } from '@/integrations/supabase/types';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { toast } = useToast();

  const saveChat = useCallback(async () => {
    if (messages.length === 0 || chatId) return;

    // Save chat in background without waiting
    void supabase
      .from('saved_chats')
      .insert({
        title: messages[0].content.substring(0, 50) + '...',
        category: activeCategory || 'Propósito',
        messages: messages as unknown as Json
      })
      .select('id')
      .single()
      .then(({ data, error }) => {
        if (!error && data) {
          setChatId(data.id);
        }
      })
      .catch(error => {
        console.error('Error saving chat:', error);
      });
  }, [messages, chatId, activeCategory]);

  useEffect(() => {
    if (messages.length > 0) {
      saveChat();
    }
  }, [messages, saveChat]);

  const handlePromptSelect = (prompt: string, category: string) => {
    setActiveCategory(category);
    sendMessage(prompt);
  };

  const sendMessage = async (content: string) => {
    try {
      setIsLoading(true);
      
      const userMessage: Message = {
        role: 'user',
        content
      };
      
      setMessages(prev => [...prev, userMessage]);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();
      const botMessage: Message = {
        role: 'assistant',
        content: data.reply,
      };

      setMessages(prev => [...prev, botMessage]);

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

  return {
    messages,
    isLoading,
    sendMessage,
    setMessages,
    activeCategory,
    handlePromptSelect
  };
};