import { MessageSquare, Edit2, Trash } from 'lucide-react';
import { SavedChat } from '@/types/chat';

interface ChatListItemProps {
  chat: SavedChat;
  onClick: (chat: SavedChat, position: { x: number; y: number }) => void;
}

export const ChatListItem = ({ chat, onClick }: ChatListItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    onClick(chat, {
      x: rect.right + 10,
      y: rect.top
    });
  };

  return (
    <div
      className="group flex h-10 items-center gap-2.5 rounded-lg px-4 hover:bg-chatgpt-hover cursor-pointer relative mt-2"
    >
      <MessageSquare className="h-4 w-4" />
      <span className="text-sm truncate flex-1">{chat.title}</span>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Edit2 
          className="h-4 w-4 hover:text-blue-400 cursor-pointer" 
          onClick={handleClick}
        />
        <Trash 
          className="h-4 w-4 hover:text-red-400 cursor-pointer" 
          onClick={handleClick}
        />
      </div>
    </div>
  );
};