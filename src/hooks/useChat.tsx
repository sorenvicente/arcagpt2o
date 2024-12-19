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

  // Auto-save chat when messages change
  useEffect(() => {
    if (messages.length > 1 && activeCategory) { // Only save if there are messages and a category
      saveChat();
    }
  }, [messages]);

  const saveChat = async () => {
    try {
      // Get the first few words of the first user message as the title
      const firstUserMessage = messages.find(msg => msg.role === 'user')?.content || '';
      const title = firstUserMessage.split(' ').slice(0, 4).join(' ') + '...';

      const { error } = await supabase
        .from('saved_chats')
        .insert({
          title,
          category: activeCategory,
          messages: messages
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving chat:', error);
    }
  };

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
          stream: true,
          max_tokens: 2000,
          temperature: 0.7,
        })
      });

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let currentMessage = "";

      // Add an initial assistant message that we'll update
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices[0]?.delta?.content || '';
              currentMessage += content;
              
              // Update the last message with the accumulated content
              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].content = currentMessage;
                return newMessages;
              });
            } catch (e) {
              console.error('Error parsing chunk:', e);
            }
          }
        }
      }

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