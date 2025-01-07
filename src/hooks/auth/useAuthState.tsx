import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "../useSession";

export const useAuthState = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { session } = useSession();

  useEffect(() => {
    setUser(session?.user ?? null);
  }, [session]);

  return {
    isLoading,
    setIsLoading,
    user,
    setUser,
    isAdmin,
    setIsAdmin
  };
};