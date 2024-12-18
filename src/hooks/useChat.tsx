import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Message } from '@/types/chat';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activePrompt, setActivePrompt] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [apiKeys, setApiKeys] = useState<{ openai_key: string; openrouter_key: string } | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .limit(1)
        .single();

      if (error) throw error;
      setApiKeys(data);
    } catch (error) {
      console.error('Error fetching API keys:', error);
    }
  };

  const handlePromptSelect = (promptContent: string, category: string) => {
    if (!promptContent || !category) {
      console.log('Prompt ou categoria inválidos:', { promptContent, category });
      return;
    }

    setActivePrompt(promptContent);
    setActiveCategory(category);
    
    setMessages([{
      role: 'system',
      content: promptContent
    }]);

    toast({
      title: "Agente selecionado",
      description: `Contexto atualizado para: ${category}`,
    });

    console.log('Prompt selecionado:', { promptContent, category });
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, digite uma mensagem",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    if (!apiKeys?.openai_key) {
      toast({
        title: "Erro",
        description: "Chaves API não encontradas. Configure suas chaves primeiro.",
        variant: "destructive",
        duration: 3000,
      });
      navigate('/api-keys');
      return;
    }

    setIsLoading(true);

    try {
      const newMessages = [
        ...messages,
        { role: 'user' as const, content }
      ];
      
      setMessages(newMessages);

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKeys.openai_key}`
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: newMessages,
          max_tokens: 1000,
          temperature: 0.7,
        })
      });

      if (!response.ok) {
        throw new Error("Erro ao obter resposta da API");
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices[0].message.content
      };

      setMessages([...newMessages, assistantMessage]);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao processar sua mensagem",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    activePrompt,
    activeCategory,
    handlePromptSelect,
    handleSendMessage
  };
};