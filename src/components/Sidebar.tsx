import { Menu, MessageSquare, Plus, User, Settings, Key } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";
import { ChatActionsDialog } from './ChatActionsDialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SavedChat {
  id: string;
  title: string;
  category: string;
  created_at: string;
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onNewChat: () => void;
}

const Sidebar = ({ isOpen, onToggle, onNewChat }: SidebarProps) => {
  const navigate = useNavigate();
  const [savedChats, setSavedChats] = useState<SavedChat[]>([]);
  const [selectedChat, setSelectedChat] = useState<SavedChat | null>(null);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSavedChats();
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

  const handleDelete = async () => {
    if (!selectedChat) return;
    
    try {
      const { error } = await supabase
        .from('saved_chats')
        .delete()
        .eq('id', selectedChat.id);

      if (error) throw error;

      setSavedChats(savedChats.filter(chat => chat.id !== selectedChat.id));
      setIsActionsOpen(false);
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

  const handleRename = async (newTitle: string) => {
    if (!selectedChat) return;
    
    try {
      const { error } = await supabase
        .from('saved_chats')
        .update({ title: newTitle })
        .eq('id', selectedChat.id);

      if (error) throw error;

      setSavedChats(savedChats.map(chat => 
        chat.id === selectedChat.id ? { ...chat, title: newTitle } : chat
      ));
      toast({
        title: "Chat renomeado",
        description: "O título do chat foi atualizado com sucesso.",
      });
    } catch (error) {
      console.error('Error renaming chat:', error);
      toast({
        title: "Erro",
        description: "Não foi possível renomear o chat.",
        variant: "destructive"
      });
    }
  };

  const handleChatClick = (chat: SavedChat) => {
    setSelectedChat(chat);
    setIsActionsOpen(true);
  };

  return (
    <>
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
                <div
                  key={chat.id}
                  onClick={() => handleChatClick(chat)}
                  className="group flex h-10 items-center gap-2.5 rounded-lg px-4 hover:bg-token-sidebar-surface-secondary cursor-pointer relative mt-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-sm truncate flex-1">{chat.title}</span>
                </div>
              ))}
            </div>
          </div>

          {isOpen && (
            <div className="flex flex-col py-2 border-t border-white/20">
              <Popover>
                <PopoverTrigger asChild>
                  <button className="group flex gap-2 p-2.5 text-sm items-start hover:bg-token-sidebar-surface-secondary rounded-lg px-2 text-left w-full min-w-[200px]">
                    <span className="flex w-full flex-row flex-wrap-reverse justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-token-border-light">
                          <User className="h-4 w-4" />
                        </span>
                        <div className="flex flex-col">
                          <span>Administrador</span>
                          <span className="line-clamp-1 text-xs text-token-text-tertiary">Configurações e chaves</span>
                        </div>
                      </div>
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-2 bg-chatgpt-secondary border-chatgpt-border">
                  <div className="flex flex-col space-y-1">
                    <button
                      onClick={() => navigate('/admin')}
                      className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-chatgpt-hover text-white"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Prompts</span>
                    </button>
                    <button
                      onClick={() => navigate('/api-keys')}
                      className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-chatgpt-hover text-white"
                    >
                      <Key className="h-4 w-4" />
                      <span>API Keys</span>
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </nav>
      </div>

      <ChatActionsDialog
        isOpen={isActionsOpen}
        onClose={() => setIsActionsOpen(false)}
        onRename={handleRename}
        onDelete={handleDelete}
        chatTitle={selectedChat?.title || ''}
      />
    </>
  );
};

export default Sidebar;