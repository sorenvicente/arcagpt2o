import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import ChatHeader from '@/components/ChatHeader';
import ChatInput from '@/components/ChatInput';
import ActionButtons from '@/components/ActionButtons';
import MessageList from '@/components/MessageList';
import { useChat } from '@/hooks/useChat';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  const {
    messages,
    isLoading,
    sendMessage,
    setMessages,
    activeCategory,
    handlePromptSelect,
    selectedModel,
    setSelectedModel,
    modelOptions,
    handleNewChat,
    loadChat,
    chatId
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
                <div className="mb-4">
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um modelo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>OpenAI</SelectLabel>
                        {modelOptions
                          .filter(model => model.provider === 'OpenAI')
                          .map(model => (
                            <SelectItem key={model.id} value={model.id}>
                              {model.name}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Anthropic</SelectLabel>
                        {modelOptions
                          .filter(model => model.provider === 'Anthropic')
                          .map(model => (
                            <SelectItem key={model.id} value={model.id}>
                              {model.name}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Outros</SelectLabel>
                        {modelOptions
                          .filter(model => !['OpenAI', 'Anthropic'].includes(model.provider))
                          .map(model => (
                            <SelectItem key={model.id} value={model.id}>
                              {model.name} ({model.provider})
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <ActionButtons 
                  onSelectPrompt={handlePromptSelect}
                  activeCategory={activeCategory}
                />
                <ChatInput onSend={sendMessage} isLoading={isLoading} />
              </div>
            </div>
          ) : (
            <>
              <MessageList messages={messages.filter(msg => msg.role !== 'system')} />
              <div className="w-full max-w-3xl mx-auto px-4 py-2">
                <div className="mb-4">
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um modelo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>OpenAI</SelectLabel>
                        {modelOptions
                          .filter(model => model.provider === 'OpenAI')
                          .map(model => (
                            <SelectItem key={model.id} value={model.id}>
                              {model.name}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Anthropic</SelectLabel>
                        {modelOptions
                          .filter(model => model.provider === 'Anthropic')
                          .map(model => (
                            <SelectItem key={model.id} value={model.id}>
                              {model.name}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Outros</SelectLabel>
                        {modelOptions
                          .filter(model => !['OpenAI', 'Anthropic'].includes(model.provider))
                          .map(model => (
                            <SelectItem key={model.id} value={model.id}>
                              {model.name} ({model.provider})
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <ActionButtons 
                  onSelectPrompt={handlePromptSelect}
                  activeCategory={activeCategory}
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