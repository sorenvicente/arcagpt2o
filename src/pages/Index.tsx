import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import ChatHeader from '@/components/ChatHeader';
import ChatInput from '@/components/ChatInput';
import ActionButtons from '@/components/ActionButtons';
import MessageList from '@/components/MessageList';
import { Button } from '@/components/ui/button';

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTestingApi, setIsTestingApi] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePromptSelect = (promptContent: string) => {
    // Adiciona o prompt como uma mensagem do sistema
    setMessages(prev => {
      const systemMessage: Message = {
        role: 'system',
        content: promptContent
      };
      return [systemMessage, ...prev.filter(msg => msg.role !== 'system')];
    });

    toast({
      title: "Prompt selecionado",
      description: "O contexto foi atualizado com sucesso.",
    });
  };

  const testApiKeys = async () => {
    setIsTestingApi(true);
    const savedKeys = localStorage.getItem("api_keys");
    
    if (!savedKeys) {
      toast({
        title: "Erro",
        description: "Chaves API não encontradas. Por favor, configure suas chaves primeiro.",
        variant: "destructive",
        duration: 3000,
      });
      navigate('/api-keys');
      setIsTestingApi(false);
      return;
    }

    const keys = JSON.parse(savedKeys);
    
    if (!keys.openai_key || !keys.openrouter_key) {
      toast({
        title: "Erro",
        description: "Uma ou mais chaves API estão faltando. Configure-as primeiro.",
        variant: "destructive",
        duration: 3000,
      });
      navigate('/api-keys');
      setIsTestingApi(false);
      return;
    }

    try {
      // Teste da OpenAI API
      const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${keys.openai_key}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: "Hello" }],
          max_tokens: 5
        })
      });

      if (!openaiResponse.ok) {
        throw new Error("Chave OpenAI inválida");
      }

      // Teste da OpenRouter API
      const openrouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${keys.openrouter_key}`,
          'HTTP-Referer': window.location.origin,
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [{ role: "user", content: "Hello" }],
          max_tokens: 5
        })
      });

      if (!openrouterResponse.ok) {
        throw new Error("Chave OpenRouter inválida");
      }

      toast({
        title: "Sucesso!",
        description: "As duas chaves API foram testadas e estão funcionando corretamente.",
        duration: 3000,
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao testar as chaves API.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsTestingApi(false);
    }
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
        { role: 'user', content } as const
      ];
      
      setMessages(newMessages);

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${keys.openai_key}`
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: newMessages.filter(msg => msg.role !== 'system' || messages.indexOf(msg) === 0),
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

  return (
    <div className="flex h-screen">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      <main className={`flex-1 transition-all duration-300 relative ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <ChatHeader isSidebarOpen={isSidebarOpen} />
        
        <div className={`flex h-full flex-col ${messages.length === 0 ? 'items-center justify-center' : 'justify-between'} pt-[60px] pb-4`}>
          {messages.length === 0 ? (
            <div className="w-full max-w-3xl px-4 space-y-4">
              <div>
                <h1 className="mb-8 text-4xl font-semibold text-center">Como posso ajudar?</h1>
                <div className="mb-4">
                  <Button
                    onClick={testApiKeys}
                    disabled={isTestingApi}
                    className="w-full mb-4"
                  >
                    {isTestingApi ? "Testando..." : "Testar Chaves API"}
                  </Button>
                </div>
                <ActionButtons onSelectPrompt={handlePromptSelect} />
                <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
              </div>
            </div>
          ) : (
            <>
              <MessageList messages={messages.filter(msg => msg.role !== 'system')} />
              <div className="w-full max-w-3xl mx-auto px-4 py-2">
                <ActionButtons onSelectPrompt={handlePromptSelect} />
                <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;