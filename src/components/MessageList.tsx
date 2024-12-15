import Message from './Message';
import { Message as MessageType } from '@/types/chat';

const MessageList = ({ messages }: { messages: MessageType[] }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="w-full max-w-3xl mx-auto px-4 space-y-6">
        {messages.filter(msg => msg.role !== 'system').map((message, index) => (
          <Message key={index} {...message} />
        ))}
      </div>
    </div>
  );
};

export default MessageList;