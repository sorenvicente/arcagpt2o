import { User } from 'lucide-react';

interface MessageAvatarProps {
  isAssistant?: boolean;
}

const MessageAvatar = ({ isAssistant = false }: MessageAvatarProps) => {
  return (
    <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border bg-background shadow relative">
      {isAssistant ? (
        <div className="relative">
          <div className="text-primary font-bold text-lg">A</div>
          <svg
            className="absolute -top-1 -right-2 w-3 h-3 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        </div>
      ) : (
        <User className="h-5 w-5" />
      )}
    </div>
  );
};

export default MessageAvatar;