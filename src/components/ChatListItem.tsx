import { MessageSquare, Edit2, Trash } from 'lucide-react';
import { SavedChat } from '@/types/chat';

interface ChatListItemProps {
  chat: SavedChat;
  onClick: (chat: SavedChat) => void;
}

export const ChatListItem = ({ chat, onClick }: ChatListItemProps) => {
  return (
    <div
      onClick={() => onClick(chat)}
      className="group flex h-10 items-center gap-2.5 rounded-lg px-4 hover:bg-token-sidebar-surface-secondary cursor-pointer relative mt-2"
    >
      <MessageSquare className="h-4 w-4" />
      <span className="text-sm truncate flex-1">{chat.title}</span>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Edit2 className="h-4 w-4 hover:text-blue-400" />
        <Trash className="h-4 w-4 hover:text-red-400" />
      </div>
    </div>
  );
};