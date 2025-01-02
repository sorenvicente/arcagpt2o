export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Tables {
  Tables: {
    api_keys: {
      Row: {
        created_at: string;
        id: string;
        openai_key: string | null;
        openrouter_key: string | null;
        updated_at: string;
      };
      Insert: {
        created_at?: string;
        id?: string;
        openai_key?: string | null;
        openrouter_key?: string | null;
        updated_at?: string;
      };
      Update: {
        created_at?: string;
        id?: string;
        openai_key?: string | null;
        openrouter_key?: string | null;
        updated_at?: string;
      };
      Relationships: [];
    };
    profiles: {
      Row: {
        created_at: string;
        email: string;
        id: string;
        role: string;
        updated_at: string;
      };
      Insert: {
        created_at?: string;
        email: string;
        id: string;
        role?: string;
        updated_at?: string;
      };
      Update: {
        created_at?: string;
        email?: string;
        id?: string;
        role?: string;
        updated_at?: string;
      };
      Relationships: [];
    };
    prompt_blocks: {
      Row: {
        category: string;
        created_at: string;
        description: string | null;
        id: string;
        name: string;
        prompt: string;
        updated_at: string;
      };
      Insert: {
        category: string;
        created_at?: string;
        description?: string | null;
        id?: string;
        name: string;
        prompt: string;
        updated_at?: string;
      };
      Update: {
        category?: string;
        created_at?: string;
        description?: string | null;
        id?: string;
        name?: string;
        prompt?: string;
        updated_at?: string;
      };
      Relationships: [];
    };
    prompt_training_files: {
      Row: {
        content_type: string | null;
        created_at: string;
        file_path: string;
        filename: string;
        id: string;
        prompt_id: string | null;
        size: number | null;
        updated_at: string;
      };
      Insert: {
        content_type?: string | null;
        created_at?: string;
        file_path: string;
        filename: string;
        id?: string;
        prompt_id?: string | null;
        size?: number | null;
        updated_at?: string;
      };
      Update: {
        content_type?: string | null;
        created_at?: string;
        file_path?: string;
        filename?: string;
        id?: string;
        prompt_id?: string | null;
        size?: number | null;
        updated_at?: string;
      };
      Relationships: [
        {
          foreignKeyName: "prompt_training_files_prompt_id_fkey";
          columns: ["prompt_id"];
          isOneToOne: false;
          referencedRelation: "prompts";
          referencedColumns: ["id"];
        }
      ];
    };
    prompts: {
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
    };
    saved_chats: {
      Row: {
        category: string;
        created_at: string;
        id: string;
        messages: Json;
        title: string;
        updated_at: string;
      };
      Insert: {
        category: string;
        created_at?: string;
        id?: string;
        messages?: Json;
        title: string;
        updated_at?: string;
      };
      Update: {
        category?: string;
        created_at?: string;
        id?: string;
        messages?: Json;
        title?: string;
        updated_at?: string;
      };
      Relationships: [];
    };
    whiteboard_prompts: {
      Row: {
        ai_model: string;
        created_at: string;
        description: string | null;
        id: string;
        name: string;
        template: string;
        updated_at: string;
      };
      Insert: {
        ai_model?: string;
        created_at?: string;
        description?: string | null;
        id?: string;
        name: string;
        template: string;
        updated_at?: string;
      };
      Update: {
        ai_model?: string;
        created_at?: string;
        description?: string | null;
        id?: string;
        name?: string;
        template?: string;
        updated_at?: string;
      };
      Relationships: [];
    };
    whiteboards: {
      Row: {
        created_at: string;
        id: string;
        name: string;
        updated_at: string;
      };
      Insert: {
        created_at?: string;
        id?: string;
        name: string;
        updated_at?: string;
      };
      Update: {
        created_at?: string;
        id?: string;
        name?: string;
        updated_at?: string;
      };
      Relationships: [];
    };
  };
}

export type TablesInsert<T extends keyof Tables['Tables']> = Tables['Tables'][T]['Insert'];
export type TablesUpdate<T extends keyof Tables['Tables']> = Tables['Tables'][T]['Update'];