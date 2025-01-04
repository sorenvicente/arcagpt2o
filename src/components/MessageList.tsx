import { Message as MessageType } from "@/types/chat";
import Message from "./Message";
import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";

interface MessageListProps {
  messages: MessageType[];
  onRegenerate?: () => void;
  isLoading?: boolean;
}

const MessageList = ({ messages, onRegenerate, isLoading }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="relative flex-1 overflow-y-auto">
      <div className="w-full max-w-3xl mx-auto px-4">
        <div className="space-y-8">
          {messages.map((message, index) => (
            <Message
              key={index}
              role={message.role}
              content={message.content}
              onRegenerate={
                index === messages.length - 1 && message.role === "assistant"
                  ? onRegenerate
                  : undefined
              }
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-chatgpt-main p-6 rounded-lg shadow-lg flex items-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
            <span className="text-white">Gerando resposta...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;