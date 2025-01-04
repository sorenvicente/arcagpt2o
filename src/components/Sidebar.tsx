import { useEffect, useRef, useState } from 'react';
import { cn } from "@/lib/utils";
import { UserMenu } from './UserMenu';
import SidebarHeader from './sidebar/SidebarHeader';
import ChatList from './sidebar/ChatList';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onNewChat: () => void;
  onChatSelect: (chatId: string) => void;
  activeCategory?: string;
}

const HOVER_THRESHOLD = 50;

const Sidebar = ({ isOpen, onToggle, onNewChat, onChatSelect, activeCategory }: SidebarProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientX <= HOVER_THRESHOLD && !isOpen && !isHovering) {
        clearTimeout(hoverTimeoutRef.current);
        setIsHovering(true);
        onToggle();
      } else if (e.clientX > 240 && isOpen && isHovering) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = setTimeout(() => {
          setIsHovering(false);
          onToggle();
        }, 300);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(hoverTimeoutRef.current);
    };
  }, [isOpen, isHovering, onToggle]);

  return (
    <div className={cn(
      "fixed top-0 left-0 z-40 h-screen transition-all duration-300",
      "bg-light-sidebar dark:bg-chatgpt-sidebar",
      "border-r border-light-border dark:border-chatgpt-border",
      isOpen ? "w-[240px]" : "w-0"
    )}>
      <nav className="flex h-full w-full flex-col px-3" aria-label="Chat history">
        <SidebarHeader 
          onToggle={onToggle}
          onNewChat={onNewChat}
          activeCategory={activeCategory}
        />
        
        <ChatList onChatSelect={onChatSelect} />

        {isOpen && (
          <div className="flex flex-col py-2 border-t border-light-border dark:border-white/20">
            <UserMenu />
          </div>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;