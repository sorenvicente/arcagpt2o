import { useState } from 'react';
import { Message } from '@/types/chat';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export const useChatRegeneration = (
  messages: Message[],
  setMessages: (messages: Message[]) => void,
  setIsLoading: (loading: boolean) => void
) => {
  const { toast } = useToast();

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

        // Adiciona um timestamp para forçar uma nova resposta
        const timestamp = new Date().getTime();
        
        // Envia todas as mensagens anteriores para manter o contexto
        // junto com um parâmetro de temperatura mais alto para aumentar a variabilidade
        const { data, error } = await supabase.functions.invoke('chat', {
          body: { 
            messages: conversationHistory,
            timestamp, // Adiciona timestamp para evitar cache
            temperature: 0.9 // Aumenta a temperatura para mais variabilidade
          },
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
        const newAssistantMessage: Message = {
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

  return { regenerateResponse };
};