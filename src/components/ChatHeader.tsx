import { cn } from "@/lib/utils";

interface ChatHeaderProps {
  isSidebarOpen: boolean;
  activeCategory?: string;
}

const ChatHeader = ({ isSidebarOpen, activeCategory }: ChatHeaderProps) => {
  return (
    <div className={cn(
      "fixed top-0 z-30 flex h-[60px] w-full items-center justify-between border-b border-white/20 bg-chatgpt-main px-4 py-2 transition-all duration-300",
      isSidebarOpen ? "pl-[calc(256px+1rem)]" : "pl-4"
    )}>
      <span className="text-lg font-semibold">ArcaGPT {activeCategory ? `- ${activeCategory}` : ''}</span>
    </div>
  );
};

export default ChatHeader;