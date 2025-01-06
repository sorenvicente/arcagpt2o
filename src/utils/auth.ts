import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

export const checkAdminRole = async (userId: string) => {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }

  return profile?.role === 'admin';
};

export const handleSignOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    localStorage.clear();
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    localStorage.clear(); // Ensure local cleanup even on error
    return { success: false, error };
  }
};