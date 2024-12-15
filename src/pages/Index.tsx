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
  role: 'user' | 'assistant';
  content: string;
};

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTestingApi, setIsTestingApi] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const testApiKeys = async () => {
    setIsTestingApi(true);
    const savedKeys = localStorage.getItem("api_keys");
    
    if (!savedKeys) {
      toast({
        title: "Erro",
        description: "Chaves API não encontradas. Por favor, configure suas chaves primeiro.",
        variant: "destructive"
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
        variant: "destructive"
      });
      navigate('/api-keys');
      setIsTestingApi(false);
      return;
    }

    // Simula um teste básico
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Sucesso!",
        description: "As chaves API foram encontradas no sistema.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao testar as chaves API.",
        variant: "destructive"
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
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const newMessages = [
        ...messages,
        { role: 'user', content } as const
      ];
      
      setMessages(newMessages);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const assistantMessage: Message = {
        role: 'assistant',
        content: "Olá! Sou uma resposta pré-definida. A conexão com o banco de dados foi removida para fins de teste. Você pode modificar esta resposta no arquivo Index.tsx."
      };

      setMessages([...newMessages, assistantMessage]);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive"
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
                <ActionButtons />
                <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
              </div>
            </div>
          ) : (
            <>
              <MessageList messages={messages} />
              <div className="w-full max-w-3xl mx-auto px-4 py-2">
                <ActionButtons />
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