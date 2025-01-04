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
              isRegenerating={
                index === messages.length - 1 && 
                message.role === "assistant" && 
                isLoading
              }
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default MessageList;