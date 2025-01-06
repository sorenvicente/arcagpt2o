import { supabase } from "@/integrations/supabase/client";

export const checkAdminRole = async (userId: string) => {
  try {
    console.log('🔍 Checking admin role for user:', userId);
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .maybeSingle(); // Changed from single() to maybeSingle()

    if (error) {
      console.error('❌ Error fetching profile:', error);
      return false;
    }

    if (!profile) {
      console.log('⚠️ No profile found for user');
      return false;
    }

    console.log('✅ Admin role check complete:', profile.role === 'admin');
    return profile.role === 'admin';
  } catch (error) {
    console.error('❌ Error checking admin role:', error);
    return false;
  }
};

export const handleSignOut = async () => {
  try {
    console.log('🔄 Signing out...');
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    console.log('✅ Sign out successful');
    localStorage.clear();
    return { success: true };
  } catch (error) {
    console.error('❌ Logout error:', error);
    localStorage.clear(); // Ensure local cleanup even on error
    return { success: false, error };
  }
};