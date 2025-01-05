import ReactMarkdown from 'react-markdown';
import MessageActions from '../MessageActions';

interface AssistantMessageProps {
  content: string;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

const AssistantMessage = ({ content, onRegenerate, isRegenerating }: AssistantMessageProps) => {
  // Check if content contains HTML tags
  const hasHtmlTags = /<[^>]*>/g.test(content);

  return (
    <div className="space-y-4">
      <div className="prose prose-invert max-w-none leading-relaxed">
        {hasHtmlTags ? (
          <div 
            dangerouslySetInnerHTML={{ __html: content }} 
            className="space-y-4"
          />
        ) : (
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-6 leading-7">{children}</p>,
              h1: ({ children }) => <h1 className="text-2xl font-bold mb-6 mt-8">{children}</h1>,
              h2: ({ children }) => <h2 className="text-xl font-bold mb-4 mt-6">{children}</h2>,
              h3: ({ children }) => <h3 className="text-lg font-bold mb-3 mt-5">{children}</h3>,
              ul: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>,
              li: ({ children }) => <li className="mb-2">{children}</li>,
              code: ({ children }) => <code className="bg-gray-800 px-1.5 py-0.5 rounded">{children}</code>,
              pre: ({ children }) => (
                <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto mb-6 mt-4">
                  {children}
                </pre>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        )}
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