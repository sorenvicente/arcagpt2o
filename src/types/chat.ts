import { Json } from '@/integrations/supabase/types';

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
  [key: string]: string; // Add index signature to make it compatible with Json type
}

export interface SavedChat {
  id: string;
  title: string;
  category: string;
  created_at: string;
}