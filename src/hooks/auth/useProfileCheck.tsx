import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

export const checkUserProfile = async (user: User) => {
  try {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle();

    if (profileError) {
      console.error('Error fetching profile:', profileError);
      throw new Error('Failed to check permissions');
    }

    return profile;
  } catch (error) {
    console.error('Error checking profile:', error);
    return null;
  }
};

export const useProfileCheck = () => {
  return { checkUserProfile };
};