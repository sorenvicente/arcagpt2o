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
        return null;
      }
      return session;
    } catch (error) {
      console.error('Error refreshing session:', error);
      return null;
    }
  };

  const checkSessionExpiry = async (currentSession: Session) => {
    if (!currentSession) return null;
    
    const tokenExpiryTime = new Date(currentSession.expires_at! * 1000);
    const now = new Date();
    const tenMinutesFromNow = new Date(now.getTime() + 10 * 60000);

    if (tokenExpiryTime < tenMinutesFromNow) {
      console.log('Token expiring soon, refreshing...');
      return await refreshSession();
    }

    return currentSession;
  };

  const getActiveSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error);
        return null;
      }
      
      if (!session) return null;
      return await checkSessionExpiry(session);
    } catch (error) {
      console.error('Error getting active session:', error);
      return null;
    }
  };

  useEffect(() => {
    let mounted = true;

    const initSession = async () => {
      const activeSession = await getActiveSession();
      if (mounted) {
        setSession(activeSession);
      }
    };

    initSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log('Auth state changed:', event);
      
      if (currentSession && mounted) {
        const validSession = await checkSessionExpiry(currentSession);
        setSession(validSession);
      } else if (mounted) {
        setSession(null);
      }
    });

    // Configurar intervalo para verificar a sessão periodicamente
    const sessionCheckInterval = setInterval(async () => {
      if (mounted) {
        const activeSession = await getActiveSession();
        setSession(activeSession);
      }
    }, 4 * 60 * 1000); // Verificar a cada 4 minutos

    return () => {
      mounted = false;
      clearInterval(sessionCheckInterval);
      subscription.unsubscribe();
    };
  }, []);

  return { session, refreshSession, getActiveSession };
};