import MessageAvatar from './MessageAvatar';
import MessageActions from './MessageActions';
import { Message as MessageType } from '@/types/chat';
import ReactMarkdown from 'react-markdown';

type MessageProps = Pick<MessageType, 'role' | 'content'>;

const Message = ({ role, content }: MessageProps) => {
  return (
    <div className="py-6">
      <div className={`flex gap-4 ${role === 'user' ? 'flex-row-reverse' : ''}`}>
        <MessageAvatar isAssistant={role === 'assistant'} />
        <div className={`flex-1 space-y-2 ${role === 'user' ? 'flex justify-end' : ''}`}>
          <div className={`${role === 'user' ? 'bg-gray-700/50 rounded-[20px] px-4 py-2 inline-block' : 'prose prose-invert max-w-none'}`}>
            {role === 'user' ? (
              content
            ) : (
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
                {content}
              </ReactMarkdown>
            )}
          </div>
          {role === 'assistant' && <MessageActions />}
        </div>
      </div>
    </div>
  );
};

export default Message;