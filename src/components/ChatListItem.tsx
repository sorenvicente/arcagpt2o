import { Grip } from 'lucide-react';
import { SavedChat } from '@/types/chat';
import { useState } from 'react';
import { ChatItemTitle } from './chat/ChatItemTitle';
import { ChatItemActions } from './chat/ChatItemActions';

interface ChatListItemProps {
  chat: SavedChat;
  onDelete: (chat: SavedChat) => void;
  onClick: () => void;
}

export const ChatListItem = ({ chat, onDelete, onClick }: ChatListItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(chat);
  };

  return (
    <div 
      className="group flex h-11 items-center gap-2.5 rounded-xl px-4 hover:bg-chatgpt-hover cursor-pointer relative mt-0.5 transition-all duration-200"
      onClick={onClick}
    >
      <Grip className="h-4 w-4 flex-shrink-0 rotate-90" />
      <div className="flex-1 truncate">
        <ChatItemTitle
          id={chat.id}
          title={chat.title}
          isEditing={isEditing}
          onEditEnd={() => setIsEditing(false)}
        />
      </div>
      <div className="flex-shrink-0">
        <ChatItemActions
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};