import { MessageSquare, Edit2, Trash2 } from 'lucide-react';
import { SavedChat } from '@/types/chat';
import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

interface ChatListItemProps {
  chat: SavedChat;
  onDelete: (chat: SavedChat) => void;
}

export const ChatListItem = ({ chat, onDelete }: ChatListItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(chat.title);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(chat);
  };

  const handleBlur = async () => {
    if (title.trim() === '') {
      setTitle(chat.title);
      setIsEditing(false);
      return;
    }

    if (title !== chat.title) {
      try {
        const { error } = await supabase
          .from('saved_chats')
          .update({ title: title })
          .eq('id', chat.id);

        if (error) throw error;

        toast({
          title: "Chat renomeado",
          description: "O título do chat foi atualizado com sucesso.",
        });
      } catch (error) {
        console.error('Error updating chat title:', error);
        setTitle(chat.title);
        toast({
          title: "Erro",
          description: "Não foi possível renomear o chat.",
          variant: "destructive"
        });
      }
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      inputRef.current?.blur();
    }
    if (e.key === 'Escape') {
      setTitle(chat.title);
      setIsEditing(false);
    }
  };

  return (
    <div className="group flex h-10 items-center gap-2.5 rounded-lg px-4 hover:bg-chatgpt-hover cursor-pointer relative mt-2">
      <MessageSquare className="h-4 w-4" />
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="bg-transparent text-sm flex-1 outline-none border-b border-chatgpt-border"
          autoFocus
        />
      ) : (
        <span className="text-sm truncate flex-1">{title}</span>
      )}
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Edit2 
          className="h-4 w-4 hover:text-blue-400 cursor-pointer" 
          onClick={handleEdit}
        />
        <Trash2 
          className="h-4 w-4 hover:text-red-400 cursor-pointer" 
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};