export interface ProfilesTable {
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
}