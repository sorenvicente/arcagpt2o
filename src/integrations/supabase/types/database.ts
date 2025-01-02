import { SystemSettings } from './system';
import { Tables as CoreTables } from './core';

export type Database = {
  public: SystemSettings & CoreTables;
};

export type { Tables, TablesInsert, TablesUpdate } from './core';