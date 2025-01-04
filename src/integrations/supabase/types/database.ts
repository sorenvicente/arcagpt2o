import { ApiKeysTable } from './api-keys';
import { ProfilesTable } from './profiles';
import { PromptsTable } from './prompts';
import { TablesInsert, TablesUpdate } from './common';

export interface Database {
  public: {
    Tables: {
      api_keys: ApiKeysTable;
      profiles: ProfilesTable;
      prompts: PromptsTable;
      // ... other tables can be added here as needed
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type { TablesInsert, TablesUpdate };
