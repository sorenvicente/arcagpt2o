export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface SavedChat {
  id: string;
  title: string;
  category: string;
  created_at: string;
}