import { Menu, MessageSquare, ChevronDown, User } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onNewChat?: () => void;
}

const Sidebar = ({ isOpen, onToggle, onNewChat }: SidebarProps) => {
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
      "fixed top-0 left-0 z-40 h-[calc(100vh-2rem)] bg-[#0f0f0f] shadow-lg transition-all duration-300 my-4 ml-4 rounded-lg",
      isOpen ? "w-52" : "w-0"
    )}>
      <nav className="flex h-full w-full flex-col px-3" aria-label="Chat history">
        <div className="flex justify-between items-center h-[60px]">
          <button 
            onClick={onToggle} 
            className="flex items-center justify-center h-10 w-10 rounded-lg hover:bg-chatgpt-hover transition-colors"
          >
            <Menu className="h-5 w-5 text-white" strokeWidth={1.5} />
          </button>
          <button 
            onClick={onNewChat}
            className="flex items-center justify-center h-10 w-10 rounded-lg hover:bg-chatgpt-hover transition-colors ml-8"
          >
            <MessageSquare className="h-5 w-5 text-white" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-col flex-1 transition-opacity duration-500 relative -mr-2 pr-2 overflow-y-auto">
          <div className="pt-0">
            <div className="flex flex-col gap-2 px-2 py-2">
              {mentorGPTs.map((gpt) => (
                <div key={gpt.title} className="group flex h-10 items-center gap-2.5 rounded-lg px-4 hover:bg-[#1a1a1a] cursor-pointer">
                  {gpt.icon}
                  <span className="text-sm text-gray-300">{gpt.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="flex flex-col py-2 border-t border-white/20">
            <button 
              onClick={() => navigate('/admin')}
              className="group flex gap-2 p-2.5 text-sm items-start hover:bg-[#1a1a1a] rounded-lg px-2 text-left w-full min-w-[180px]"
            >
              <span className="flex w-full flex-row flex-wrap-reverse justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-600">
                    <User className="h-4 w-4 text-gray-300" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-gray-300">Administrador</span>
                    <span className="line-clamp-1 text-xs text-gray-500">Configurações e chaves</span>
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