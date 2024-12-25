import { useState } from 'react';
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
  } = useChat();

  return (
    <div className="flex h-screen">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onNewChat={handleNewChat}
        onChatSelect={loadChat}
      />
      
      <main className={`flex-1 transition-all duration-300 relative ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <ChatHeader 
          isSidebarOpen={isSidebarOpen} 
        />
        
        <div className={`flex h-full flex-col ${messages.length === 0 ? 'items-center justify-center' : 'justify-between'} pt-[60px] pb-4`}>
          {messages.length === 0 ? (
            <div className="w-full max-w-3xl px-4 space-y-4">
              <div>
                <h1 className="mb-8 text-4xl font-semibold text-center">Como posso ajudar?</h1>
                <ActionButtons 
                  onSelectPrompt={sendMessage}
                  activeCategory={null}
                />
                <ChatInput onSend={sendMessage} isLoading={isLoading} />
              </div>
            </div>
          ) : (
            <>
              <MessageList messages={messages} />
              <div className="w-full max-w-3xl mx-auto px-4 py-2">
                <ActionButtons 
                  onSelectPrompt={sendMessage}
                  activeCategory={null}
                />
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