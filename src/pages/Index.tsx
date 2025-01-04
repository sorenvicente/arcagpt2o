import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatHeader from '@/components/ChatHeader';
import ChatInput from '@/components/ChatInput';
import ActionButtons from '@/components/ActionButtons';
import MessageList from '@/components/MessageList';
import { useChat } from '@/hooks/useChat';

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const {
    messages,
    isLoading,
    sendMessage,
    handleNewChat,
    loadChat,
    activeAssistant,
    regenerateResponse
  } = useChat();

  return (
    <div className="flex h-screen">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onNewChat={handleNewChat}
        onChatSelect={loadChat}
        activeCategory={activeAssistant}
      />
      
      <main className={`flex-1 transition-all duration-300 relative ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <ChatHeader 
          isSidebarOpen={isSidebarOpen}
          activeCategory={activeAssistant}
        />
        
        <div className={`flex h-full flex-col pt-[60px] pb-4`}>
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-3xl px-4 space-y-8">
                  <h1 className="text-4xl font-semibold text-center">Como posso ajudar?</h1>
                  <ActionButtons 
                    onSelectPrompt={sendMessage}
                    activeCategory={activeAssistant}
                  />
                  <ChatInput onSend={sendMessage} isLoading={isLoading} />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="w-full max-w-3xl mx-auto px-4 mb-4">
                <ActionButtons 
                  onSelectPrompt={sendMessage}
                  activeCategory={activeAssistant}
                />
              </div>
              <MessageList 
                messages={messages} 
                onRegenerate={regenerateResponse}
                isLoading={isLoading}
              />
              <div className="w-full max-w-3xl mx-auto px-4 py-2">
                <ChatInput onSend={sendMessage} isLoading={isLoading} />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;