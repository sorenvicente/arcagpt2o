import { Json } from './common';

export interface PromptsTable {
  Row: {
    content: string;
    created_at: string;
    description: string | null;
    id: string;
    is_active: boolean;
    model: string;
    title: string;
    updated_at: string;
  };
  Insert: {
    content: string;
    created_at?: string;
    description?: string | null;
    id?: string;
    is_active?: boolean;
    model?: string;
    title: string;
    updated_at?: string;
  };
  Update: {
    content?: string;
    created_at?: string;
    description?: string | null;
    id?: string;
    is_active?: boolean;
    model?: string;
    title?: string;
    updated_at?: string;
  };
  Relationships: [];
}