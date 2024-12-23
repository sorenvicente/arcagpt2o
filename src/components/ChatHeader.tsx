import { ChevronDown, Brain } from "lucide-react";
import { useState } from "react";

interface ChatHeaderProps {
  isSidebarOpen?: boolean;
  activePrompt?: string;
  activeCategory?: string;
}

const ChatHeader = ({ isSidebarOpen = true, activePrompt, activeCategory }: ChatHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 z-30 w-full border-b border-white/20 bg-chatgpt-main/95 backdrop-blur">
      <div className="flex h-[60px] items-center justify-between px-4">
        <div className="flex items-center gap-2 relative">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="flex items-center gap-2 hover:bg-chatgpt-secondary rounded-md px-2 py-1 cursor-pointer"
          >
            <span className={`font-semibold ${!isSidebarOpen ? 'ml-24' : ''}`}>
              {activeCategory ? `ArcGPT (${activeCategory})` : "ArcGPT"}
            </span>
            <ChevronDown className="h-4 w-4" />
          </button>
          
          {isMenuOpen && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-chatgpt-secondary rounded-md shadow-lg py-1 z-50">
              <div className="px-4 py-2 text-sm text-gray-300">
                {activePrompt ? (
                  <>
                    <p className="font-semibold mb-1">Agente Ativo: {activeCategory}</p>
                    <p className="text-xs opacity-75 break-words">{activePrompt}</p>
                  </>
                ) : (
                  <p>Nenhum agente selecionado</p>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="gizmo-shadow-stroke relative flex h-8 w-8 items-center justify-center rounded-full bg-token-main-surface-primary text-token-text-primary">
          <Brain className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;