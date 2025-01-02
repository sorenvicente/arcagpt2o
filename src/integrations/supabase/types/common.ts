export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type TablesInsert<T extends keyof Tables['Tables']> = Tables['Tables'][T]['Insert'];
export type TablesUpdate<T extends keyof Tables['Tables']> = Tables['Tables'][T]['Update'];

export interface Tables {
  Tables: {
    [key: string]: {
      Row: Record<string, any>;
      Insert: Record<string, any>;
      Update: Record<string, any>;
      Relationships: any[];
    };
  };
}