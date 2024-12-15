import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Message } from '@/types/chat';
import { useNavigate } from 'react-router-dom';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activePrompt, setActivePrompt] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePromptSelect = (promptContent: string, category: string) => {
    setActivePrompt(promptContent);
    setActiveCategory(category);
    
    // Limpa as mensagens anteriores e define o novo contexto do sistema
    setMessages([{
      role: 'system',
      content: promptContent
    }]);

    toast({
      title: "Agente selecionado",
      description: `Contexto atualizado para: ${category}`,
    });
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

    const savedKeys = localStorage.getItem("api_keys");
    if (!savedKeys) {
      toast({
        title: "Erro",
        description: "Chaves API não encontradas. Configure suas chaves primeiro.",
        variant: "destructive",
        duration: 3000,
      });
      navigate('/api-keys');
      return;
    }

    const keys = JSON.parse(savedKeys);
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
          'Authorization': `Bearer ${keys.openai_key}`
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