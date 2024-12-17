import { Menu, MessageSquare, ChevronDown, User, Settings, Key } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface Prompt {
  id: number;
  name: string;
  category: string;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const navigate = useNavigate();
  const [contentPrompts, setContentPrompts] = useState<Prompt[]>([]);
  
  const mentorGPTs = [
    { title: "Propósito", icon: <MessageSquare className="h-4 w-4" /> },
    { title: "Método", icon: <MessageSquare className="h-4 w-4" /> },
    { title: "Mentoria", icon: <MessageSquare className="h-4 w-4" /> },
    { title: "Curso", icon: <MessageSquare className="h-4 w-4" /> },
    { title: "Conteúdo", icon: <MessageSquare className="h-4 w-4" />, prompts: contentPrompts }
  ];

  useEffect(() => {
    const loadPrompts = () => {
      const savedPrompts = localStorage.getItem('prompts');
      if (savedPrompts) {
        const allPrompts = JSON.parse(savedPrompts);
        const filtered = allPrompts.filter((p: Prompt) => 
          p.category.toLowerCase() === 'conteudo' || 
          p.category.toLowerCase() === 'conteúdo'
        );
        setContentPrompts(filtered);
      }
    };

    loadPrompts();
    window.addEventListener('storage', loadPrompts);
    return () => window.removeEventListener('storage', loadPrompts);
  }, []);

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
            className="flex items-center justify-center h-10 w-10 rounded-lg hover:bg-chatgpt-hover transition-colors ml-3"
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
                <div key={gpt.title}>
                  <div className="group flex h-10 items-center gap-2.5 rounded-lg px-4 hover:bg-token-sidebar-surface-secondary cursor-pointer">
                    {gpt.icon}
                    <span className="text-sm">{gpt.title}</span>
                  </div>
                  {gpt.prompts && gpt.prompts.length > 0 && (
                    <div className="ml-8 flex flex-col gap-1">
                      {gpt.prompts.map((prompt) => (
                        <div 
                          key={prompt.id}
                          className="text-sm py-1 px-2 hover:bg-token-sidebar-surface-secondary cursor-pointer rounded-md text-gray-300"
                        >
                          {prompt.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
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
  );
};

export default Sidebar;