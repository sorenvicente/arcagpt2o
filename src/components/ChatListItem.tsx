import { MessageSquare } from 'lucide-react';
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
      className="group flex h-10 items-center gap-2.5 rounded-lg px-4 hover:bg-chatgpt-hover cursor-pointer relative mt-2 transition-all duration-200 border border-transparent hover:border-chatgpt-border"
      onClick={onClick}
    >
      <MessageSquare className="h-4 w-4" />
      <ChatItemTitle
        id={chat.id}
        title={chat.title}
        isEditing={isEditing}
        onEditEnd={() => setIsEditing(false)}
      />
      <ChatItemActions
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};