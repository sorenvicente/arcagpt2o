import { useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "./use-toast";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      try {
        setIsLoading(true);
        // Get initial session
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        if (mounted) {
          if (initialSession) {
            setSession(initialSession);
            setUser(initialSession.user);
            
            // Check if user is admin
            const { data: profile } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', initialSession.user.id)
              .single();
              
            setIsAdmin(profile?.role === 'admin');
          }
          setIsLoading(false);
        }

        // Set up auth listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
          console.log('Auth state changed:', event);
          
          if (mounted) {
            setSession(currentSession);
            setUser(currentSession?.user ?? null);
            
            if (currentSession?.user) {
              const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', currentSession.user.id)
                .single();
                
              setIsAdmin(profile?.role === 'admin');
            } else {
              setIsAdmin(false);
            }
            
            setIsLoading(false);
          }
        });

        return () => {
          mounted = false;
          if (subscription) {
            subscription.unsubscribe();
          }
        };
      } catch (error) {
        console.error("Auth error:", error);
        if (mounted) {
          setIsLoading(false);
          toast({
            title: "Erro de autenticação",
            description: "Houve um problema ao verificar sua autenticação.",
            variant: "destructive"
          });
        }
      }
    };

    initialize();
  }, [toast]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      navigate('/login');
      toast({
        title: "Logout realizado com sucesso",
        description: "Você foi desconectado com sucesso."
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Erro ao fazer logout",
        description: "Houve um problema ao tentar desconectar.",
        variant: "destructive"
      });
    }
  };

  return {
    user,
    session,
    isLoading,
    isAdmin,
    signOut
  };
};