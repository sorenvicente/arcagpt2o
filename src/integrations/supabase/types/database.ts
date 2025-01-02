import { SystemSettings } from './system';
import { CoreTables, TablesInsert, TablesUpdate } from './core';

export type Database = {
  public: SystemSettings['Tables'] & CoreTables['Tables'];
};

export type { TablesInsert, TablesUpdate };