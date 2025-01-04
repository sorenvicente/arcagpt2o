import { Message as MessageType } from "@/types/chat";
import Message from "./Message";
import { useEffect, useRef } from "react";

type MessageListProps = {
  messages: MessageType[];
  onRegenerate?: () => void;
};

const MessageList = ({ messages, onRegenerate }: MessageListProps) => {
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
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default MessageList;