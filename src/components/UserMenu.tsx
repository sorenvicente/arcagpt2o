import { useQuery } from "@tanstack/react-query";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { UserAvatar } from "./user-menu/UserAvatar";
import { UserMenuContent } from "./user-menu/UserMenuContent";

export function UserMenu() {
  const { user, signOut } = useAuth();
  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const isAdmin = profile?.role === "admin";

  return (
    <div className="relative">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <UserAvatar email={user?.email} />
        </DropdownMenuTrigger>
        <UserMenuContent 
          email={user?.email} 
          isAdmin={isAdmin} 
          onSignOut={signOut}
        />
      </DropdownMenu>
    </div>
  );
}