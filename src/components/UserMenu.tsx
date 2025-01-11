import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { LogOut } from "lucide-react";
import AdminMenuItems from "./admin/AdminMenuItems";
import { UserProfileLabel } from "./user/UserProfileLabel";

export function UserMenu() {
  const { user, signOut } = useAuth();
  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      // Get current session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No active session');
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const isAdmin = profile?.role === "admin";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-chatgpt-hover">
          <Avatar className="h-8 w-8 border border-chatgpt-border">
            <AvatarFallback className="bg-chatgpt-main text-[#9b87f5]">
              {user?.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 bg-chatgpt-main border border-chatgpt-border text-white rounded-xl shadow-lg" 
        align="end" 
        forceMount
      >
        <UserProfileLabel user={user} isAdmin={isAdmin} />
        <DropdownMenuSeparator className="bg-chatgpt-border" />
        {isAdmin && <AdminMenuItems />}
        <DropdownMenuItem
          className="px-3 py-2 text-red-400 hover:bg-chatgpt-hover hover:text-red-300 focus:bg-chatgpt-hover cursor-pointer rounded-lg mx-1"
          onClick={signOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}