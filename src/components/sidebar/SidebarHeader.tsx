import { Menu, Plus } from 'lucide-react';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface SidebarHeaderProps {
  onToggle: () => void;
  onNewChat: () => void;
  activeCategory?: string;
}

const SidebarHeader = ({ onToggle, onNewChat, activeCategory }: SidebarHeaderProps) => {
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
  });

  return (
    <div className="flex h-[60px] items-center gap-3">
      <button 
        onClick={onToggle} 
        className="flex items-center justify-center h-10 w-10 rounded-lg hover:bg-chatgpt-hover transition-colors"
      >
        <Menu className="h-5 w-5 text-white" strokeWidth={1.5} />
      </button>
      <span className="text-sm font-medium whitespace-nowrap">
        {settings?.application_name} {activeCategory ? `(${activeCategory})` : ''}
      </span>
      <button 
        onClick={onNewChat}
        className="flex items-center justify-center h-10 w-10 rounded-lg hover:bg-chatgpt-hover transition-colors ml-auto"
      >
        <Plus className="h-5 w-5 text-white" strokeWidth={1.5} />
      </button>
    </div>
  );
};

export default SidebarHeader;