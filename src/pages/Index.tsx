import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatHeader from '@/components/ChatHeader';
import ChatInput from '@/components/ChatInput';
import ActionButtons from '@/components/action-buttons/ActionButtons';
import MessageList from '@/components/MessageList';
import { useChat } from '@/hooks/useChat';
import { UserMenu } from '@/components/UserMenu';

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const {
    messages,
    isLoading,
    sendMessage,
    handleNewChat,
    loadChat,
    activeAssistant,
    regenerateResponse,
    stopGeneration
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
      
      <main className={`flex-1 transition-all duration-300 relative ${isSidebarOpen ? 'ml-[240px]' : 'ml-0'}`}>
        <div className="fixed top-0 z-50 w-full flex items-center justify-between bg-chatgpt-main px-4 py-2 h-[60px]">
          <ChatHeader 
            isSidebarOpen={isSidebarOpen}
            activeCategory={activeAssistant}
          />
          <div className="flex items-center gap-2">
            <UserMenu />
          </div>
        </div>
        
        <div className={`flex h-full flex-col pt-[60px] pb-4`}>
          {messages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-3xl px-4 space-y-6">
                <h1 className="text-4xl font-semibold text-center">Como posso ajudar?</h1>
                <div className="space-y-4">
                  <ActionButtons 
                    onSelectPrompt={sendMessage}
                    activeCategory={activeAssistant}
                  />
                  <ChatInput 
                    onSend={sendMessage} 
                    isLoading={isLoading}
                    onStop={stopGeneration}
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              <MessageList 
                messages={messages} 
                onRegenerate={regenerateResponse}
                isLoading={isLoading}
              />
              <div className="w-full max-w-3xl mx-auto px-4 space-y-4">
                <ActionButtons 
                  onSelectPrompt={sendMessage}
                  activeCategory={activeAssistant}
                />
                <ChatInput 
                  onSend={sendMessage} 
                  isLoading={isLoading}
                  onStop={stopGeneration}
                />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;