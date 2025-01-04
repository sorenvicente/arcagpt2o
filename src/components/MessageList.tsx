import { Message as MessageType } from "@/types/chat";
import Message from "./Message";
import { useEffect, useRef } from "react";

type MessageListProps = {
  messages: MessageType[];
  onRegenerate?: () => void;
  isRegenerating?: boolean;
};

const MessageList = ({ messages, onRegenerate, isRegenerating }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="w-full max-w-3xl mx-auto px-4">
        <div className="space-y-8">
          {messages.filter(msg => msg.role !== 'system').map((message, index) => (
            <Message 
              key={index} 
              {...message} 
              onRegenerate={message.role === 'assistant' ? onRegenerate : undefined}
              isRegenerating={message.role === 'assistant' && isRegenerating}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default MessageList;