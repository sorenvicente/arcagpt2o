import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { LayoutDashboard, Key, LogOut, Settings } from "lucide-react";

export function UserMenu() {
  const navigate = useNavigate();
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-[#2A2F3C]">
          <Avatar className="h-8 w-8 border border-[#3A3F4C]">
            <AvatarFallback className="bg-[#1A1F2C] text-[#9b87f5]">
              {user?.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 bg-[#1A1F2C] border border-[#2A2F3C] text-white rounded-lg shadow-lg" 
        align="end" 
        forceMount
      >
        <DropdownMenuLabel className="font-normal px-3 py-2">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-[#9b87f5]">
              {isAdmin ? "Administrador" : "Usuário"}
            </p>
            <p className="text-xs leading-none text-gray-400">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[#2A2F3C]" />
        {isAdmin && (
          <>
            <DropdownMenuItem 
              onClick={() => navigate("/admin")}
              className="px-3 py-2 text-gray-200 hover:bg-[#2A2F3C] hover:text-white focus:bg-[#2A2F3C] cursor-pointer"
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Prompts</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => navigate("/api-keys")}
              className="px-3 py-2 text-gray-200 hover:bg-[#2A2F3C] hover:text-white focus:bg-[#2A2F3C] cursor-pointer"
            >
              <Key className="mr-2 h-4 w-4" />
              <span>API Keys</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => navigate("/admin/dashboard")}
              className="px-3 py-2 text-gray-200 hover:bg-[#2A2F3C] hover:text-white focus:bg-[#2A2F3C] cursor-pointer"
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => navigate("/admin/settings")}
              className="px-3 py-2 text-gray-200 hover:bg-[#2A2F3C] hover:text-white focus:bg-[#2A2F3C] cursor-pointer"
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#2A2F3C]" />
          </>
        )}
        <DropdownMenuItem
          className="px-3 py-2 text-red-400 hover:bg-[#2A2F3C] hover:text-red-300 focus:bg-[#2A2F3C] cursor-pointer"
          onClick={signOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}