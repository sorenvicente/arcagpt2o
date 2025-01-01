export interface SystemSettings {
  Tables: {
    system_settings: {
      Row: {
        id: string;
        logo_url: string | null;
        created_at: string;
        updated_at: string;
      };
      Insert: {
        id?: string;
        logo_url?: string | null;
        created_at?: string;
        updated_at?: string;
      };
      Update: {
        id?: string;
        logo_url?: string | null;
        created_at?: string;
        updated_at?: string;
      };
      Relationships: [];
    };
  };
}