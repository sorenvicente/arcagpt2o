import MessageAvatar from './MessageAvatar';
import MessageActions from './MessageActions';
import { Message as MessageType } from '@/types/chat';
import ReactMarkdown from 'react-markdown';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

type MessageProps = Pick<MessageType, 'role' | 'content'> & {
  onRegenerate?: () => void;
  isRegenerating?: boolean;
};

const Message = ({ role, content, onRegenerate, isRegenerating }: MessageProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  // Ensure content is a string
  const messageContent = typeof content === 'string' 
    ? content 
    : JSON.stringify(content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Here you would typically save the edited content
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditedContent(messageContent);
    }
  };

  return (
    <div className="py-6">
      <div className={`flex gap-4 ${role === 'user' ? 'flex-row-reverse' : ''}`}>
        <div className="flex-shrink-0">
          <MessageAvatar role={role} />
        </div>
        <div className={`flex-1 space-y-2 ${role === 'user' ? 'flex justify-end' : ''}`}>
          <div 
            className={`relative group ${role === 'user' ? 'bg-gray-700/50 rounded-[20px] px-4 py-2 inline-block' : 'prose prose-invert max-w-none'}`}
            onMouseEnter={() => role === 'user' && setIsHovered(true)}
            onMouseLeave={() => role === 'user' && setIsHovered(false)}
          >
            {role === 'user' && isHovered && !isEditing && (
              <button
                onClick={handleEdit}
                className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded-md hover:bg-chatgpt-hover"
              >
                <Pencil className="h-4 w-4 text-[#8E9196] hover:text-white transition-colors" />
              </button>
            )}
            {role === 'user' && isEditing ? (
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent outline-none resize-none"
                autoFocus
              />
            ) : role === 'user' ? (
              messageContent
            ) : (
              <>
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-4">{children}</p>,
                    h1: ({ children }) => <h1 className="text-2xl font-bold mb-4">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-xl font-bold mb-3">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-lg font-bold mb-2">{children}</h3>,
                    ul: ({ children }) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
                    li: ({ children }) => <li className="mb-1">{children}</li>,
                    code: ({ children }) => <code className="bg-gray-800 px-1 rounded">{children}</code>,
                    pre: ({ children }) => (
                      <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4">
                        {children}
                      </pre>
                    ),
                  }}
                >
                  {messageContent}
                </ReactMarkdown>
              </>
            )}
          </div>
          {role === 'assistant' && (
            <MessageActions 
              content={messageContent} 
              onRegenerate={onRegenerate}
              isRegenerating={isRegenerating}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;