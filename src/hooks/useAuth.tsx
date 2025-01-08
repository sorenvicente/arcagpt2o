import { useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { checkUserProfile } from "./auth/useProfileCheck";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    let authListener: any;

    const initialize = async () => {
      try {
        // Get initial session
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        if (mounted) {
          if (initialSession) {
            setSession(initialSession);
            setUser(initialSession.user);
            const profile = await checkUserProfile(initialSession.user);
            setIsAdmin(profile?.role === 'admin');
          }
          setIsLoading(false);
        }

        // Set up auth listener
        authListener = supabase.auth.onAuthStateChange(async (event, currentSession) => {
          if (mounted) {
            setSession(currentSession);
            setUser(currentSession?.user ?? null);
            
            if (currentSession?.user) {
              const profile = await checkUserProfile(currentSession.user);
              setIsAdmin(profile?.role === 'admin');
            } else {
              setIsAdmin(false);
            }
            
            setIsLoading(false);
          }
        });
      } catch (error) {
        console.error("Auth error:", error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initialize();

    return () => {
      mounted = false;
      if (authListener) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  return {
    user,
    session,
    isLoading,
    isAdmin
  };
};