import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import ChatHeader from '@/components/ChatHeader';
import ChatInput from '@/components/ChatInput';
import ActionButtons from '@/components/ActionButtons';
import MessageList from '@/components/MessageList';
import { Button } from '@/components/ui/button';
import { useChat } from '@/hooks/useChat';

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTestingApi, setIsTestingApi] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const {
    messages,
    isLoading,
    activeCategory,
    handlePromptSelect,
    handleSendMessage
  } = useChat();

  const testApiKeys = async () => {
    setIsTestingApi(true);
    const savedKeys = localStorage.getItem("api_keys");
    
    if (!savedKeys) {
      toast({
        title: "Erro",
        description: "Chaves API não encontradas. Configure suas chaves primeiro.",
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

  return (
    <div className="flex h-screen">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      <main className={`flex-1 transition-all duration-300 relative ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <ChatHeader 
          isSidebarOpen={isSidebarOpen} 
          activePrompt={activeCategory}
        />
        
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