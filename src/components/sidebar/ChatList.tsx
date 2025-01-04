import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ChatListItem } from '../ChatListItem';
import { SavedChat } from '@/types/chat';

interface ChatListProps {
  onChatSelect: (chatId: string) => void;
}

const ChatList = ({ onChatSelect }: ChatListProps) => {
  const [savedChats, setSavedChats] = useState<SavedChat[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchSavedChats();

    const channel = supabase
      .channel('saved_chats_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'saved_chats'
        },
        () => {
          fetchSavedChats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchSavedChats = async () => {
    try {
      const { data, error } = await supabase
        .from('saved_chats')
        .select('id, title, category, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedChats(data || []);
    } catch (error) {
      console.error('Error fetching saved chats:', error);
    }
  };

  const handleDelete = async (chat: SavedChat) => {
    try {
      const { error } = await supabase
        .from('saved_chats')
        .delete()
        .eq('id', chat.id);

      if (error) throw error;

      setSavedChats(savedChats.filter(c => c.id !== chat.id));
      toast({
        title: "Chat excluído",
        description: "O chat foi removido com sucesso.",
      });
    } catch (error) {
      console.error('Error deleting chat:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o chat.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex-col flex-1 transition-opacity duration-500 relative -mr-2 pr-2 overflow-y-auto">
      <div className="bg-token-sidebar-surface-primary pt-0">
        {savedChats.map((chat) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            onDelete={handleDelete}
            onClick={() => onChatSelect(chat.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;