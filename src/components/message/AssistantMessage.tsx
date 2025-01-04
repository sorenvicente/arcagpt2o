import ReactMarkdown from 'react-markdown';
import MessageActions from '../MessageActions';

interface AssistantMessageProps {
  content: string;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

const AssistantMessage = ({ content, onRegenerate, isRegenerating }: AssistantMessageProps) => {
  return (
    <div className="space-y-2">
      <div className="prose prose-invert max-w-none">
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
      </div>
      <MessageActions 
        content={content} 
        onRegenerate={onRegenerate}
        isRegenerating={isRegenerating}
      />
    </div>
  );
};

export default AssistantMessage;