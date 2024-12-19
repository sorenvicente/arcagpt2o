import { User } from 'lucide-react';

interface MessageAvatarProps {
  isAssistant?: boolean;
}

const MessageAvatar = ({ isAssistant = false }: MessageAvatarProps) => {
  return (
    <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-background shadow">
      {isAssistant ? (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-primary"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2a5 5 0 0 1 5 5v2a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5z" />
          <path d="M3 12a9 9 0 0 0 18 0" />
          <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        </svg>
      ) : (
        <User className="h-5 w-5" />
      )}
    </div>
  );
};

export default MessageAvatar;