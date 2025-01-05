import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import HexLogo from "./HexLogo";

interface ChatHeaderProps {
  isSidebarOpen: boolean;
  activeCategory?: string;
}

const ChatHeader = ({ isSidebarOpen, activeCategory }: ChatHeaderProps) => {
  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("system_settings")
        .select("*")
        .single();

      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60, // 1 minute
    gcTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <header className="fixed top-0 z-10 flex h-[60px] w-full items-center justify-between bg-chatgpt-main px-4">
      <div className="flex items-center gap-2">
        {/* Removed the redundant text that was showing outside the sidebar */}
      </div>
      <div className="flex items-center gap-4">
        <span className="text-white">{settings?.application_name}</span>
        <HexLogo 
          size="32" 
          className="text-white" 
          customLogoUrl={settings?.logo_url}
        />
      </div>
    </header>
  );
};

export default ChatHeader;