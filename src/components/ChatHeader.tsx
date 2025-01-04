import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface ChatHeaderProps {
  isSidebarOpen: boolean;
  activeCategory?: string;
}

const ChatHeader = ({ isSidebarOpen, activeCategory }: ChatHeaderProps) => {
  return (
    <div className={cn(
      "fixed top-0 z-30 flex h-[60px] w-full items-center border-b border-white/20 bg-chatgpt-main transition-all duration-300",
      isSidebarOpen ? "pl-[280px]" : "pl-[76px]"
    )}>
      <div className="flex items-center gap-3 pl-4">
        <Star className="h-5 w-5 text-white" strokeWidth={1.5} />
        <Star className="h-5 w-5 text-white" strokeWidth={1.5} />
        <span className="text-lg font-semibold">
          ArcaGPT {activeCategory ? `(${activeCategory})` : ''}
        </span>
      </div>
    </div>
  );
};

export default ChatHeader;