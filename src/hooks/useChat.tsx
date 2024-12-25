import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Message } from '@/types/chat';
import { useToast } from '@/components/ui/use-toast';
import { Json } from '@/integrations/supabase/types';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const { toast } = useToast();

  const saveChat = useCallback(async () => {
    if (messages.length === 0) return;

    try {
      const title = messages[0].content.substring(0, 50) + '...';
      
      // Get current number of saved chats
      const { data: existingChats, error: countError } = await supabase
        .from('saved_chats')
        .select('id')
        .order('created_at', { ascending: false });

      if (countError) throw countError;

      // If there's already a chat and this is a new chat, delete the existing one
      if (existingChats && existingChats.length > 0 && !chatId) {
        await supabase
          .from('saved_chats')
          .delete()
          .eq('id', existingChats[0].id);
      }
      
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
        .maybeSingle(); // Changed from single() to maybeSingle()

      if (error) throw error;
      if (data) {
        setMessages(data.messages as Message[]);
        setChatId(id);
      } else {
        // Handle case when chat is not found
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
          messages: [...messages, userMessage]
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
    handleNewChat,
    loadChat,
    chatId
  };
};