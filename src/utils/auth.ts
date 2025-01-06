import { supabase } from "@/integrations/supabase/client";

export const checkAdminRole = async (userId: string) => {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return false;
    }

    return profile?.role === 'admin';
  } catch (error) {
    console.error('Error checking admin role:', error);
    return false;
  }
};

export const handleSignOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    localStorage.clear();
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    localStorage.clear();
    return { success: false, error };
  }
};