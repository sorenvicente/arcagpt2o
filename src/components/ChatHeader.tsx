import { cn } from "@/lib/utils";

interface ChatHeaderProps {
  isSidebarOpen: boolean;
  activeCategory?: string;
}

const ChatHeader = ({ isSidebarOpen }: ChatHeaderProps) => {
  return (
    <div className={cn(
      "fixed top-0 z-30 flex h-[60px] w-full items-center border-b border-white/20 bg-chatgpt-main transition-all duration-300",
      isSidebarOpen ? "pl-[280px]" : "pl-[76px]"
    )}>
    </div>
  );
};

export default ChatHeader;