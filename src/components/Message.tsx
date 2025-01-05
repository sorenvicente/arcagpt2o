import MessageAvatar from './MessageAvatar';
import { Message as MessageType } from '@/types/chat';
import UserMessage from './message/UserMessage';
import AssistantMessage from './message/AssistantMessage';

type MessageProps = Pick<MessageType, 'role' | 'content'> & {
  onRegenerate?: () => void;
  isRegenerating?: boolean;
};

const Message = ({ role, content, onRegenerate, isRegenerating }: MessageProps) => {
  // Ensure content is a string
  const messageContent = typeof content === 'string' 
    ? content 
    : JSON.stringify(content);

  return (
    <div className="py-6">
      <div className={`flex gap-2 ${role === 'user' ? 'flex-row-reverse' : ''}`}>
        <div className="flex-shrink-0">
          <MessageAvatar role={role} />
        </div>
        <div className={`flex-1 ${role === 'user' ? 'flex justify-end' : ''}`}>
          {role === 'user' ? (
            <UserMessage content={messageContent} />
          ) : (
            <AssistantMessage 
              content={messageContent}
              onRegenerate={onRegenerate}
              isRegenerating={isRegenerating}
            />
          )}
        </div>
      </div>
      {isRegenerating && role === 'assistant' && (
        <div className="mt-2 flex items-center justify-center">
          <div className="animate-pulse text-sm text-gray-400">
            Gerando resposta...
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;