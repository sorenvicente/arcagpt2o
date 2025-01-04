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
  const [isAnimating, setIsAnimating] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();
  const contentRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <>
      {/* Background overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/20 transition-opacity duration-500",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => onToggle()}
      />
      
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed top-0 left-0 z-40 h-screen",
          "bg-chatgpt-sidebar dark:bg-chatgpt-sidebar",
          "border-r border-chatgpt-border dark:border-chatgpt-border",
          "transition-all duration-500 ease-in-out",
          isOpen ? "w-[240px] opacity-100" : "w-[240px] opacity-0 pointer-events-none",
          isOpen ? "animate-sidebarIn" : isAnimating ? "animate-sidebarOut" : ""
        )}
      >
        <div 
          ref={contentRef}
          className={cn(
            "flex h-full w-full flex-col px-3",
            "transition-all duration-500 ease-in-out",
            isOpen ? "opacity-100" : "opacity-0"
          )}
        >
          <SidebarHeader 
            onToggle={onToggle}
            onNewChat={onNewChat}
            activeCategory={activeCategory}
          />
          
          <ChatList onChatSelect={onChatSelect} />

          {isOpen && (
            <div className="flex flex-col py-2 border-t border-chatgpt-border">
              <UserMenu />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;