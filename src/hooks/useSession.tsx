import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);

  const refreshSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.refreshSession();
      if (error) {
        console.error('Error refreshing session:', error);
        throw error;
      }
      return session;
    } catch (error) {
      console.error('Error refreshing session:', error);
      return null;
    }
  };

  const checkSessionExpiry = async (currentSession: Session) => {
    const tokenExpiryTime = new Date(currentSession.expires_at! * 1000);
    const now = new Date();
    const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60000);

    if (tokenExpiryTime < fiveMinutesFromNow) {
      console.log('Token expired or expiring soon, refreshing...');
      return await refreshSession();
    }

    return currentSession;
  };

  const getActiveSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;
    
    return await checkSessionExpiry(session);
  };

  useEffect(() => {
    getActiveSession().then(setSession);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      if (session) {
        const validSession = await checkSessionExpiry(session);
        setSession(validSession);
      } else {
        setSession(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { session, refreshSession, getActiveSession };
};