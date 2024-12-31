import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const useAuthRedirect = (requireAuth: boolean = true) => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session && requireAuth) {
        navigate("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, requireAuth]);
};