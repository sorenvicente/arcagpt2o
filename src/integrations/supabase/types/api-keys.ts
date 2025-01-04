import { Json } from './common';

export interface ApiKeysTable {
  Row: {
    created_at: string;
    id: string;
    openai_key: string | null;
    openrouter_key: string | null;
    selected_openai_model: string | null;
    selected_openrouter_model: string | null;
    updated_at: string;
  };
  Insert: {
    created_at?: string;
    id?: string;
    openai_key?: string | null;
    openrouter_key?: string | null;
    selected_openai_model?: string | null;
    selected_openrouter_model?: string | null;
    updated_at?: string;
  };
  Update: {
    created_at?: string;
    id?: string;
    openai_key?: string | null;
    openrouter_key?: string | null;
    selected_openai_model?: string | null;
    selected_openrouter_model?: string | null;
    updated_at?: string;
  };
  Relationships: [];
}