import { useQuery } from "@tanstack/react-query";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { UserAvatar } from "./user-menu/UserAvatar";
import { UserMenuContent } from "./user-menu/UserMenuContent";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export function UserMenu() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: profile, isError } = useQuery({
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

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Erro ao carregar perfil",
        description: "Por favor, faça login novamente",
        variant: "destructive",
      });
      signOut();
    }
  }, [isError, toast, signOut]);

  if (!user) {
    return null;
  }

  const isAdmin = profile?.role === "admin";

  return (
    <div className="relative">
      <DropdownMenu>
        <UserAvatar email={user?.email} />
        <UserMenuContent 
          email={user?.email} 
          isAdmin={isAdmin} 
          onSignOut={signOut}
        />
      </DropdownMenu>
    </div>
  );
}