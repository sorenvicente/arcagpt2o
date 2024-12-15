import MessageAvatar from './MessageAvatar';
import MessageActions from './MessageActions';
import { Message as MessageType } from '@/types/chat';

type MessageProps = Pick<MessageType, 'role' | 'content'>;

const Message = ({ role, content }: MessageProps) => {
  // Function to add proper spacing between paragraphs
  const formatContent = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => (
      <p key={index} className="mb-4 last:mb-0">
        {paragraph.split('\n').map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </p>
    ));
  };

  return (
    <div className="py-6">
      <div className={`flex gap-4 ${role === 'user' ? 'flex-row-reverse' : ''}`}>
        <MessageAvatar isAssistant={role === 'assistant'} />
        <div className={`flex-1 space-y-4 ${role === 'user' ? 'flex justify-end' : ''}`}>
          <div className={`${role === 'user' ? 'bg-gray-700/50 rounded-[20px] px-6 py-4 inline-block' : ''}`}>
            {formatContent(content)}
          </div>
          {role === 'assistant' && <MessageActions />}
        </div>
      </div>
    </div>
  );
};

export default Message;