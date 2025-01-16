export interface PromptBlock {
  id: string;
  name: string;
  description?: string;
  prompt: string;
  category: string;
  parent_category?: string;
  created_at: string;
  updated_at: string;
}