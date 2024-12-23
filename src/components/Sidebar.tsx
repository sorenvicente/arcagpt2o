import { Menu, Plus } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { ChatListItem } from './ChatListItem';
import { UserMenu } from './UserMenu';
import { SavedChat } from '@/types/chat';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onNewChat: () => void;
}

const Sidebar = ({ isOpen, onToggle, onNewChat }: SidebarProps) => {
  const [savedChats, setSavedChats] = useState<SavedChat[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchSavedChats();
  }, []);

  const fetchSavedChats = async () => {
    try {
      const { data, error } = await supabase
        .from('saved_chats')
        .select('id, title, category, created_at')
        .order('created_at', { ascending: false })
        .limit(1);

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
    <div className={cn(
      "fixed top-0 left-0 z-40 h-screen bg-chatgpt-sidebar transition-all duration-300",
      isOpen ? "w-64" : "w-0"
    )}>
      <nav className="flex h-full w-full flex-col px-3" aria-label="Chat history">
        <div className="flex justify-between h-[60px] items-center">
          <button 
            onClick={onToggle} 
            className="flex items-center justify-center h-10 w-10 rounded-lg hover:bg-chatgpt-hover transition-colors mr-3"
          >
            <Menu className="h-5 w-5 text-white" strokeWidth={1.5} />
          </button>
          <button 
            onClick={onNewChat}
            className="flex items-center justify-center h-10 w-10 rounded-lg hover:bg-chatgpt-hover transition-colors ml-3"
          >
            <Plus className="h-5 w-5 text-white" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-col flex-1 transition-opacity duration-500 relative -mr-2 pr-2 overflow-y-auto">
          <div className="bg-token-sidebar-surface-primary pt-0">
            {savedChats.map((chat) => (
              <ChatListItem
                key={chat.id}
                chat={chat}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>

        {isOpen && (
          <div className="flex flex-col py-2 border-t border-white/20">
            <UserMenu />
          </div>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;