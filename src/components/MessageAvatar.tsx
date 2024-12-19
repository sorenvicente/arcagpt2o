import { User, BrainCircuit } from 'lucide-react';

interface MessageAvatarProps {
  isAssistant?: boolean;
}

const MessageAvatar = ({ isAssistant = false }: MessageAvatarProps) => {
  return (
    <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-background shadow">
      {isAssistant ? (
        <BrainCircuit className="h-5 w-5 text-primary" />
      ) : (
        <User className="h-5 w-5" />
      )}
    </div>
  );
};

export default MessageAvatar;