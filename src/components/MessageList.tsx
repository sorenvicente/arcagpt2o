import Message from './Message';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const MessageList = ({ messages }: { messages: Message[] }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="w-full max-w-3xl mx-auto px-4">
        {messages.map((message, index) => (
          <div key={index}>
            <Message {...message} />
            {index < messages.length - 1 && (
              <div className="w-full h-px bg-gray-700/50 my-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;