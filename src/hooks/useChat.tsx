import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Message } from '@/types/chat';
import { useToast } from '@/components/ui/use-toast';
import { Json } from '@/integrations/supabase/types';

export type ModelOption = {
  id: string;
  name: string;
  provider: string;
};

export const modelOptions: ModelOption[] = [
  { id: 'gpt-4o', name: 'GPT-4 Turbo', provider: 'OpenAI' },
  { id: 'gpt-4o-mini', name: 'GPT-4 Mini', provider: 'OpenAI' },
  { id: 'anthropic/claude-3-sonnet', name: 'Claude 3 Sonnet', provider: 'Anthropic' },
  { id: 'anthropic/claude-2', name: 'Claude 2', provider: 'Anthropic' },
  { id: 'meta/llama-2-70b-chat', name: 'Llama 2 70B', provider: 'Meta' },
  { id: 'google/gemini-pro', name: 'Gemini Pro', provider: 'Google' },
];

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>(modelOptions[0].id);
  const { toast } = useToast();

  const saveChat = useCallback(async () => {
    if (messages.length === 0 || chatId) return;

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
        } else {
          console.error('Error saving chat:', error);
        }
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

      const { data, error } = await supabase.functions.invoke('chat', {
        body: { 
          messages: [...messages, userMessage],
          selectedModel 
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
    handlePromptSelect,
    selectedModel,
    setSelectedModel,
    modelOptions
  };
};