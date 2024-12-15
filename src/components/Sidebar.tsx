import { Menu, MessageSquare, ChevronDown, User } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const navigate = useNavigate();
  
  const mentorGPTs = [
    { title: "Propósito", icon: <MessageSquare className="h-4 w-4" /> },
    { title: "Método", icon: <MessageSquare className="h-4 w-4" /> },
    { title: "Mentoria", icon: <MessageSquare className="h-4 w-4" /> },
    { title: "Curso", icon: <MessageSquare className="h-4 w-4" /> },
    { title: "Conteúdo", icon: <MessageSquare className="h-4 w-4" /> }
  ];

  return (
    <div className={cn(
      "fixed top-0 left-0 z-40 h-screen bg-chatgpt-sidebar transition-all duration-300",
      isOpen ? "w-64" : "w-0"
    )}>
      <nav className="flex h-full w-full flex-col px-3" aria-label="Chat history">
        <div className="flex justify-between flex h-[60px] items-center">
          <button 
            onClick={onToggle} 
            className="flex items-center justify-center h-10 w-10 rounded-lg hover:bg-chatgpt-hover transition-colors"
          >
            <Menu className="h-5 w-5 text-white" strokeWidth={1.5} />
          </button>
          <button 
            className="flex items-center justify-center h-10 w-10 rounded-lg hover:bg-chatgpt-hover transition-colors"
            onClick={() => setMessages([])}
          >
            <MessageSquare className="h-5 w-5 text-white" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-col flex-1 transition-opacity duration-500 relative -mr-2 pr-2 overflow-y-auto">
          <div className="bg-token-sidebar-surface-primary pt-0">
            <div className="flex flex-col gap-2 px-2 py-2">
              <div className="group flex h-10 items-center gap-2.5 rounded-lg px-2 hover:bg-token-sidebar-surface-secondary cursor-pointer">
                <div className="h-6 w-6 flex items-center justify-center">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <span className="text-sm">ChatGPT</span>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <div className="px-3 py-2 text-xs text-gray-500">Mentor GPTs</div>
              {mentorGPTs.map((gpt) => (
                <div key={gpt.title} className="group flex h-10 items-center gap-2.5 rounded-lg px-4 hover:bg-token-sidebar-surface-secondary cursor-pointer">
                  {gpt.icon}
                  <span className="text-sm">{gpt.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="flex flex-col py-2 border-t border-white/20">
            <button 
              onClick={() => navigate('/admin')}
              className="group flex gap-2 p-2.5 text-sm items-start hover:bg-token-sidebar-surface-secondary rounded-lg px-2 text-left w-full min-w-[200px]"
            >
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
          </div>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
