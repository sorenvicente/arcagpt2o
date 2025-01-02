import { SystemSettings } from './system';
import { Tables as CoreTables } from './core';

export type Database = {
  public: SystemSettings['Tables'] & CoreTables['Tables'];
};

export type { Tables, TablesInsert, TablesUpdate } from './core';