import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { UserTable } from "./user-management/UserTable";
import { CreateUserDialog } from "./user-management/CreateUserDialog";
import { useState } from "react";

export const UserManagement = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return profiles;
    },
  });

  return (
    <div className="space-y-4">
      <CreateUserDialog open={isOpen} onOpenChange={setIsOpen} />
      <UserTable users={users || []} />
    </div>
  );
};