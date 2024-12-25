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
  { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI' },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5', provider: 'OpenAI' },
  { id: 'anthropic/claude-3', name: 'Claude', provider: 'Anthropic' },
  { id: 'meta/llama-2-70b', name: 'Llama', provider: 'Meta' },
  { id: 'google/gemini-pro', name: 'Gemini', provider: 'Google' },
];

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>(modelOptions[0].id);
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
            category: activeCategory || 'Geral',
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
  }, [messages, chatId, activeCategory, toast]);

  useEffect(() => {
    if (messages.length > 0) {
      saveChat();
    }
  }, [messages, saveChat]);

  const loadChat = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('saved_chats')
        .select('messages, category')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (data) {
        setMessages(data.messages as Message[]);
        setActiveCategory(data.category);
        setChatId(id);
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

  const handleNewChat = async () => {
    if (messages.length > 0) {
      await saveChat();
      setMessages([]);
      setChatId(null);
      setActiveCategory(null);
    } else {
      setMessages([]);
      setChatId(null);
      setActiveCategory(null);
    }
  };

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
    modelOptions,
    handleNewChat,
    loadChat,
    chatId
  };
};