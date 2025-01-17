import { User } from "lucide-react";
import HexLogo from "./HexLogo";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface MessageAvatarProps {
  role: "assistant" | "user" | "system";
}

const MessageAvatar = ({ role }: MessageAvatarProps) => {
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
    staleTime: 1000 * 60, // 1 minuto
    gcTime: 1000 * 60 * 5, // 5 minutos
  });

  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-token-main-surface-primary">
      {role === "user" ? (
        <User className="h-5 w-5" />
      ) : (
        <div className="flex items-center justify-center">
          <HexLogo 
            size="32" 
            className="text-white" 
            customLogoUrl={settings?.logo_url} 
          />
        </div>
      )}
    </div>
  );
};

export default MessageAvatar;