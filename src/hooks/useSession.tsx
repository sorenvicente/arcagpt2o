import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";
import { useNavigate } from "react-router-dom";

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const refreshSession = async () => {
    try {
      console.log('🔄 Refreshing session...');
      const { data: { session: newSession }, error } = await supabase.auth.refreshSession();
      
      if (error) {
        if (error.message.includes('refresh_token_not_found')) {
          console.log('❌ No valid refresh token found, redirecting to login');
          await supabase.auth.signOut();
          navigate('/login');
          toast({
            title: "Sessão expirada",
            description: "Por favor, faça login novamente.",
            variant: "destructive",
          });
          return null;
        }
        throw error;
      }
      
      console.log('✅ Session refreshed successfully');
      return newSession;
    } catch (error) {
      console.error('❌ Error in refreshSession:', error);
      toast({
        title: "Erro ao atualizar sessão",
        description: "Por favor, faça login novamente.",
        variant: "destructive",
      });
      navigate('/login');
      return null;
    }
  };

  const checkSessionExpiry = async (currentSession: Session) => {
    if (!currentSession.expires_at) return currentSession;
    
    const tokenExpiryTime = new Date(currentSession.expires_at * 1000);
    const now = new Date();
    const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60000);

    if (tokenExpiryTime < fiveMinutesFromNow) {
      console.log('⚠️ Token expired or expiring soon, refreshing...');
      return await refreshSession();
    }

    return currentSession;
  };

  const getActiveSession = async () => {
    try {
      console.log('🔍 Getting active session...');
      const { data: { session: currentSession }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('❌ Error getting session:', error);
        throw error;
      }
      
      if (!currentSession) {
        console.log('⚠️ No active session found');
        return null;
      }
      
      console.log('✅ Active session found');
      return await checkSessionExpiry(currentSession);
    } catch (error) {
      console.error('❌ Error in getActiveSession:', error);
      return null;
    }
  };

  useEffect(() => {
    console.log('🔄 Setting up session management...');
    
    getActiveSession().then(setSession);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log('🔔 Auth state changed:', event);
      
      if (currentSession) {
        try {
          const validSession = await checkSessionExpiry(currentSession);
          setSession(validSession);
        } catch (error) {
          console.error('❌ Error handling auth state change:', error);
          setSession(null);
        }
      } else {
        setSession(null);
      }
    });

    return () => {
      console.log('🧹 Cleaning up session subscription');
      subscription.unsubscribe();
    };
  }, []);

  return { session, refreshSession, getActiveSession };
};