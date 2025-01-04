import { Menu, Plus } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { ChatListItem } from './ChatListItem';
import { UserMenu } from './UserMenu';
import { SavedChat } from '@/types/chat';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onNewChat: () => void;
  onChatSelect: (chatId: string) => void;
  activeCategory?: string;
}

const HOVER_THRESHOLD = 50;

const Sidebar = ({ isOpen, onToggle, onNewChat, onChatSelect, activeCategory }: SidebarProps) => {
  const [savedChats, setSavedChats] = useState<SavedChat[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();
  const { toast } = useToast();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientX <= HOVER_THRESHOLD && !isOpen && !isHovering) {
        clearTimeout(hoverTimeoutRef.current);
        setIsHovering(true);
        onToggle();
      } else if (e.clientX > 256 && isOpen && isHovering) { // 256px is sidebar width
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = setTimeout(() => {
          setIsHovering(false);
          onToggle();
        }, 300); // Small delay before closing
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(hoverTimeoutRef.current);
    };
  }, [isOpen, isHovering, onToggle]);

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
    <>
      <div className={cn(
        "fixed top-0 left-0 z-40 h-screen bg-chatgpt-sidebar transition-all duration-300",
        isOpen ? "w-64" : "w-0"
      )}>
        <nav className="flex h-full w-full flex-col px-3" aria-label="Chat history">
          <div className="flex h-[60px] items-center gap-3">
            <button 
              onClick={onToggle} 
              className="flex items-center justify-center h-10 w-10 rounded-lg hover:bg-chatgpt-hover transition-colors"
            >
              <Menu className="h-5 w-5 text-white" strokeWidth={1.5} />
            </button>
            <span className="text-sm font-medium whitespace-nowrap">
              ArcaGPT {activeCategory ? `(${activeCategory})` : ''}
            </span>
            <button 
              onClick={onNewChat}
              className="flex items-center justify-center h-10 w-10 rounded-lg hover:bg-chatgpt-hover transition-colors ml-auto"
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
                  onClick={() => onChatSelect(chat.id)}
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
    </>
  );
};

export default Sidebar;