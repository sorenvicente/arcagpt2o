import { supabase } from "@/integrations/supabase/client";

export const checkAdminRole = async (userId: string) => {
  try {
    console.log('🔍 Checking admin role for user:', userId);
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('❌ Error fetching profile:', error);
      if (error.code === 'PGRST116') {
        console.log('⚠️ Profile not found, might need to wait for creation');
        // Wait a bit and retry once
        await new Promise(resolve => setTimeout(resolve, 1000));
        const { data: retryProfile, error: retryError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', userId)
          .single();
        
        if (retryError) throw retryError;
        return retryProfile?.role === 'admin';
      }
      throw error;
    }

    console.log('✅ Admin role check complete:', profile?.role === 'admin');
    return profile?.role === 'admin';
  } catch (error) {
    console.error('❌ Error checking admin role:', error);
    throw error;
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