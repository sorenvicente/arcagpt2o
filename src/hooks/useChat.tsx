import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Message } from '@/types/chat';
import { useToast } from '@/components/ui/use-toast';
import { Json } from '@/integrations/supabase/types';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [activeAssistant, setActiveAssistant] = useState<string | null>(null);
  const { toast } = useToast();

  const saveChat = useCallback(async () => {
    if (messages.length === 0) return;

    try {
      const title = messages[0].content.substring(0, 50) + '...';
      
      if (chatId) {
        // Update existing chat
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
        // Create new chat
        const { data, error } = await supabase
          .from('saved_chats')
          .insert({
            title,
            category: 'Geral',
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
  }, [messages, chatId, toast]);

  useEffect(() => {
    if (messages.length > 0) {
      saveChat();
    }
  }, [messages, saveChat]);

  const loadChat = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('saved_chats')
        .select('messages')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setMessages(data.messages as Message[]);
        setChatId(id);
      } else {
        toast({
          title: "Erro",
          description: "Chat não encontrado.",
          variant: "destructive"
        });
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
    }
    setMessages([]);
    setChatId(null);
    setActiveAssistant(null);
  };

  const sendMessage = async (content: string, category?: string) => {
    try {
      setIsLoading(true);
      
      let updatedMessages = [...messages];

      // If this is a system message (from action buttons)
      if (category) {
        setActiveAssistant(category);
        updatedMessages = [{ role: 'system', content }];
        toast({
          title: "Assistente Ativado",
          description: `Você pode começar a conversar com o assistente de ${category}`,
        });
      } else {
        // Regular user message
        const userMessage: Message = {
          role: 'user',
          content
        };
        updatedMessages.push(userMessage);
      }
      
      setMessages(updatedMessages);

      if (!category) { // Only make API call for user messages, not system messages
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

  return {
    messages,
    isLoading,
    sendMessage,
    handleNewChat,
    loadChat,
    chatId,
    activeAssistant
  };
};